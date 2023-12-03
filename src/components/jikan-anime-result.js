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
	const { request } = useHttpClient();
	const {
		enteredAnime,
		selectedScore,
		selectedRating,
		selectedGenre,
		selectedTheme,
		resetQuery,
	} = useContext(AnimeQueryContext);

	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [data, setData] = useState([]);

	const getFilterQuery = useCallback(() => {
		const scoreQuery =
			selectedScore &&
			`min_score=${parseInt(selectedScore)}&max_score=${
				parseInt(selectedScore) + 1
			}`;

		const ratingQuery =
			selectedRating && `rating=${Object.keys(selectedRating)[0]}`;

		// Combine genre and theme queries using a single filter
		let genreThemeFilter = selectedGenre && `genres=${selectedGenre}`;
		if (selectedTheme) {
			genreThemeFilter = genreThemeFilter
				? `${genreThemeFilter},${selectedTheme}`
				: `genres=${selectedTheme}`;
		}

		return [scoreQuery, ratingQuery, genreThemeFilter]
			.filter(Boolean)
			.join("&");
	}, [selectedScore, selectedRating, selectedGenre, selectedTheme]);

	const getUrl = useCallback(() => {
		const hasQuery =
			enteredAnime ||
			selectedScore ||
			selectedRating ||
			selectedGenre ||
			selectedTheme;

		if (hasQuery) {
			const filterQuery = getFilterQuery();
			return `${BASE_API_URL}/anime?q=${enteredAnime}&${filterQuery}&${DEFAULT_SORT_QUERY}&page=${page}`;
		} else {
			return `${CURRENT_SEASON_API_URL}?page=${page}&sfw`;
		}
	}, [
		enteredAnime,
		selectedScore,
		selectedRating,
		selectedGenre,
		selectedTheme,
		getFilterQuery,
		page,
	]);

	const jikanAnimeHandler = useCallback(async () => {
		window.scrollTo(0, 0);
		const url = getUrl();

		try {
			const response = await request(url);
			setData(response.data);
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
			{!data && (
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
				{data.map((anime) => (
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
