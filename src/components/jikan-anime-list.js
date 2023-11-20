import React, { useCallback, useEffect, useState } from "react";

import AnimeCard from "./anime-card";
import Box from "@mui/material/Box";
import { CURRENT_SEASON_JIKAN_URL } from "../utils/helper";
import CircularProgress from "@mui/material/CircularProgress";
import { Pagination } from "@mui/material";
import useHttpClient from "../hook/http-hook";

const JikanAnimeList = (props) => {
	const [jikanAnimePage, setJikanAnimePage] = useState(1);
	const [jikanAnimeTotalPages, setJikanAnimeTotalPages] = useState(1);
	const [jikanLoadedAnimes, setJikanLoadedAnimes] = useState([]);
	const { isLoading, request } = useHttpClient();

	const getUrl = () => {
		return `${CURRENT_SEASON_JIKAN_URL}?page=${jikanAnimePage}`;
	};

	const fetchJikanAnime = useCallback(async () => {
		window.scrollTo(0, 0);
		const url = getUrl();

		try {
			const response = await request(url);
			setJikanLoadedAnimes(response.data);
			setJikanAnimeTotalPages(response.pagination.last_visible_page);
		} catch (error) {
			alert(error.message);
		}
		// eslint-disable-next-line
	}, [jikanAnimePage, request]);

	useEffect(() => {
		fetchJikanAnime();
	}, [fetchJikanAnime]);

	useEffect(() => {
		setJikanAnimePage(1);
	}, [props.triggered]);

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
				{jikanLoadedAnimes.map((anime) => (
					<AnimeCard
						anime={anime}
						danger={false}
						key={anime.mal_id}
					/>
				))}
			</Box>
			<Pagination
				sx={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					width: "100%",
				}}
				count={jikanAnimeTotalPages}
				color="primary"
				onChange={(event, page) => setJikanAnimePage(page)}
			/>
		</Box>
	);
};

export default JikanAnimeList;
