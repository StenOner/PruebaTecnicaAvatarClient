export default interface VoiceActor {
  person: {
    mal_id: number,
    url: string,
    images: {
      jpg: {
        image_url: string,
      },
    },
    name: string,
  },
  language: string,
}