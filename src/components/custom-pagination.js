import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Pagination from "@mui/material/Pagination";

const CustomPagination = (props) => {
	const [jumpToPageInput, setJumpToPageInput] = useState("");

	const handlePageChange = (event, page) => {
		props.setPage(page);
	};

	const handleJumpToPage = (event) => {
		const pageNumber = parseInt(jumpToPageInput);
		if (
			!isNaN(pageNumber) &&
			pageNumber >= 1 &&
			pageNumber <= props.totalPages
		) {
			handlePageChange(event, pageNumber);
			setJumpToPageInput("");
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				mt: 2,
			}}
		>
			<Pagination
				sx={{ mr: 2 }}
				count={props.totalPages}
				color="primary"
				page={props.page}
				onChange={handlePageChange}
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
		</Box>
	);
};

export default CustomPagination;
