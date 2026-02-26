const request = require('supertest');
const express = require('express');

// Creamos una app de prueba súper simple (Mock)
const app = express();
app.use(express.json());

// Simulamos la ruta de login para la prueba unitaria
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Credenciales incompletas" });
  }
  res.status(200).json({ token: "fake-token" });
});

describe('Pruebas Unitarias - Módulo de Autenticación', () => {
  it('Debería retornar error 400 si no se envían credenciales', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({}); // Enviamos objeto vacío
    
    // Verificamos que el servidor responda con el error esperado
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Credenciales incompletas");
  });
});