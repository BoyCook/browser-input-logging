require('dotenv').config();

class ImageSearch {
    constructor() {
        this.apiKey = process.env.GOOGLE_API_KEY;
        this.searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
        this.baseUrl = 'https://www.googleapis.com/customsearch/v1';
    }

    async searchImages(query, page = 1) {
        try {
            const params = new URLSearchParams({
                key: this.apiKey,
                cx: this.searchEngineId,
                q: query,
                searchType: 'image',
                num: 10,
                start: (page - 1) * 10 + 1,
                safe: 'active',
                imgSize: 'large',
                imgType: 'photo'
            });

            const response = await fetch(`${this.baseUrl}?${params}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();

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
            console.error('Image search error:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

module.exports = ImageSearch; 