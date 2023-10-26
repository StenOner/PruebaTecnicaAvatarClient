import Genre from './Genre';

export default interface Movie {
    mal_id: number,
    url: string,
    images: {
        webp: {
            image_url: string,
            small_image_url: string,
            large_image_url: string,
        },
    },
    title: string,
    title_english: string,
    title_japanese: string,
    source: string,
    status: string,
    airing: boolean,
    duration: string,
    score: number,
    scored_by: number,
    rank: number,
    synopsis: string | null,
    genres: Array<Genre>,
    trailer: {
        embed_url: string,
        url: string,
        youtube_id: string,
    }
}

export const BASE_MOVIE: Movie = {
    mal_id: 0,
    url: '',
    images: {
        webp: {
            image_url: '',
            small_image_url: '',
            large_image_url: '',
        },
    },
    title: '',
    title_english: '',
    title_japanese: '',
    source: '',
    status: '',
    airing: false,
    duration: '',
    score: 0,
    scored_by: 0,
    rank: 0,
    synopsis: '',
    genres: [],
    trailer: {
        embed_url: '',
        url: '',
        youtube_id: '',
    }
}