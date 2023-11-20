import { DRAWER_HEADER, DRAWER_WIDTH } from "../utils/helper";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { useTheme } from "@mui/material/styles";

const SideDrawer = (props) => {
	const theme = useTheme();

	return (
		<Drawer
			sx={{
				width: DRAWER_WIDTH,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: DRAWER_WIDTH,
					boxSizing: "border-box",
				},
			}}
			variant="persistent"
			anchor="left"
			open={props.isDrawerOpen}
		>
			<DRAWER_HEADER>
				<IconButton onClick={() => props.setIsDrawerOpen(false)}>
					{theme.direction === "ltr" ? (
						<ChevronLeftIcon />
					) : (
						<ChevronRightIcon />
					)}
				</IconButton>
			</DRAWER_HEADER>
			<Divider />
		</Drawer>
	);
};

export default SideDrawer;
