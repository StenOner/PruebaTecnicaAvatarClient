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
}