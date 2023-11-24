import {
	ANIME_RATINGS,
	ANIME_SCORES,
	DRAWER_HEADER,
	DRAWER_WIDTH,
} from "../utils/helper";
import React, { useCallback, useContext, useEffect } from "react";

import { AnimeQueryContext } from "../context/anime-query-context";
import Autocomplete from "@mui/material/Autocomplete";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { findNameById } from "../utils/helper";
import useHttpClient from "../hook/http-hook";
import { useTheme } from "@mui/material/styles";

let ANIME_GENRES = [];
let ANIME_THEMES = [];

const SideDrawer = (props) => {
	const theme = useTheme();
	const { request } = useHttpClient();

	const {
		selectedScore,
		setSelectedScore,
		selectedRating,
		setSelectedRating,
		selectedGenre,
		setSelectedGenre,
		selectedTheme,
		setSelectedTheme,
	} = useContext(AnimeQueryContext);

	const getAnimeGenres = useCallback(async () => {
		try {
			const response = await request(
				"https://api.jikan.moe/v4/genres/anime?filter=genres"
			);
			ANIME_GENRES = response.data.map(({ mal_id, name }) => ({
				mal_id,
				name,
			}));
		} catch (error) {
			alert(error);
		}
	}, [request]);

	const getAnimeThemes = useCallback(async () => {
		try {
			const response = await request(
				"https://api.jikan.moe/v4/genres/anime?filter=themes"
			);
			ANIME_THEMES = response.data.map(({ mal_id, name }) => ({
				mal_id,
				name,
			}));
		} catch (error) {
			alert(error);
		}
	}, [request]);

	useEffect(() => {
		const getGenresAndThemes = async () => {
			await new Promise((resolve) => {
				setTimeout(async () => {
					await getAnimeGenres();
					resolve();
				}, 3000);
			});

			await new Promise((resolve) => {
				setTimeout(async () => {
					await getAnimeThemes();
					resolve();
				}, 3000);
			});
		};

		getGenresAndThemes();
	}, [getAnimeGenres, getAnimeThemes]);

	return (
		<Drawer
			sx={{
				width: DRAWER_WIDTH,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: DRAWER_WIDTH,
					boxSizing: "border-box",
				},
			}}
			variant="persistent"
			anchor="left"
			open={props.isDrawerOpen}
		>
			<DRAWER_HEADER>
				<IconButton onClick={() => props.setIsDrawerOpen(false)}>
					{theme.direction === "ltr" ? (
						<ChevronLeftIcon />
					) : (
						<ChevronRightIcon />
					)}
				</IconButton>
			</DRAWER_HEADER>
			<Divider />
			<Autocomplete
				value={selectedScore}
				options={ANIME_SCORES}
				sx={{ mx: 2, my: 1 }}
				onChange={(event, newValue) => {
					setSelectedScore(
						newValue
							? ANIME_SCORES.findIndex(
									(score) => score.label === newValue.label
							  )
							: null
					);
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						label={
							selectedScore !== null &&
							selectedScore >= 0 &&
							selectedScore < ANIME_SCORES.length
								? ANIME_SCORES[selectedScore].label
								: "Select Score"
						}
						margin="normal"
						fullWidth
						focused
						color="info"
					/>
				)}
			/>
			<Autocomplete
				value={selectedRating}
				sx={{ mx: 2, my: 1 }}
				onChange={(event, value) => setSelectedRating(value)}
				options={ANIME_RATINGS}
				getOptionLabel={(option) => Object.values(option)[0]}
				renderInput={(params) => (
					<TextField
						{...params}
						label={
							selectedRating
								? Object.values(selectedRating)[0]
								: "Select Rating"
						}
						margin="normal"
						fullWidth
						focused
						color="info"
					/>
				)}
			/>
			<Autocomplete
				value={selectedGenre}
				sx={{ mx: 2, my: 1 }}
				onChange={(event, value) =>
					setSelectedGenre(value ? value.mal_id : null)
				}
				options={ANIME_GENRES}
				getOptionLabel={
					(option) =>
						option.name || findNameById(selectedGenre, ANIME_GENRES) //findNameById overrides option.name
				}
				renderInput={(params) => (
					<TextField
						{...params}
						label={
							selectedGenre
								? findNameById(selectedGenre, ANIME_GENRES)
								: "Select Genre"
						}
						margin="normal"
						fullWidth
						focused
						color="info"
					/>
				)}
			/>
			<Autocomplete
				value={selectedTheme}
				sx={{ mx: 2, my: 1 }}
				onChange={(event, value) =>
					setSelectedTheme(value ? value.mal_id : null)
				}
				options={ANIME_THEMES}
				getOptionLabel={
					(option) =>
						option.name || findNameById(selectedTheme, ANIME_THEMES) //findNameById overrides option.name
				}
				renderInput={(params) => (
					<TextField
						{...params}
						label={
							selectedTheme
								? findNameById(selectedTheme, ANIME_THEMES)
								: "Select Theme"
						}
						margin="normal"
						fullWidth
						focused
						color="info"
					/>
				)}
			/>
		</Drawer>
	);
};

export { ANIME_GENRES, ANIME_THEMES };

export default SideDrawer;
