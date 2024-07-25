import { useEffect, useState } from 'react';

const KEY = 'a0b1e087';

export function useMovies(query, callBack) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  function handleIsLoading() {
    setIsLoading((isLoading) => !isLoading);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        handleIsLoading();
        setError('');

        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!response.ok)
          throw new Error('Something went wrong with loading movies');

        const data = await response.json();
        if (data.Response === 'False') throw new Error('Movie not found');

        setMovies(data.Search);
        setError('');
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        handleIsLoading();
      }

      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }
    }

    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
