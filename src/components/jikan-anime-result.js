import {
	BASE_API_URL,
	CURRENT_SEASON_API_URL,
	DEFAULT_SORT_QUERY,
} from "../utils/helper";
import React, { useCallback, useContext, useEffect, useState } from "react";

import AnimeCard from "./anime-card";
import { AnimeQueryContext } from "../context/anime-query-context";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CustomPagination from "./custom-pagination";
import useHttpClient from "../hook/http-hook";

const JikanAnimeResult = () => {
	const { isLoading, request } = useHttpClient();
	const { enteredAnime, resetQuery } = useContext(AnimeQueryContext);

	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [loadedAnimes, setLoadedAnimes] = useState([]);

	const getUrl = useCallback(() => {
		return enteredAnime
			? `${BASE_API_URL}/anime?q=${enteredAnime}&${DEFAULT_SORT_QUERY}&page=${page}`
			: `${CURRENT_SEASON_API_URL}?page=${page}&sfw`;
	}, [enteredAnime, page]);

	const jikanAnimeHandler = useCallback(async () => {
		window.scrollTo(0, 0);
		const url = getUrl();

		try {
			const response = await request(url);
			setLoadedAnimes(response.data);
			setTotalPages(response.pagination.last_visible_page);
		} catch (error) {
			alert(error.message);
		}
	}, [request, getUrl]);

	useEffect(() => {
		jikanAnimeHandler();
	}, [jikanAnimeHandler]);

	useEffect(() => {
		setPage(1);
	}, [enteredAnime]);

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
				{loadedAnimes.map((anime) => (
					<AnimeCard
						anime={anime}
						danger={false}
						key={anime.mal_id}
					/>
				))}
			</Box>
			<CustomPagination
				setPage={setPage}
				page={page}
				totalPages={totalPages}
			/>
		</Box>
	);
};

export default JikanAnimeResult;
