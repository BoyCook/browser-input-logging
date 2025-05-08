import express from 'express';
import path from 'path';
import { GoogleImageSearchRepository } from './repositories/GoogleImageSearchRepository';
import { SearchImagesUseCase } from './application/use-cases/SearchImagesUseCase';
import { ImageSearchController } from './controllers/ImageSearchController';

const app = express();
const port = 3000;

// Initialize dependencies
const imageSearchRepository = new GoogleImageSearchRepository();
const searchImagesUseCase = new SearchImagesUseCase(imageSearchRepository);
const imageSearchController = new ImageSearchController(searchImagesUseCase);

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'web/html/index.html'));
});

// Image search endpoint
app.get('/api/images', (req, res) => imageSearchController.searchImages(req, res));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 