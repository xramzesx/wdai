export type Post = {
    userId : number;
    id: number;
    title: string;
    body: string
}

export type Photo = {
    albumId : number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl : string;
}