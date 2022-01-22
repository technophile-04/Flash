import { useEffect, useState } from 'react';
const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const useFetch = ({ keyword }) => {
	const [gifUrl, setGifUrl] = useState('');

	useEffect(() => {
		if (keyword) {
			const fetchGifs = async () => {
				try {
					const response = await fetch(
						`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword
							.split(' ')
							.join('')}&limit=1`
					);

					const { data } = await response.json();
					setGifUrl(data[0]?.images?.downsized_medium?.url);
				} catch (error) {
					setGifUrl(
						'https://acegif.com/wp-content/uploads/gif-shaking-head-38.gif'
					);
				}
			};

			fetchGifs();
		}
	}, [keyword]);

	return gifUrl;
};

export default useFetch;
