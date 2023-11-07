import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { wiseRouter } from './wise';
import { prettyJSON } from 'hono/pretty-json';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';

const app = new Hono();

// Middlewares
app.use('*', prettyJSON()); // Add ?pretty to the URL to get pretty JSON
app.use('*', cors());
app.use('*', logger());
app.use('*', secureHeaders());

// Routes
app.route('/wise', wiseRouter);

// Default routes
app.get('/', (c) => c.html(`<h1>Welcome to the Expense Tracker API</h1>`));
app.get('/health', (c) => c.json({ status: 'ok' }));

serve(app, ({ port }) => console.log(`Server listening on port ${port}`));
