import { SearchImagesUseCase } from '@use-cases/SearchImagesUseCase';
import { ImageSearchRepository } from '@application/ImageSearchRepository';
import { ImageSearchResult } from '@domain/Image';

class FakeImageSearchRepository implements ImageSearchRepository {
    private results: ImageSearchResult[] = [];

    setResults(results: ImageSearchResult[]) {
        this.results = results;
    }

    async searchImages(query: string, page: number): Promise<ImageSearchResult> {
        return this.results[0] || {
            success: false,
            error: 'No results found'
        };
    }
}

describe('Given a SearchImagesUseCase', () => {
    let useCase: SearchImagesUseCase;
    let fakeRepository: FakeImageSearchRepository;

    beforeEach(() => {
        fakeRepository = new FakeImageSearchRepository();
        useCase = new SearchImagesUseCase(fakeRepository);
    });

    describe('when executing with an empty query', () => {
        it('then it should return an error', async () => {
            const result = await useCase.execute('');

            expect(result.success).toBe(false);
            expect(result.error).toBe('Query parameter is required');
        });
    });

    describe('when executing with a valid query', () => {
        const fakeResult: ImageSearchResult = {
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
            fakeRepository.setResults([fakeResult]);
        });

        it('then it should return the search results', async () => {
            const result = await useCase.execute('test query');

            expect(result).toEqual(fakeResult);
        });

        it('then it should handle custom page numbers', async () => {
            const result = await useCase.execute('test query', 2);

            expect(result).toEqual(fakeResult);
        });
    });
}); 