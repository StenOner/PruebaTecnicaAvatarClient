'use client'

import Movie, { BASE_MOVIE } from '@/models/Movie'
import axios from 'axios'
import ImageMediaContent from './ui/ImageMediaContent'
import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import Character from '@/models/Character'
import Link from 'next/link'
import useLocalStorage from '@/hooks/use-local-storage'
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/24/solid'
import SpinnerLoading from './ui/SpinnerLoading'
const YoutubeEmbed = lazy(() => import('./ui/YoutubeEmbed'))

const MovieItemDetail: React.FC<{ movieID: string}> = ({ movieID }) => {
  const [movie, setMovie] = useState<Movie>(BASE_MOVIE)
  const [characters, setCharacters] = useState<Array<Character>>([])
  const [myMovies, setMyMovies] = useLocalStorage<Array<string>>('MY_LIST', [])
  const [watchLater, setWatchLater] = useLocalStorage<Array<string>>('WATCH_LATER', [])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const CHARACTERS_PER_PAGE = 6
  const LAST_PAGE = Math.ceil(characters.length / CHARACTERS_PER_PAGE)
  const paginationStart = (currentPage - 1) * CHARACTERS_PER_PAGE
  const paginationEnd = currentPage * CHARACTERS_PER_PAGE
  const paginatedCharacters = characters.slice(paginationStart, paginationEnd)

  const fetchData = useCallback(async () => {
    const { data: dataMovie } = await axios.get<{ data: Movie }>(`https://api.jikan.moe/v4/anime/${movieID}`)
    const { data: dataCharacters } = await axios.get<{ data: Array<Character> }>(`https://api.jikan.moe/v4/anime/${movieID}/characters`)
    setMovie(dataMovie.data)
    setCharacters(dataCharacters.data)
  }, [movieID])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const addToMyListHandler = (id: string) => {
    if (!myMovies.includes(id)) setMyMovies((prevState) => [...prevState, id])
  }

  const addToWatchLaterHandler = (id: string) => {
    if (!watchLater.includes(id)) setWatchLater((prevState) => [...prevState, id])
  }

  const changeCurrentPage = (page: number) => {
    if (page < 1 || page > LAST_PAGE) return
    setCurrentPage(page)
  }

  const addButtons = (
    <div className='flex flex-row space-x-1'>
      {!myMovies.includes(movie.mal_id.toString()) && (
        <div>
          <button
            className='flex border rounded-md px-1 bg-slate-600 hover:bg-slate-400 transition-all duration-200'
            onClick={addToMyListHandler.bind(null, movie.mal_id.toString())}>
              <PlusIcon className='h-4' />
              <span className='text-xs'>
                My List
              </span>
          </button>
        </div>
      )}
      {!watchLater.includes(movie.mal_id.toString()) && (
        <div>
          <button
            className='flex border rounded-md px-1 bg-slate-600 hover:bg-slate-400 transition-all duration-200'
            onClick={addToWatchLaterHandler.bind(null, movie.mal_id.toString())}>
              <PlusIcon className='h-4' />
              <span className='text-xs'>
                Watch Later
              </span>
          </button>
        </div>
      )}
    </div>
  )

  const movieTitle = (
    <div className='flex flex-col items-start justify-center mr-2'>
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
            {movie.score} (scored by {movie.scored_by.toLocaleString('en-US')} users)
          </span>
          <span className='text-xs'>
            <b>Rank: </b>
            #{movie.rank}
          </span>
        </div>
      </div>
    </div>
  )

  const movieCharacters = (
    <div className='flex flex-wrap justify-between'>
      {paginatedCharacters.map(character => (
        <div key={character.character.mal_id} className='flex w-[45%] m-1 space-x-2'>
          <div>
            <Link href={`/characters/${character.character.mal_id}`}>
              <ImageMediaContent
                src={character.character.images.webp.image_url}
                className='w-20 h-[7.5rem]' />
            </Link>
          </div>
          <div className='flex flex-col'>
            <Link href={`/characters/${character.character.mal_id}`} className='text-lg text-center text-blue-400 hover:text-blue-300'>
              {character.character.name}
            </Link>
            <span className='text-xs'>
              {character.role}
            </span>
          </div>
        </div>
      ))}
    </div>
  )

  const charactersPagination = (
    <div className='flex w-full justify-end items-center pr-10'>
      <button onClick={changeCurrentPage.bind(null, 1)} className={`${currentPage === 1 ? 'hover:cursor-not-allowed text-gray-600' : 'hover:text-gray-400'} transition-all duration-200`}>
        <ChevronDoubleLeftIcon className='h-6' />
      </button>
      <button onClick={changeCurrentPage.bind(null, currentPage - 1)} className={`${currentPage === 1 ? 'hover:cursor-not-allowed text-gray-600' : 'hover:text-gray-400'} transition-all duration-200`}>
        <ChevronLeftIcon className='h-6' />
      </button>
      <span className='border px-2 mx-2 rounded-sm'>
        {currentPage}
      </span>
      <button onClick={changeCurrentPage.bind(null, currentPage + 1)} className={`${currentPage === LAST_PAGE ? 'hover:cursor-not-allowed text-gray-600' : 'hover:text-gray-400'} transition-all duration-200`}>
        <ChevronRightIcon className='h-6' />
      </button>
      <button onClick={changeCurrentPage.bind(null, LAST_PAGE)} className={`${currentPage === LAST_PAGE ? 'hover:cursor-not-allowed text-gray-600' : 'hover:text-gray-400'} transition-all duration-200`}>
        <ChevronDoubleRightIcon className='h-6' />
      </button>
    </div>
  )

  const movieMainSection = (
    <div className='flex flex-col w-full space-y-2'>
      <div className='flex'>
        <span>Synopsis</span>
      </div>
      <hr />
      <div className='flex w-full justify-between'>
        <div className='flex w-[66%]'>
          <span className='text-justify'>
            {movie.synopsis}
          </span>
        </div>
        <div className='flex w-[30%] h-[15rem]'>
          <Suspense fallback={<SpinnerLoading />}>
            <YoutubeEmbed embedID={movie.trailer.youtube_id} />
          </Suspense>
        </div>
      </div>
      <div className='flex'>
        <span>Characters</span>
      </div>
      <hr />
      {movieCharacters}
      {charactersPagination}
    </div>
  )

  return (
    <div className='flex flex-col w-full space-y-5'>
      <div className='flex flex-row'>
        {movieTitle}
        {addButtons}
      </div>
      <hr />
      <div className='flex w-full space-x-4'>
        {movieInfoSection}
        {movieMainSection}
      </div>
    </div>
  )
}

export default MovieItemDetail