import { Hono } from 'hono';

import resourceRouter from '@/resource/resource.controller';

const router = new Hono();

// Add routes here
router.route('/resource', resourceRouter);

export default router;
