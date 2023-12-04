import * as React from "react";

import { useEffect, useMemo, useState } from "react";

import { BarChart } from "@mui/x-charts/BarChart";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useHttpClient from "../hook/http-hook";
import { useParams } from "react-router-dom";

const UserDashboard = () => {
	const { userId } = useParams();
	const { request } = useHttpClient();
	const [data, setData] = useState([]);

	const colDefs = [
		{ field: "id", headerName: "ID", width: 100 },
		{ field: "title", headerName: "Title", flex: 1 },
		{
			field: "genres",
			headerName: "Genres",
			flex: 1,
			valueGetter: (params) =>
				params.row.genres.map((genre) => genre.name).join(", "),
		},
		{ field: "score", headerName: "Score", type: "number", width: 100 },
		{
			field: "themes",
			headerName: "Themes",
			flex: 1,
			valueGetter: (params) =>
				params.row.themes.map((theme) => theme.name).join(", "),
		},
	];

	const rowData = useMemo(() => {
		return data.map((anime, index) => ({
			...anime,
			id: index + 1,
		}));
	}, [data]);

	const genresData = useMemo(() => {
		const genresCount = {};
		data.forEach((anime) => {
			anime.genres.forEach((genre) => {
				const genreName = genre.name;
				if (!genresCount[genreName]) {
					genresCount[genreName] = 1;
				} else {
					genresCount[genreName]++;
				}
			});
		});

		return Object.keys(genresCount).map((genre) => ({
			genre,
			count: genresCount[genre],
		}));
	}, [data]);

	const themesData = useMemo(() => {
		const themesCount = {};
		data.forEach((anime) => {
			anime.themes.forEach((theme) => {
				const themeName = theme.name;
				if (!themesCount[themeName]) {
					themesCount[themeName] = 1;
				} else {
					themesCount[themeName]++;
				}
			});
		});

		return Object.keys(themesCount).map((theme) => ({
			theme,
			count: themesCount[theme],
		}));
	}, [data]);

	useEffect(() => {
		const getUserAnimeLists = async () => {
			try {
				const response = await request(
					`https://anime-sphere-server.vercel.app/library/${userId}`
				);
				setData(response.animes);
			} catch (error) {
				alert(error.message);
			}
		};

		getUserAnimeLists();
	}, [userId, request]);

	return (
		<Grid
			sx={{
				display: "flex",
				justifyContent: "center",
			}}
			container
		>
			{!data.length && <CircularProgress />}
			<Grid item xs={12}>
				<Grid container justifyContent="center" spacing={5}>
					{genresData.length > 0 && (
						<Grid item xs={12} style={{ width: "100%" }}>
							<Paper
								sx={{
									height: "fit-content",
									overflowWrap: "break-word",
								}}
							>
								<Typography variant="h6" sx={{ p: 1 }}>
									Anime Genres
								</Typography>
								<Divider />
								<BarChart
									xAxis={[
										{
											data: genresData.map(
												(genreData) => genreData.genre
											),
											scaleType: "band",
										},
									]}
									series={[
										{
											data: genresData.map(
												(genreData) => genreData.count
											),
										},
									]}
									height={350}
								/>
							</Paper>
						</Grid>
					)}
					{themesData.length > 0 && (
						<Grid item xs={12} style={{ width: "100%" }}>
							<Paper
								sx={{
									height: "fit-content",
									overflowWrap: "break-word",
								}}
							>
								<Typography variant="h6" sx={{ p: 1 }}>
									Anime Themes
								</Typography>
								<Divider />
								<BarChart
									xAxis={[
										{
											data: themesData.map(
												(themeData) => themeData.theme
											),
											scaleType: "band",
										},
									]}
									series={[
										{
											data: themesData.map(
												(themeData) => themeData.count
											),
										},
									]}
									height={350}
								/>
							</Paper>
						</Grid>
					)}
					<Grid item xs={12} style={{ width: "100%" }}>
						<Paper>
							<Typography variant="h6" sx={{ p: 1 }}>
								Anime Data Table
							</Typography>
							<DataGrid
								rows={rowData}
								columns={colDefs}
								initialState={{
									pagination: {
										paginationModel: {
											pageSize: 10,
										},
									},
								}}
								pageSizeOptions={[10]}
							/>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default UserDashboard;
