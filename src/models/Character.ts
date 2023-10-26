interface VoiceActor {
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

export default interface Character {
  character: {
    mal_id: number,
    url: string,
    images: {
      webp: {
        image_url: string,
      },
    },
    name: string,
  },
  role: string,
  favorites: number,
  voice_actors: Array<VoiceActor>
}