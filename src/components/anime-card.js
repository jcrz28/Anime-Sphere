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

const AnimeCard = (props) => {
	const authCtx = useContext(AuthContext);
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<Box sx={{ my: 2, mx: 4 }}>
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
									onClick={() => setIsModalOpen(true)}
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
							{isModalOpen && (
								<CustomDialog
									title={props.anime.title}
									isModalOpen={isModalOpen}
									setIsModalOpen={setIsModalOpen}
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
