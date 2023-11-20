import React, { useCallback, useEffect, useState } from "react";

import AnimeCard from "./anime-card";
import Box from "@mui/material/Box";
import { CURRENT_SEASON_JIKAN_URL } from "../utils/helper";
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
