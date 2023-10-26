'use client'

import Movie from '@/models/Movie'
import axios from 'axios'
import { useEffect, useState } from 'react'
import MovieItem from './MovieItem'
import useLocalStorage from '@/hooks/use-local-storage'

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<Array<Movie>>([])
  const [myList, setMyList] = useLocalStorage<Array<string>>('MY_LIST', [])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData () {
    const { data } = await axios.get<{ data: Array<Movie> }>('https://api.jikan.moe/v4/anime?q=one%20piece&type=Movie')
    setMovies(data.data)
  }

  const addToMyListHandler = (id: string) => {
    if (!myList.includes(id)) setMyList((prevState) => [...prevState, id])
  }

  const removeFromMyListHandler = (id: string) => {
    if (myList.includes(id)) setMyList((prevState) => prevState.filter(value => value !== id))
  }

  const movieItems = movies.map(movie => (
      <MovieItem
        key={movie.mal_id}
        movie={movie}
        existsInMyList={myList.includes(movie.mal_id.toString())}
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