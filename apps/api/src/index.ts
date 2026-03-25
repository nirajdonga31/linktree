import express from 'express';
import cors from 'cors';
import linksRoutes from './routes/links';
import analyticsRoutes from './routes/analytics';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/links', linksRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', code: 'INTERNAL_ERROR' });
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

export default app;
