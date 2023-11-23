import React, { createContext, useState } from "react";

export const AnimeQueryContext = createContext();

export const AnimeQueryProvider = (props) => {
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
			{props.children}
		</AnimeQueryContext.Provider>
	);
};
