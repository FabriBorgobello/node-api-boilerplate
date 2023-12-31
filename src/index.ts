import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { secureHeaders } from 'hono/secure-headers';

import routes from './routes';

const app = new Hono();

// Middlewares
app.use('*', prettyJSON()); // Add ?pretty to the URL to get pretty JSON
app.use('*', cors());
app.use('*', logger());
app.use('*', secureHeaders());

// Routes
app.route('/', routes);

// Default routes
app.get('/', (c) => c.html('<h1>Welcome to this API</h1>'));
app.get('/health', (c) => c.json({ status: 'ok' }));

serve(app, ({ port }) => console.log(`Server listening on port ${port}`));
