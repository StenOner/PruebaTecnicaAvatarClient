const MovieDetail: React.FC<{ params: { movieID: string }}> = ({ params }) => {
  console.log(params.movieID);
  
  return (
    <div>movie detail</div>
  )
}

export default MovieDetail