import React, { createContext, useState } from "react";

export const AnimeQueryContext = createContext();

export const AnimeQueryProvider = (props) => {
	const [enteredAnime, setEnteredAnime] = useState(null);
	const [selectedScore, setSelectedScore] = useState(null);
	const [selectedRating, setSelectedRating] = useState(null);
	const [selectedGenre, setSelectedGenre] = useState(null);
	const [selectedTheme, setSelectedTheme] = useState(null);

	const resetQuery = () => {
		setEnteredAnime("");
		setSelectedScore(null);
		setSelectedRating(null);
		setSelectedGenre(null);
		setSelectedTheme(null);
	};

	const contextValue = {
		enteredAnime,
		setEnteredAnime,
		selectedScore,
		setSelectedScore,
		selectedRating,
		setSelectedRating,
		selectedGenre,
		setSelectedGenre,
		selectedTheme,
		setSelectedTheme,
		resetQuery,
	};

	return (
		<AnimeQueryContext.Provider value={contextValue}>
			{props.children}
		</AnimeQueryContext.Provider>
	);
};
