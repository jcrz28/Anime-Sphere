import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import Settings from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";

const UserMenu = () => {
	const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(menuAnchorEl);

	const handleMenuOpen = (event) => {
		setMenuAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setMenuAnchorEl(null);
	};

	return (
		<React.Fragment>
			<Tooltip title="Account settings">
				<IconButton
					onClick={handleMenuOpen}
					size="small"
					sx={{ ml: 2 }}
					aria-controls={isMenuOpen ? "account-menu" : undefined}
					aria-haspopup="true"
				>
					<Avatar sx={{ width: 32, height: 32 }}>JC</Avatar>
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={menuAnchorEl}
				id="account-menu"
				open={isMenuOpen}
				onClose={handleMenuClose}
				slotProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				getContentAnchorEl={null}
			>
				<MenuItem>
					<ListItemIcon>
						<Settings fontSize="small" />
					</ListItemIcon>
					Settings
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
};

export default UserMenu;
