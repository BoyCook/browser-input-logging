import { ImageSearchRepository } from '@application/ImageSearchRepository';
import { ImageSearchResult } from '@domain/Image';

export class SearchImagesUseCase {
    constructor(private readonly imageSearchRepository: ImageSearchRepository) {}

    async execute(query: string, page: number = 1): Promise<ImageSearchResult> {
        if (!query.trim()) {
            return {
                success: false,
                error: 'Query parameter is required'
            };
        }

        return this.imageSearchRepository.searchImages(query, page);
    }
} 