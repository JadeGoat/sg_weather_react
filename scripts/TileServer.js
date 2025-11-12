/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express from 'express';
import cors from 'cors';
import axios from 'axios';
import sharp from 'sharp';

const API_KEY =  process.env.VITE_OPEN_WEATHER_API;
const app = express();
app.use(cors());

app.get('/tiles/:layer/:z/:x/:y.png', async (req, res) => {
    const { layer, z, x, y } = req.params;
    const { brightness = 1.2, saturation = 2.0, contrast = 1.0 } = req.query;
    const tileUrl = `https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?appid=${API_KEY}`;

    try {
        const response = await axios.get(tileUrl, { responseType: 'arraybuffer' });
        const rawImage = Buffer.from(response.data);

        // Apply image processing: increase contrast, brightness, etc.
        const processedImage = await sharp(rawImage)
            .modulate({ 
                brightness: parseFloat(brightness), 
                saturation: parseFloat(saturation),
            })
            .linear(parseFloat(contrast), 0)
            .toBuffer();

        res.set('Content-Type', 'image/png');
        res.send(processedImage);
    } catch (error) {
        res.status(500).send('Tile processing failed');
        console.error('Error in tile processing:', error)
    }
});

const PORT = process.env.VITE_TILE_PORT || 4001;
app.listen(PORT, () => console.log(`Tile server running on http://localhost:${PORT}`));