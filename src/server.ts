import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'web/html/index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 