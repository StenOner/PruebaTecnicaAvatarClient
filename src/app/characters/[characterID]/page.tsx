import CharacterItemDetail from '@/components/CharacterItemDetail'

const CharacterDetail: React.FC<{ params: { characterID: string }}> = ({ params }) => {
  const charactedID = params.characterID

  return (
    <>
      <CharacterItemDetail 
        charactedID={charactedID} />
    </>
  )
}

export default CharacterDetail