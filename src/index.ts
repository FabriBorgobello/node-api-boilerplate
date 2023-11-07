import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { wiseRouter } from './wise';

const app = new Hono();

// Routes
app.route('/wise', wiseRouter);

// Default routes
app.get('/', (c) => c.html(`<h1>Welcome to the Expense Tracker API</h1>`));
app.get('/health', (c) => c.json({ status: 'ok' }));

serve(app, ({ port }) => console.log(`Server listening on port ${port}`));
