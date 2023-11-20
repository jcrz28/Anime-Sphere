import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Pagination from "@mui/material/Pagination";

const CustomPagination = (props) => {
	const [jumpToPageInput, setJumpToPageInput] = useState("");

	const handleJumpToPage = (event) => {
		const pageNumber = parseInt(jumpToPageInput);
		if (
			!isNaN(pageNumber) &&
			pageNumber >= 1 &&
			pageNumber <= props.totalPages
		) {
			props.onPageChange(event, pageNumber);
			setJumpToPageInput("");
		}
	};

	return (
		<React.Fragment>
			<Pagination
				sx={{ mr: 2 }}
				count={props.totalPages}
				color="primary"
				page={props.page}
				onChange={props.onPageChange}
				showFirstButton
				showLastButton
			/>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					mt: 2,
				}}
			>
				<Input
					value={jumpToPageInput}
					onChange={(e) => setJumpToPageInput(e.target.value)}
					endAdornment={
						<InputAdornment position="end">
							<Button
								variant="contained"
								onClick={handleJumpToPage}
								size="small"
								sx={{ borderRadius: 0 }}
							>
								Go
							</Button>
						</InputAdornment>
					}
					type="number"
					placeholder={`Jump to Page (1 - ${props.totalPages})`}
					inputProps={{
						min: 1,
						max: props.totalPages,
						style: { textAlign: "center" },
					}}
					sx={{ mt: 1 }}
				/>
			</Box>
		</React.Fragment>
	);
};

export default CustomPagination;
