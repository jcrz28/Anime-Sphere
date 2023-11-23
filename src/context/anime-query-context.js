import React, { createContext, useState } from "react";

export const AnimeQueryContext = createContext();

export const AnimeQueryProvider = ({ children }) => {
	const [enteredAnime, setEnteredAnime] = useState("");

	const resetQuery = () => {
		setEnteredAnime("");
	};

	const contextValue = {
		enteredAnime,
		setEnteredAnime,
		resetQuery,
	};

	return (
		<AnimeQueryContext.Provider value={contextValue}>
			{children}
		</AnimeQueryContext.Provider>
	);
};
