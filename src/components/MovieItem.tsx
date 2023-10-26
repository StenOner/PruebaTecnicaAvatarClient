import Movie from '@/models/Movie'
import ImageMediaContent from './ui/ImageMediaContent'
import Link from 'next/link'
import { StarIcon, UserIcon } from '@heroicons/react/24/outline'

const MovieItem: React.FC<{ movie: Movie, existsInMyList: boolean ,addToMyList: (id: string) => void, removeFromMyList: (id: string) => void }> = ({ movie, existsInMyList, addToMyList, removeFromMyList }) => {
  const movieTitle = (
    <div className='flex flex-col w-full justify-center items-center h-20'>
      <Link href={`/movies/${movie.mal_id}`} className='text-lg text-center text-blue-400 hover:text-blue-300'>
        {movie.title_english || movie.title}
      </Link>
      <span className='text-xs text-center'>
        {movie.title}
      </span>
    </div>
  )

  const genresList = (
    <div className='flex w-full space-x-3 justify-center overflow-hidden'>
      {movie.genres.map(genre => (
        <div key={genre.mal_id} className='flex flex-wrap border border-white p-1 rounded-lg'>
          <span className='text-sm whitespace-nowrap'>
            {genre.name}
          </span>
        </div>
      ))}
    </div>
  )

  const movieBody = (
    <div className='flex space-x-2 h-80'>
      <div>
        <Link href={`/movies/${movie.mal_id}`}>
          <ImageMediaContent
            src={movie.images.webp.image_url}
            className='max-h-full max-w-[14rem]' />
        </Link>
      </div>
      <div className='flex w-full h-full'>
        <span className='overflow-hidden hover:overflow-y-auto text-xs'>
          {movie.synopsis || 'Synopsis not available'}
        </span>
      </div>
    </div>
  )

  const movieFooter = (
    <div className='flex justify-around items-center'>
      <div className='flex space-x-2'>
        <StarIcon className='h-6' />
        <span>{movie.score}</span>
      </div>
      <div className='flex space-x-2'>
        <UserIcon className='h-6' />
        <span>{movie.scored_by}</span>
      </div>
      <div className='flex'>
        {(!existsInMyList && (
          <button
            className='flex border rounded-md p-2 bg-slate-600 hover:bg-slate-400 transition-all duration-200'
            onClick={addToMyList.bind(null, movie.mal_id.toString())}>
            Add to My List
          </button>
        )) || existsInMyList && (
          <button
            className='flex border rounded-md p-2 bg-red-600 hover:bg-red-400 transition-all duration-200'
            onClick={removeFromMyList.bind(null, movie.mal_id.toString())}>
            Remove from My List
          </button>
        )}
      </div>
    </div>
  )
  
  return (
    <div className='flex flex-col w-[30%] space-y-5 m-2'>
      {movieTitle}
      {genresList}
      {movieBody}
      {movieFooter}
    </div>
  )
}

export default MovieItem