'use client'

import Movie from '@/models/Movie'
import axios from 'axios'
import { useEffect, useState } from 'react'
import MovieItem from './MovieItem'

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<Array<Movie>>([])
  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData () {
    const { data } = await axios.get<{ data: Array<Movie> }>('https://api.jikan.moe/v4/anime?q=one%20piece&type=Movie')
    setMovies(data.data as Movie[])
  }

  const movieItems = movies.map(movie => (
    <>
      <MovieItem key={movie.mal_id} movie={movie}/>
    </>
  ))

  return (
    <div className='flex flex-wrap justify-center'>
      {movieItems}
    </div>
  )
}

export default MoviesList