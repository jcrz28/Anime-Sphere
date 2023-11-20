import {
	BASE_API_URL,
	CURRENT_SEASON_API_URL,
	DEFAULT_SORT_QUERY,
} from "../utils/helper";
import React, { useCallback, useEffect, useState } from "react";

import AnimeCard from "./anime-card";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import JumpPageInput from "./jump-page-input";
import Pagination from "@mui/material/Pagination";
import useHttpClient from "../hook/http-hook";

const JikanAnimeList = (props) => {
	const [jikanAnimePage, setJikanAnimePage] = useState(1);
	const [jikanAnimeTotalPages, setJikanAnimeTotalPages] = useState(1);
	const [jikanLoadedAnimes, setJikanLoadedAnimes] = useState([]);

	const { isLoading, request } = useHttpClient();

	const getUrl = () => {
		return props.enteredAnime
			? `${BASE_API_URL}/anime?q=${props.enteredAnime}&${DEFAULT_SORT_QUERY}&page=${jikanAnimePage}`
			: `${CURRENT_SEASON_API_URL}?page=${jikanAnimePage}`;
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
	}, [jikanAnimePage, request, props.trigger]);

	useEffect(() => {
		fetchJikanAnime();
	}, [fetchJikanAnime]);

	useEffect(() => {
		setJikanAnimePage(1);
	}, [props.trigger]);

	const handlePageChange = (event, page) => {
		setJikanAnimePage(page);
	};

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
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					mt: 2,
				}}
			>
				<Pagination
					sx={{ mr: 2 }}
					count={jikanAnimeTotalPages}
					color="primary"
					onChange={handlePageChange}
				/>
				<JumpPageInput
					totalPages={jikanAnimeTotalPages}
					onPageChange={handlePageChange}
				/>
			</Box>
		</Box>
	);
};

export default JikanAnimeList;
