import React, { useCallback, useContext, useEffect, useState } from "react";

import AnimeCard from "./anime-card";
import { AnimeQueryContext } from "../context/anime-query-context";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CustomPagination from "./custom-pagination";
import useHttpClient from "../hook/http-hook";
import { useParams } from "react-router-dom";

const UserAnimeResult = () => {
	const [page, setPage] = useState(1);
	const [loadedAnimes, setLoadedAnimes] = useState([]);

	const { userId } = useParams();
	const { isLoading, request } = useHttpClient();
	const { enteredAnime } = useContext(AnimeQueryContext);

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

			if (filteredAnime.length > 0) {
				setLoadedAnimes(filteredAnime);
				setPage(1);
			}
		} catch (error) {
			alert(error.message);
		}
	}, [userId, request, enteredAnime]);

	useEffect(() => {
		userAnimeHandler();
	}, [userAnimeHandler]);

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
