const { seed } = require('../src/seed.js')
const {
    createHistoryEntry,
    History,
    Operation
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
