const YoutubeEmbed: React.FC<{ embedID: string }> = ({ embedID }) => (
  <div className='w-full h-full'>
    <iframe
      className='h-full w-full'
      src={`https://www.youtube.com/embed/${embedID}`}
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
      title='Embedded youtube' />
  </div>
)

export default YoutubeEmbed