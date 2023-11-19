import React, { useContext, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import AuthContext from "../context/auth-context";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useHttpClient from "../hook/http-hook";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
	const defaultTheme = createTheme();
	const authCtx = useContext(AuthContext);

	const { isLoading, request } = useHttpClient();
	const navigate = useNavigate();

	const [isLogin, setIsLogIn] = useState(true);
	const [error, setError] = useState(null);

	const switchAuthModeHandler = () => {
		setIsLogIn((prevState) => !prevState);
		setError(null);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const userData = Object.fromEntries([...data.entries()]);
		const formattedData = {
			username: userData.username,
			password: userData.password,
			confirm_password: userData.confirm_password || "",
		};

		try {
			const endpoint = isLogin ? "auth/login" : "auth/signup";

			const response = await request(
				`https://anime-tracker-backend.vercel.app/${endpoint}`,
				"POST",
				JSON.stringify(formattedData),
				{
					"Content-Type": "application/json",
				}
			);

			authCtx.onLogin(response.userId, response.token);
			navigate("/");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				{isLoading && (
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<CircularProgress />
					</Box>
				)}
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						{isLogin ? "Log in" : "Sign Up"}
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoComplete="username"
							autoFocus
							error={error}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							error={error}
						/>
						{!isLogin && (
							<TextField
								margin="normal"
								required
								fullWidth
								name="confirm_password"
								label="Confirm Password"
								type="password"
								id="confirm_password"
								error={error}
							/>
						)}

						{error && (
							<Typography
								variant="body2"
								color="error"
								align="center"
								sx={{ mt: 2 }}
							>
								{error}
							</Typography>
						)}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item>
								<Link
									href="#"
									variant="body2"
									onClick={switchAuthModeHandler}
								>
									{isLogin
										? "Don't have an account? Sign Up"
										: "Already have an account? Log In"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default Authentication;
