import { ImageSearchResult } from '@domain/Image';

export interface ImageSearchRepository {
    searchImages(query: string, page: number): Promise<ImageSearchResult>;
} 