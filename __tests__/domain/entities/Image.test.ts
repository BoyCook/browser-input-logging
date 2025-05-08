import { Image } from '../../../src/domain/entities/Image';

describe('Given an Image entity', () => {
    describe('when creating a valid image', () => {
        it('then it should have all required properties', () => {
            const image: Image = {
                title: 'Test Image',
                link: 'https://test.com/image.jpg',
                thumbnail: 'https://test.com/thumb.jpg',
                context: 'https://test.com',
                width: 800,
                height: 600
            };

            expect(image).toHaveProperty('title');
            expect(image).toHaveProperty('link');
            expect(image).toHaveProperty('thumbnail');
            expect(image).toHaveProperty('context');
            expect(image).toHaveProperty('width');
            expect(image).toHaveProperty('height');
        });
    });
}); 