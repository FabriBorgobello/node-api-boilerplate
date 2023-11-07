import { Hono } from 'hono';

import resourceRouter from '@/resource/resource.controller';
import usersRouter from '@/users/users.controller';

const router = new Hono();

// Add routes here
router.route('/users', usersRouter);
router.route('/resource', resourceRouter);

export default router;
