import dotenv from 'dotenv';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
dotenv.config();
// Import the routes
import routes from './routes/index.js';
// Import path and fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;
// Serve static files of entire client dist folder
const staticFolder = path.join(__dirname, '../../client/dist');
console.log(staticFolder); // TESTING
app.use(express.static(staticFolder));
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// TODO: Implement middleware to connect the routes
app.use(routes);
// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
