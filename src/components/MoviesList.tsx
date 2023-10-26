'use client'

import Movie from '@/models/Movie'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import MovieItem from './MovieItem'
import useLocalStorage from '@/hooks/use-local-storage'

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<Array<Movie>>([])
  const [myMovies, setMyMovies] = useLocalStorage<Array<string>>('MY_LIST', [])

  const fetchData = useCallback(async () => {
    const { data } = await axios.get<{ data: Array<Movie> }>('https://api.jikan.moe/v4/anime?q=one%20piece&type=Movie')
    setMovies(data.data)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const addToMyListHandler = (id: string) => {
    if (!myMovies.includes(id)) setMyMovies((prevState) => [...prevState, id])
  }

  const removeFromMyListHandler = (id: string) => {
    if (myMovies.includes(id)) setMyMovies((prevState) => prevState.filter(value => value !== id))
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
    <div className='flex flex-wrap justify-center'>
      {movieItems}
    </div>
  )
}

export default MoviesList