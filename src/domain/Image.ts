export interface Image {
    title: string;
    link: string;
    thumbnail: string;
    context: string;
    width: number;
    height: number;
}

export interface ImageSearchResult {
    success: boolean;
    data?: Image[];
    error?: string;
    totalResults?: string;
    currentPage?: number;
} 