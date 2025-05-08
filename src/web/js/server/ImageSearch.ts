import dotenv from 'dotenv';

dotenv.config();

interface ImageSearchResult {
    success: boolean;
    data?: ImageItem[];
    error?: string;
    totalResults?: string;
    currentPage?: number;
}

interface ImageItem {
    title: string;
    link: string;
    thumbnail: string;
    context: string;
    width: number;
    height: number;
}

interface GoogleSearchResponse {
    items: Array<{
        title: string;
        link: string;
        image: {
            thumbnailLink: string;
            contextLink: string;
            width: number;
            height: number;
        };
    }>;
    searchInformation: {
        totalResults: string;
    };
}

export default class ImageSearch {
    private readonly apiKey: string;
    private readonly searchEngineId: string;
    private readonly baseUrl: string;

    constructor() {
        this.apiKey = process.env.GOOGLE_API_KEY ?? '';
        this.searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID ?? '';
        this.baseUrl = process.env.GOOGLE_BASE_URL ?? 'https://www.googleapis.com/customsearch/v1';
    }

    async searchImages(query: string, page: number = 1): Promise<ImageSearchResult> {
        try {
            const params = new URLSearchParams({
                key: this.apiKey,
                cx: this.searchEngineId,
                q: query,
                searchType: 'image',
                num: '10',
                start: String((page - 1) * 10 + 1),
                safe: 'active',
                imgSize: 'large',
                imgType: 'photo'
            });

            const response = await fetch(`${this.baseUrl}?${params}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json() as GoogleSearchResponse;

            return {
                success: true,
                data: data.items.map(item => ({
                    title: item.title,
                    link: item.link,
                    thumbnail: item.image.thumbnailLink,
                    context: item.image.contextLink,
                    width: item.image.width,
                    height: item.image.height
                })),
                totalResults: data.searchInformation.totalResults,
                currentPage: page
            };
        } catch (error) {
            console.error('Image search error:', error instanceof Error ? error.message : 'Unknown error');
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }
} 