import { styled } from "@mui/material/styles";

export const DRAWER_WIDTH = 270;

export const DRAWER_HEADER = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

export const findNameById = (id, items) => {
	const foundItem = items.find((item) => item.mal_id === id);
	return foundItem ? foundItem.name : "";
};

export const ANIME_RATINGS = [
	{ g: "G - All Ages" },
	{ pg: "PG - Children" },
	{ pg13: "PG-13 - Teens 13 or Older" },
	{ r17: "R - 17+ (Violence & Profanity)" },
	{ r: "R+ - Mild Nudity" },
];

export const ANIME_SCORES = [
	{ label: "0 - Avoid" },
	{ label: "1 - Poor" },
	{ label: "2 - Below Average" },
	{ label: "3 - Average" },
	{ label: "4 - Good" },
	{ label: "5 - Above Average" },
	{ label: "6 - Very Good" },
	{ label: "7 - Excellent" },
	{ label: "8 - Outstanding" },
	{ label: "9 - Masterpiece" },
];

export const BASE_API_URL = "https://api.jikan.moe/v4";
export const CURRENT_SEASON_API_URL = "https://api.jikan.moe/v4/seasons/now";
export const DEFAULT_SORT_QUERY = "order_by=score&sort=desc&sfw";
