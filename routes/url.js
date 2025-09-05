import express from 'express'
import { handleGenerateNewShortURL, handleUserUrl, handleAnalyticsUrl } from '../controllers/url.js';
const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get('/:shortId', handleUserUrl);
router.get('/analytics/:shortId', handleAnalyticsUrl);

export default router;

