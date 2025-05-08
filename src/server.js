const express = require('express');
const path = require('path');
const ImageSearch = require('./js/server/ImageSearch');
const app = express();
const port = 3000;

// Initialize image search
const imageSearch = new ImageSearch();

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html/index.html'));
});

// Image search endpoint
app.get('/api/images', async (req, res) => {
    const { query, page } = req.query;
    
    if (!query) {
        return res.status(400).json({ 
            success: false, 
            error: 'Query parameter is required' 
        });
    }

    const result = await imageSearch.searchImages(query, parseInt(page) || 1);
    res.json(result);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 