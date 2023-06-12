export { borrarHistorial, obtenerHistorial,obtenerHistorialPorID, History} from '../src/models.js';
const { seed } = require('../src/seed.js')

const {
    createHistoryEntry,
    History,
    Operation,
    borrarHistorial,
    obtenerHistorial,
    obtenerHistorialPorID
} = require('../src/models.js')

beforeEach(async () => {
    await seed()
})

describe("History", () => {
    test("Deberia poder crear una resta en el history", async () => {
        await createHistoryEntry({
            firstArg: 2,
            secondArg: 2,
            result: 0,
            operationName: "SUB"
        })

        const histories = await History.findAll({
            include: [Operation]
        })

        expect(histories.length).toEqual(1)
        expect(histories[0].firstArg).toEqual(2)
        expect(histories[0].result).toEqual(0)
        expect(histories[0].Operation.name).toEqual("SUB")
    })

    test("Deberia poder persistir el segundo argumento de tabla History", async () => {
        await createHistoryEntry({
            firstArg: 24,
            secondArg: 2,
            result: 22,
            operationName: "SUB"
        })

        const histories = await History.findAll({
            include: [Operation]
        })

        expect(histories.length).toEqual(1)
        expect(histories[0].firstArg).toEqual(24)
        expect(histories[0].secondArg).not.toBeNull() // Si el segundo argumento es Nulo, no pasa el test.
        expect(histories[0].result).toEqual(22)
        expect(histories[0].Operation.name).toEqual("SUB")
    })
    
    
})

describe("History", () => {
    test("Deberia poder cargar un erorr en la tabla History", async () => {
        await createHistoryEntry({
            firstArg: 2,
            secondArg: null,
            result: null,
            error: "El segundo parámetro es null",
            operationName: "SUB"
        })

        const histories = await History.findAll({
            include: [Operation]
        })

        expect(histories.length).toEqual(1)
        expect(histories[0].firstArg).toEqual(2)
        expect(histories[0].secondArg).toBeNull()
        expect(histories[0].result).toBeNull()
        expect(histories[0].error).not.toBeNull()
        expect(histories[0].Operation.name).toEqual("SUB")
    })
})

describe("History", () => {
    test("Debería devolver todo el historial ", async () => {
        await createHistoryEntry({
          firstArg: 5,
          secondArg: 2,
          result: 3,
          operationName: "SUB",
        });
        await createHistoryEntry({
          firstArg: 9,
          secondArg: 3,
          result: 6,
          operationName: "SUB",
        });
            
        const histories = await obtenerHistorial();
    
        expect(histories.length).toEqual(2);
        expect(histories[0].firstArg).toEqual(5);
        expect(histories[0].secondArg).toEqual(2);
        expect(histories[0].result).toEqual(3);
        expect(histories[1].firstArg).toEqual(9);
        expect(histories[1].secondArg).toEqual(3);
        expect(histories[1].result).toEqual(6);
        expect(histories).toBeDefined(); // Verificar que se haya obtenido algún resultado
        expect(Array.isArray(histories)).toBe(true); // Verificar que el historial sea un arreglo
      });
});


describe("History", () => {
    test("Debería borrar el historial", async () => {
        await createHistoryEntry({
            firstArg: 5,
            secondArg: 2,
            result: 3,
            operationName: "SUB",
        });
        await createHistoryEntry({
            firstArg: 9,
            secondArg: 3,
            result: 6,
            operationName: "ADD",
        });
        await borrarHistorial();
        const histories = await obtenerHistorial();
        expect(histories.length).toEqual(0);
    }); 
});

describe("History", () => {
    test("Deberia poder obtener un historial por id", async () => {
        await createHistoryEntry({
          firstArg: 2,
          secondArg: 3,
          result: 5,
          operationName: 'POW'
        });
  
  
        await createHistoryEntry({
          firstArg: 6,
          secondArg: 3,
          result: 3,
          operationName: 'DIV'
        });
  
        const histories = await obtenerHistorialPorID(1);
        expect(histories).toBeDefined(); 
        expect(histories.id).toBe(1); 
        expect(histories.firstArg).toEqual(2);
        expect(histories.secondArg).toEqual(3);
        expect(histories.result).toEqual(5);
        expect(histories.Operation.name).toEqual('POW');    
    })
  })