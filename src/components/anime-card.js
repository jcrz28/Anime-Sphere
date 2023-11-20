import React, { useContext, useState } from "react";

import { ANIME_RATINGS } from "../utils/helper.js";
import AnimeCardDetails from "./anime-card-details.js";
import AuthContext from "../context/auth-context";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CustomDialog from "./custom-dialog.js";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const AnimeCard = (props) => {
	const theme = useTheme();
	const authCtx = useContext(AuthContext);

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const [bump, setBump] = useState(false);

	const addAnimeHandler = async (event) => {
		event.preventDefault();
		setBump(true);

		const rating = ANIME_RATINGS.reduce((matchedKey, rating) => {
			return (
				matchedKey ||
				Object.keys(rating).find(
					(key) => rating[key] === props.anime.rating
				)
			);
		}, null);

		try {
			const addAnime = await fetch(
				`https://anime-tracker-backend.vercel.app/dashboard/${authCtx.userId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + authCtx.token,
					},
					body: JSON.stringify({
						title: props.anime.title,
						images: {
							jpg: {
								image_url: props.anime.images.jpg.image_url,
							},
						},
						rating,
						score: props.anime.score,
						genres: props.anime.genres,
						themes: props.anime.themes,
						creator: authCtx.userId,
					}),
				}
			);

			const response = await addAnime.json();

			if (!addAnime.ok) {
				throw new Error(response.message);
			}
		} catch (error) {
			alert(error.message);
		}
		setBump(false);
	};

	const deleteAnimeHandler = async (event) => {
		event.preventDefault();
		setBump(true);

		try {
			const deleteAnime = await fetch(
				`https://anime-tracker-backend.vercel.app/dashboard/${authCtx.userId}/${props.anime.id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + authCtx.token,
					},
				}
			);

			const response = await deleteAnime.json();

			if (!deleteAnime.ok) {
				throw new Error(response.message);
			}

			props.onDelete(props.anime.id);
		} catch (error) {
			alert(error.message);
		}
		setBump(false);
	};

	return (
		<Box sx={{ my: 2, ...(isSmallScreen ? { mx: 0 } : { mx: 4 }) }}>
			<Card
				sx={{
					width: 300,
					height: 1,
					animation: bump ? "bump 400ms ease-out" : "none",
					"@keyframes bump": {
						"0%": {
							transform: "scale(1)",
						},
						"10%": {
							transform: "scale(1.05)",
						},
						"30%": {
							transform: "scale(1.1)",
						},
						"50%": {
							transform: "scale(1.15)",
						},
						"100%": {
							transform: "scale(1)",
						},
					},
				}}
			>
				<CardContent>
					<CardMedia
						component="img"
						image={props.anime.images.jpg.image_url}
						height="400"
					/>
					<Box>
						<AnimeCardDetails anime={props.anime} />
						<Divider />
						<Box
							sx={{
								my: 2,
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							{!props.danger && (
								<Button
									variant="contained"
									onClick={() => setIsDialogOpen(true)}
								>
									Synopsis
								</Button>
							)}
							{authCtx.isLoggedIn && !props.danger && (
								<Button
									variant="contained"
									color="success"
									type="submit"
									onClick={addAnimeHandler}
								>
									Add
								</Button>
							)}
							{authCtx.isLoggedIn && props.danger && (
								<Button
									variant="contained"
									color="warning"
									type="submit"
									onClick={deleteAnimeHandler}
								>
									Delete
								</Button>
							)}
							{isDialogOpen && (
								<CustomDialog
									title={props.anime.title}
									isDialogOpen={isDialogOpen}
									setIsDialogOpen={setIsDialogOpen}
									synopsis={props.anime.synopsis}
								/>
							)}
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};

export default AnimeCard;
