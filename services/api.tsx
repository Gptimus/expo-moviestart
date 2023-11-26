import { MediaType, TrendingResult } from '@/types/api-results';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const getTrending = async (page: number = 1): Promise<TrendingResult> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?language=fr-FR&api_key=${API_KEY}&page=${page}`
  );

  return response.json();
};

export const getSearchResults = async (query: string): Promise<TrendingResult> => {
  console.log('Search', query);
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?language=fr-FR&api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );

  console.log(
    `https://api.themoviedb.org/3/search/multi?language=fr-FR&api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );

  return response.json();
};

export const getMovieDetailsByIdAndMediaType = async (
  id: number,
  mediaType: MediaType
): Promise<TrendingResult> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${id}?language=fr-FR&api_key=${API_KEY}`
  );

  return response.json();
};
