import ImageSearch from '../src/js/server/ImageSearch';

describe('Given an ImageSearch instance', () => {
    let imageSearch: ImageSearch;

    beforeEach(() => {
        imageSearch = new ImageSearch();
    });

    describe('when initializing', () => {
        it('then it should be properly instantiated', () => {
            expect(imageSearch).toBeInstanceOf(ImageSearch);
        });
    });

    describe('when searching with an empty query', () => {
        it('then it should return an error', async () => {
            const result = await imageSearch.searchImages('');
            expect(result.success).toBe(false);
            expect(result.error).toBeDefined();
        });
    });
}); 