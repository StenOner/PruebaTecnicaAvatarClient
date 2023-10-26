const CharacterDetail: React.FC<{ params: { characterID: string }}> = ({ params }) => {
  console.log(params.characterID);
  
  return (
    <div>CharacterDetail</div>
  )
}

export default CharacterDetail