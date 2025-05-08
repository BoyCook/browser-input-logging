import { Request, Response } from 'express';
import { SearchImagesUseCase } from '../application/use-cases/SearchImagesUseCase';

export class ImageSearchController {
    constructor(private readonly searchImagesUseCase: SearchImagesUseCase) {}

    async searchImages(req: Request, res: Response): Promise<void> {
        const { query, page } = req.query;
        
        if (!query) {
            res.status(400).json({ 
                success: false, 
                error: 'Query parameter is required' 
            });
            return;
        }

        const result = await this.searchImagesUseCase.execute(
            query as string, 
            parseInt(page as string) || 1
        );
        
        res.json(result);
    }
} 