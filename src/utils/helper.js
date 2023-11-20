import { styled } from "@mui/material/styles";

export const DRAWER_WIDTH = 240;

export const DRAWER_HEADER = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

export const ANIME_RATINGS = [
	{
		g: "G - All Ages",
		pg: "PG - Children",
		pg13: "PG-13 - Teens 13 or older",
		r17: "R - 17+ (violence & profanity)",
		r: "R+ - Mild Nudity",
	},
];

export const ANIME_SCORES = [
	"0 - Avoid",
	"1 - Poor",
	"2 - Below Average",
	"3 - Average",
	"4 - Good",
	"5 - Above Average",
	"6 - Very Good",
	"7 - Excellent",
	"8 - Outstanding",
	"9- Masterpiece",
];

export const BASE_API_URL = "https://api.jikan.moe/v4";
export const CURRENT_SEASON_API_URL = "https://api.jikan.moe/v4/seasons/now";
export const DEFAULT_SORT_QUERY = "order_by=score&sort=desc";
