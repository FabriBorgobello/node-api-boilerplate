import { Hono } from 'hono';

const router = new Hono();

// HTTP Methods
router
  // List: GET /
  .get('/', async (c) => {
    return c.json({ message: 'GET /' });
  })
  // Retrieve: GET /:id
  .get('/:id', async (c) => {
    const id = c.req.param('id');
    return c.json({ message: `GET /${id}` });
  })
  // Create: POST /
  .post('/', async (c) => {
    const body = await c.req.json();
    return c.json({ message: 'POST /', body });
  })
  // Update: PUT /:id
  .put('/:id', async (c) => {
    const body = await c.req.json();
    return c.json({ message: 'POST /', body });
  })
  // Delete: DELETE /:id
  .delete('/:id', async (c) => {
    const id = c.req.param('id');
    return c.json({ message: `DELETE /${id}` });
  });

export default router;
