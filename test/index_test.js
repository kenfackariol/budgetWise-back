const request = require('supertest');
const app = require('../index');

describe('Budget API', () => {
  it('GET /api/budget devrait retourner un budget par défaut', async () => {
    const res = await request(app).get('/api/budget');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('budgetMensuel');
  });

  it('POST /api/budget devrait mettre à jour le budget', async () => {
    const res = await request(app)
      .post('/api/budget')
      .send({ budget: 1500 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.budgetMensuel).toBe(1500);
  });

  it('POST /api/budget avec budget négatif devrait échouer', async () => {
    const res = await request(app)
      .post('/api/budget')
      .send({ budget: -100 });
    expect(res.statusCode).toEqual(400);
  });

  it('POST /api/depenses devrait ajouter une dépense', async () => {
    const depense = {
      id: 'dep1',
      montant: 50,
      categorie: 'Courses',
      tags: ['Urgent'],
      date: '2025-06-10',
    };
    const res = await request(app)
      .post('/api/depenses')
      .send(depense);
    expect(res.statusCode).toEqual(201);
    expect(res.body.id).toBe('dep1');
  });

  it('GET /api/depenses devrait retourner les dépenses', async () => {
    const res = await request(app).get('/api/depenses');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
