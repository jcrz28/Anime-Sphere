import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const AnimeCardDetails = (props) => {
	return (
		<Box sx={{ height: 225 }}>
			<Typography
				variant="body1"
				sx={{
					height: 80,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{props.anime.title}
			</Typography>
			<Divider />
			<Box sx={{ my: 2 }}>
				<Typography variant="body2">
					Score:{" "}
					{props.anime.score ? `${props.anime.score} /10` : "N/A"}
				</Typography>
			</Box>
			<Box sx={{ my: 2 }}>
				<Typography variant="body2">
					Genres:{" "}
					{props.anime.genres.length > 0
						? props.anime.genres.map((genre) => (
								<span key={genre.name}>{`${genre.name} `}</span>
						  ))
						: "N/A"}
				</Typography>
			</Box>
			<Box sx={{ my: 2 }}>
				<Typography variant="body2">
					Themes:{" "}
					{props.anime.themes.length > 0
						? props.anime.themes.map((theme) => (
								<span key={theme.name}>{`${theme.name} `}</span>
						  ))
						: "N/A"}
				</Typography>
			</Box>
		</Box>
	);
};

export default AnimeCardDetails;
