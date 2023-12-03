import { useCallback, useState } from "react";

const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);

	// Added default parameter values
	const request = useCallback(
		async (url, method = "GET", body = null, headers = {}) => {
			try {
				const response = await fetch(url, {
					method,
					body,
					headers,
				});
				const data = await response.json();
				if (!response.ok) {
					throw new Error(data.message);
				}
				setIsLoading(false);

				return data;
			} catch (error) {
				throw error;
			}
		},
		[]
	);

	return { isLoading, request };
};

export default useHttpClient;
