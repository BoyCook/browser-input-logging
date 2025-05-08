import { SearchImagesUseCase } from '@use-cases/SearchImagesUseCase';
import { ImageSearchRepository } from '@application/ImageSearchRepository';
import { ImageSearchResult } from '@domain/Image';

describe('Given a SearchImagesUseCase', () => {
    let useCase: SearchImagesUseCase;
    let mockRepository: jest.Mocked<ImageSearchRepository>;

    beforeEach(() => {
        mockRepository = {
            searchImages: jest.fn()
        };
        useCase = new SearchImagesUseCase(mockRepository);
    });

    describe('when executing with an empty query', () => {
        it('then it should return an error', async () => {
            const result = await useCase.execute('');

            expect(result.success).toBe(false);
            expect(result.error).toBe('Query parameter is required');
            expect(mockRepository.searchImages).not.toHaveBeenCalled();
        });
    });

    describe('when executing with a valid query', () => {
        const mockResult: ImageSearchResult = {
            success: true,
            data: [{
                title: 'Test Image',
                link: 'https://test.com/image.jpg',
                thumbnail: 'https://test.com/thumb.jpg',
                context: 'https://test.com',
                width: 800,
                height: 600
            }],
            totalResults: '100',
            currentPage: 1
        };

        beforeEach(() => {
            mockRepository.searchImages.mockResolvedValue(mockResult);
        });

        it('then it should return the search results', async () => {
            const result = await useCase.execute('test query');

            expect(result).toEqual(mockResult);
            expect(mockRepository.searchImages).toHaveBeenCalledWith('test query', 1);
        });

        it('then it should handle custom page numbers', async () => {
            const result = await useCase.execute('test query', 2);

            expect(result).toEqual(mockResult);
            expect(mockRepository.searchImages).toHaveBeenCalledWith('test query', 2);
        });
    });
}); 