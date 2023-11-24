import { ANIME_GENRES, ANIME_THEMES } from "./side-drawer";
import React, { useCallback, useContext, useEffect, useState } from "react";

import AnimeCard from "./anime-card";
import { AnimeQueryContext } from "../context/anime-query-context";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CustomPagination from "./custom-pagination";
import { findNameById } from "../utils/helper";
import useHttpClient from "../hook/http-hook";
import { useParams } from "react-router-dom";

const UserAnimeResult = () => {
	const { userId } = useParams();
	const { isLoading, request } = useHttpClient();
	const {
		enteredAnime,
		selectedScore,
		selectedRating,
		selectedGenre,
		selectedTheme,
		resetQuery,
	} = useContext(AnimeQueryContext);

	const [page, setPage] = useState(1);
	const [loadedAnimes, setLoadedAnimes] = useState([]);

	const ITEMS_PER_PAGE = 25;

	const deleteAnimeHandler = (animeId) => {
		setLoadedAnimes((updatedList) =>
			updatedList.filter((anime) => anime.id !== animeId)
		);
	};

	const userAnimeHandler = useCallback(async () => {
		try {
			const response = await request(
				`https://anime-tracker-backend.vercel.app/dashboard/${userId}/${enteredAnime}`
			);

			let filteredAnime = response.animes;

			if (selectedScore) {
				const minScore = Math.min(selectedScore);
				const maxScore = Math.max(selectedScore) + 1;

				filteredAnime = filteredAnime.filter(
					(anime) => anime.score >= minScore && anime.score < maxScore
				);
			}

			if (selectedRating) {
				filteredAnime = filteredAnime.filter(
					(anime) => anime.rating === Object.keys(selectedRating)[0]
				);
			}

			if (selectedGenre) {
				const genreName = findNameById(selectedGenre, ANIME_GENRES);
				filteredAnime = filteredAnime.filter((anime) =>
					anime.genres.some((genre) => genre.name === genreName)
				);
			}

			if (selectedTheme) {
				const themeName = findNameById(selectedTheme, ANIME_THEMES);
				filteredAnime = filteredAnime.filter((anime) =>
					anime.themes.some((theme) => theme.name === themeName)
				);
			}

			if (filteredAnime.length > 0) {
				setLoadedAnimes(filteredAnime);
				setPage(1);
			}
		} catch (error) {
			alert(error.message);
		}
	}, [
		userId,
		request,
		enteredAnime,
		selectedScore,
		selectedRating,
		selectedGenre,
		selectedTheme,
	]);

	useEffect(() => {
		userAnimeHandler();
	}, [userAnimeHandler]);

	useEffect(() => {
		resetQuery();
		// eslint-disable-next-line
	}, []); // Only needed on the first render

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
				width: "100%",
			}}
		>
			{isLoading && (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					<CircularProgress />
				</Box>
			)}
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					width: "100%",
				}}
			>
				{loadedAnimes
					.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
					.map((anime) => (
						<AnimeCard
							anime={anime}
							danger={true}
							key={anime.id}
							onDelete={deleteAnimeHandler}
						/>
					))}
			</Box>
			<CustomPagination
				setPage={setPage}
				page={page}
				totalPages={Math.ceil(loadedAnimes.length / ITEMS_PER_PAGE)}
			/>
		</Box>
	);
};

export default UserAnimeResult;
