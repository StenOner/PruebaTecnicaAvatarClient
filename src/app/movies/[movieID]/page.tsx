import MovieItemDetail from '@/components/MovieItemDetail';

const MovieDetail: React.FC<{ params: { movieID: string }}> = ({ params }) => {
  const movieID = params.movieID
  
  return (
    <>
      <MovieItemDetail
        movieID={movieID} />
    </>
  )
}

export default MovieDetail