'use client'

import Movie, { BASE_MOVIE } from '@/models/Movie'
import axios from 'axios'
import ImageMediaContent from './ui/ImageMediaContent'
import { useCallback, useEffect, useState } from 'react'
import YoutubeEmbed from './ui/YoutubeEmbed'
import Character from '@/models/Character'

const MovieItemDetail: React.FC<{ movieID: string}> = ({ movieID }) => {
  const [movie, setMovie] = useState<Movie>(BASE_MOVIE)
  const [characters, setCharacters] = useState<Array<Character>>([])

  const fetchData = useCallback(async () => {
    const { data: dataMovie } = await axios.get<{ data: Movie }>(`https://api.jikan.moe/v4/anime/${movieID}`)
    const { data: dataCharacters } = await axios.get<{ data: Array<Character> }>(`https://api.jikan.moe/v4/anime/${movieID}/characters`)
    setMovie(dataMovie.data)
    setCharacters(dataCharacters.data)
  }, [movieID])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const movieTitle = (
    <div className='flex flex-col w-full items-start justify-center'>
      <span className='text-2xl text-center'>
        {movie.title_english || movie.title}
      </span>
      <span className='text-xs text-center'>
        {movie.title}
      </span>
    </div>
  )

  const movieInfoSection = (
    <div className='flex w-[25%]'>
      <div className='flex flex-col w-full space-y-2'>
        <div className='w-full'>
          <ImageMediaContent
            src={movie.images.webp.large_image_url}
            className='w-full max-h-[26rem]'
            alt='Anime image' />
        </div>
        <div className='flex flex-col space-y-2'>
          <span>Alternative Titles</span>
          <hr />
          <span className='text-xs'>
            <b>English: </b>
            {movie.title_english}
          </span>
          <span className='text-xs'>
            <b>Japanese: </b>
            {movie.title_japanese}
          </span>
        </div>
        <div className='flex flex-col space-y-2'>
          <span>Information</span>
          <hr />
          <span className='text-xs'>
            <b>Status: </b>
            {movie.status}
          </span>
          <span className='text-xs'>
            <b>Duration: </b>
            {movie.duration}
          </span>
        </div>
        <div className='flex flex-col space-y-2'>
          <span>Statistics</span>
          <hr />
          <span className='text-xs'>
            <b>Score: </b>
            {movie.score} (scored by {movie.scored_by} users)
          </span>
          <span className='text-xs'>
            <b>Rank: </b>
            #{movie.rank}
          </span>
        </div>
      </div>
    </div>
  )

  const movieCharacters = characters.map(character => (
    <div key={character.character.mal_id}>{character.character.name}</div>
  ))

  const movieMainSection = (
    <div className='flex flex-col w-full space-y-2'>
      <div className='flex'>
        <span>Synopsis</span>
      </div>
      <hr />
      <div className='flex w-full justify-between'>
        <div className='flex w-[66%] text-justify'>
          <span>
            {movie.synopsis}
          </span>
        </div>
        <div className='flex w-[30%] h-[15rem]'>
          <YoutubeEmbed embedID={movie.trailer.youtube_id} />
        </div>
      </div>
      <div className='flex'>
        <span>Characters</span>
      </div>
      <hr />
      {movieCharacters}
    </div>
  )

  return (
    <div className='flex flex-col w-full space-y-5'>
      {movieTitle}
      <hr />
      <div className='flex w-full space-x-4'>
        {movieInfoSection}
        {movieMainSection}
      </div>
    </div>
  )
}

export default MovieItemDetail