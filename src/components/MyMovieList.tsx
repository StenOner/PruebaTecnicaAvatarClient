'use client'

import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import useLocalStorage from '@/hooks/use-local-storage'
import Movie from '@/models/Movie'
import EmptyListFallback from './ui/EmptyListFallback'
import MovieItem from './MovieItem'

const MyMovieList: React.FC = () => {
  const [movies, setMovies] = useState<Array<Movie>>([])
  const [myMovies, setMyMovies] = useLocalStorage<Array<string>>('MY_LIST', [])

  const fetchData = useCallback(async () => {
    const { data } = await axios.get<{ data: Array<Movie> }>('https://api.jikan.moe/v4/anime?q=one%20piece&type=Movie')
    setMovies(data.data.filter(movie => myMovies.includes(movie.mal_id.toString())))
  }, [myMovies])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const addToMyListHandler = (id: string) => {
    if (!myMovies.includes(id)) setMyMovies((prevState) => [...prevState, id])
  }

  const removeFromMyListHandler = (id: string) => {
    if (myMovies.includes(id)) {
      setMyMovies((prevState) => prevState.filter(value => value !== id))
      setMovies((prevState) => prevState.filter(movie => movie.mal_id.toString() !== id))
    }
  }

  const movieItems = movies.map(movie => (
    <MovieItem
      key={movie.mal_id}
      movie={movie}
      existsInMyList={myMovies.includes(movie.mal_id.toString())}
      addToMyList={addToMyListHandler}
      removeFromMyList={removeFromMyListHandler} />
))

  return (
    <>
      {myMovies.length <= 0 && (
        <EmptyListFallback />
      )}
      {movies.length > 0 && (
        <div className='flex flex-wrap justify-center'>
          {movieItems}
        </div>
      )}
    </>
  )
}

export default MyMovieList