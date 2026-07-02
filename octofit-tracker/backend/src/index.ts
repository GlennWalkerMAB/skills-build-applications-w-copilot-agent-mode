import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import apiRouter from './routes';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const apiBaseUrl = `${baseUrl}/api`;

app.use('/api', apiRouter);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    port: PORT,
    mongodb: MONGODB_URI,
    baseUrl,
    apiBaseUrl,
  });
});

async function startServer(): Promise<void> {
  try {
    await mongoose.connect(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`OctoFit backend running at ${baseUrl}`);
      console.log(`MongoDB connection target: ${MONGODB_URI}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

void startServer();
