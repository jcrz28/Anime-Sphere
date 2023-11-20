import React, { useContext, useState } from "react";

import AnimeCardDetails from "./anime-card-details.js";
import AuthContext from "../context/auth-context";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CustomDialog from "./custom-dialog.js";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const AnimeCard = (props) => {
	const theme = useTheme();
	const authCtx = useContext(AuthContext);

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Box sx={{ my: 2, ...(isSmallScreen ? { mx: 0 } : { mx: 4 }) }}>
			<Card sx={{ width: 300, height: 1 }}>
				<CardContent>
					<CardMedia
						component="img"
						image={props.anime.images.jpg.image_url}
						height="400"
					/>
					<Box>
						<AnimeCardDetails anime={props.anime} />
						<Divider />
						<Box
							sx={{
								my: 2,
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							{!props.danger && (
								<Button
									variant="contained"
									onClick={() => setIsDialogOpen(true)}
								>
									Synopsis
								</Button>
							)}
							{authCtx.isLoggedIn && !props.danger && (
								<Button
									variant="contained"
									color="success"
									type="submit"
								>
									Add
								</Button>
							)}
							{authCtx.isLoggedIn && props.danger && (
								<Button
									variant="contained"
									color="warning"
									type="submit"
								>
									Delete
								</Button>
							)}
							{isDialogOpen && (
								<CustomDialog
									title={props.anime.title}
									isDialogOpen={isDialogOpen}
									setIsDialogOpen={setIsDialogOpen}
									synopsis={props.anime.synopsis}
								/>
							)}
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};

export default AnimeCard;
