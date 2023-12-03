import * as React from "react";

import { useEffect, useMemo, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { PieChart } from "@mui/x-charts/PieChart";
import Typography from "@mui/material/Typography";
import useHttpClient from "../hook/http-hook";
import { useParams } from "react-router-dom";

const UserDashboard = () => {
	const { userId } = useParams();
	const { request } = useHttpClient();
	const [data, setData] = useState([]);

	const pieParams = { height: 350 };

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

		const seriesData = Object.keys(genresCount).map((genre, index) => ({
			id: index,
			value: genresCount[genre],
			label: genre,
		}));

		return seriesData;
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

		const seriesData = Object.keys(themesCount).map((theme, index) => ({
			id: index,
			value: themesCount[theme],
			label: theme,
		}));

		return seriesData;
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
			{!data && <CircularProgress />}
			<Grid item xs={12}>
				<Grid container justifyContent="center" spacing={5}>
					<Grid item xs={12} md={6}>
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
							<PieChart
								series={[
									{
										data: genresData,
										innerRadius: 30,
										paddingAngle: 5,
										cornerRadius: 5,
									},
								]}
								margin={{
									bottom: 100,
									left: 100,
									right: 100,
								}}
								slotProps={{
									legend: {
										direction: "row",
										position: {
											vertical: "bottom",
											horizontal: "middle",
										},
										padding: 0,
									},
								}}
								{...pieParams}
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} md={6}>
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
							<PieChart
								series={[
									{
										data: themesData,
										innerRadius: 30,
										paddingAngle: 5,
										cornerRadius: 5,
									},
								]}
								margin={{
									bottom: 100,
									left: 100,
									right: 100,
								}}
								slotProps={{
									legend: {
										direction: "row",
										position: {
											vertical: "bottom",
											horizontal: "middle",
										},
										padding: 0,
									},
								}}
								{...pieParams}
							/>
						</Paper>
					</Grid>
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
