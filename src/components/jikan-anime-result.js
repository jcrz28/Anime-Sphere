import {
	BASE_API_URL,
	CURRENT_SEASON_API_URL,
	DEFAULT_SORT_QUERY,
} from "../utils/helper";
import React, { useCallback, useEffect, useState } from "react";

import AnimeCard from "./anime-card";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CustomPagination from "./custom-pagination";
import useHttpClient from "../hook/http-hook";

const JikanAnimeResult = (props) => {
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [loadedAnimes, setLoadedAnimes] = useState([]);

	const { isLoading, request } = useHttpClient();

	const getUrl = () => {
		return props.enteredAnime
			? `${BASE_API_URL}/anime?q=${props.enteredAnime}&${DEFAULT_SORT_QUERY}&page=${page}`
			: `${CURRENT_SEASON_API_URL}?page=${page}`;
	};

	const fetchJikanAnime = useCallback(async () => {
		window.scrollTo(0, 0);
		const url = getUrl();

		try {
			const response = await request(url);
			setLoadedAnimes(response.data);
			setTotalPages(response.pagination.last_visible_page);
		} catch (error) {
			alert(error.message);
		}
		// eslint-disable-next-line
	}, [page, request, props.trigger]);

	useEffect(() => {
		fetchJikanAnime();
	}, [fetchJikanAnime]);

	useEffect(() => {
		setPage(1);
	}, [props.trigger]);

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
