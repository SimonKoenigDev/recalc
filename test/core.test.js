import { DEFAULT_EXTENSIONS } from '@babel/core';
import core from '../src/core.js'

describe('Subtract', () => {
    test('Deberia 2 - 2 = 0', () => {
        expect(core.sub(2, 2)).toBe(0); 
    })

    test('Deberia 6 - 4 = 2', () => {
        expect(core.sub(6, 4)).toBe(2); 
    })

    test('Debería devolver un número negativo cuando el segundo parámetro es mayor al primero.', () => {
        expect(core.sub(6, 7)).toBe(-1); 
    })

})


describe('Suma', () => {
    test('Deberia 10 + 12 = 22', () => {
        expect(core.add(10, 12)).toBe(22); 
    })

})

describe('Pow', () => {
    test('Deberia 4 ** 2 = 16', () => {
        expect(core.pow(4)).toBe(16); 
    })

    test('Da como resultado un número positivo cuando se le pasa como parámetro un número negativo.', () => {
        expect(core.pow(-4)).toBe(16); 
    })
    
})

describe('Divide', () => {
    test('Deberia 2 / 2 = 1', () => {
        expect(core.div(2, 2)).toBe(1); 
    })

    test('Debería comprobar el error al hacer la división por 0.', () => {
        expect(core.div(12, 0)).toBe("No se puede dividir por 0"); 
    })

})

describe('Multiply', () => {
    test('Deberia 2 * 2 = 4', () => {
        expect(core.mul(2, 2)).toBe(4); 
    })
    
    test('Debería devolver un número negativo cuando el primer parámetro es negativo.', () => {
        expect(core.mul(-6, 5)).toBe(-30); 
    })

    test('Debería devolver un número negativo cuando el segundo parámetro es negativo.', () => {
        expect(core.mul(6, -5)).toBe(-30); 
    })

})
