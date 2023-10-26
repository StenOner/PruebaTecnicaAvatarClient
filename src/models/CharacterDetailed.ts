import VoiceActor from './VoiceActor';

export default interface CharacterDetailed {
  mal_id: number,
  url: string,
  images: {
    webp: {
      image_url: string,
    },
  },
  name: string,
  name_kanji: string,
  nicknames: Array<string>,
  favorites: number,
  about: string,
  anime: {
    role: string,
    url: string,
    images: {
      webp: {
        image_url: string,
        large_image_url: string,
      },
    },
    title: string,
  }[],
  voices: Array<VoiceActor>,
}

export const BASE_CHARACTER_DETAILED: CharacterDetailed = {
  mal_id: 0,
  url: '',
  images: {
    webp: {
      image_url: '',
    },
  },
  name: '',
  name_kanji: '',
  nicknames: [],
  favorites: 0,
  about: '',
  anime: [],
  voices: [],
}