import Movie from '@/models/Movie'
import ImageMediaContent from './ui/ImageMediaContent';

const MovieItem: React.FC<{ movie: Movie }> = ({ movie }) => {
  console.log(movie);

  const movieTitle = (
    <div className='flex flex-col w-full justify-center items-center h-20'>
      <span className='text-lg text-center'>{movie.title_english || movie.title}</span>
      <span className='text-xs text-center'>{movie.title}</span>
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
    <div className='flex space-x-2 max-h-80'>
      <ImageMediaContent
        src={movie.images.webp.image_url}
        className='max-h-80 max-w-[14rem] flex-[0]' />
      <div className='flex w-full h-80'>
        <span className='flex-1 overflow-y-scroll text-xs'>
          {movie.synopsis || 'Synopsis not available'}
        </span>
      </div>
    </div>
  )
  
  return (
    <div className='flex flex-col w-[30%] space-y-3 pt-4'>
      {movieTitle}
      {genresList}
      {movieBody}
    </div>
  )
}

export default MovieItem