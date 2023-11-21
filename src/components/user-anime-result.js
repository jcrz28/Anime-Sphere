import React, { useCallback, useEffect, useState } from "react";

import AnimeCard from "./anime-card";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CustomPagination from "./custom-pagination";
import useHttpClient from "../hook/http-hook";
import { useParams } from "react-router-dom";

const UserAnimeResult = (props) => {
	const [page, setPage] = useState(1);
	const [loadedAnimes, setLoadedAnimes] = useState([]);

	const { userId } = useParams();
	const { isLoading, request } = useHttpClient();

	const ITEMS_PER_PAGE = 25;

	const deleteAnimeHandler = (animeId) => {
		setLoadedAnimes((updatedList) =>
			updatedList.filter((anime) => anime.id !== animeId)
		);
	};

	const fetchUserAnime = useCallback(async () => {
		if (userId) {
			try {
				const response = await request(
					`https://anime-tracker-backend.vercel.app/dashboard/${userId}`
				);
				setLoadedAnimes(response.animes);
				setPage(1);
			} catch (error) {
				alert(error);
			}
		}
	}, [userId, request]);

	const userAnimeFilterHandler = useCallback(async () => {
		try {
			const response = await request(
				`https://anime-tracker-backend.vercel.app/dashboard/${userId}/${props.enteredAnime}`
			);

			if (response.animes.length === 0) {
				throw new Error("Anime does not exist");
			}

			let filteredAnime = response.animes;

			if (filteredAnime.length > 0) {
				setLoadedAnimes(filteredAnime);
				setPage(1);
			} else {
				throw new Error("No found animes");
			}
		} catch (error) {
			alert(error.message);
		}

		// eslint-disable-next-line
	}, [userId, request, props.trigger]);

	useEffect(() => {
		userAnimeFilterHandler();
	}, [userAnimeFilterHandler]);

	useEffect(() => {
		if (props.trigger === 0) {
			fetchUserAnime();
		}
	}, [fetchUserAnime, userId, props.trigger]);

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
