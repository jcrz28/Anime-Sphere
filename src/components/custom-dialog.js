import * as React from "react";

import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));

const CustomDialog = (props) => {
	return (
		<React.Fragment>
			<BootstrapDialog
				onClose={() => props.setIsModalOpen(false)}
				aria-labelledby="customized-dialog-title"
				open={props.isModalOpen}
			>
				<DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
					{props.title}
				</DialogTitle>
				<IconButton
					aria-label="close"
					onClick={() => props.setIsModalOpen(false)}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
				<DialogContent dividers>
					<Typography gutterBottom>{props.synopsis}</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						autoFocus
						onClick={() => props.setIsModalOpen(false)}
					>
						Close
					</Button>
				</DialogActions>
			</BootstrapDialog>
		</React.Fragment>
	);
};

export default CustomDialog;
