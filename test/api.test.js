const request = require('supertest');
const api = require('../src/api.js');
const { seed } = require('../src/seed.js')

beforeEach(async () => {
    await seed()
})

describe("API substract", () => {
    test("Deberia responder con un 200 ok", async () => {
        const app = await api.build()

        return request(app)
            .get('/api/v1/sub/2/1')
            .expect(200)
            .expect('Content-Type', "application/json; charset=utf-8")
            .then((res) => {
                expect(res.body.result).toEqual(1);
            });
    });

})

describe("API divide", () => {
    test("Debería responder con un 400 ERROR", async () => {
        const app = await api.build();

        return request(app)
            .get('/api/v1/div/2/0')
            .expect(400)
            .expect('Content-Type', "application/json; charset=utf-8")
            .then((res) => {
                expect(res.body.message).toEqual("El divisor no puede ser cero");
            });
    });
});

describe("API multiply", () => {
    test("Deberia responder con un 200", async () => {
        const app = await api.build()

        return request(app)
            .get('/api/v1/mul/2.1/2.1')
            .expect(200)
            .expect('Content-Type', "application/json; charset=utf-8")
            .then((res) => {
                expect(res.body.result).toEqual(4.41);
            });
    });
})

describe("API add", () => {
    test("Si segundo parámetro es negativo, el resultado tiene que sermenor al primer parámetro y el endpoint devuelver un status 200.", async () => {
        const app = await api.build()

        return request(app)
        .get('/api/v1/add/2/-1')
        .expect(200) // Espera un código de estado 200
        .expect('Content-Type', "application/json; charset=utf-8") // Espera el tipo de contenido adecuado
        .then((res) => {
          const result = res.body.result;
          expect(result).toBeLessThan(2); // Comprueba que el resultado sea menor a 2 (primer parámetro)
        });
    });
});

