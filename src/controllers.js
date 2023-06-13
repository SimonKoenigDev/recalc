import express from 'express';
import core from './core.js';

import { createHistoryEntry, obtenerHistorial, History, borrarHistorial, obtenerHistorialPorID } from './models.js'

const router = express.Router();

router.get("/sub/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json('Uno de los parámetros no es un número');
    } else {
        const result = core.sub(a, b);

        await createHistoryEntry({ firstArg: a, secondArg: b, result,secondArg: b,result, operationName: "SUB" })
        return res.send({ result });
    }
});

router.get("/add/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json('Uno de los parámetros no es un número');
    } else {
        const result = core.add(a, b);

        await createHistoryEntry({ firstArg: a, secondArg: b, result, operationName: "ADD" });
        return res.status(200).send({ result });

    }


});

router.get("/mul/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json('Uno de los parámetros no es un número');
    } else {
        const result = core.mul(a, b);

        await createHistoryEntry({ firstArg: a,secondArg: b,result, operationName: "MUL"})
        return res.status(200).send({ result });
    }
});

router.get("/div/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ message: 'Uno de los parámetros no es un número' });
    } else {
        if (b===0){
            return res.status(400).json({ message: 'El divisor no puede ser cero' });
        }
        const result = core.div(a, b);
        await createHistoryEntry({ firstArg: a, secondArg: b, result, operationName: "DIV" });
        return res.status(200).send({ result });
    }

});


router.get("/pow/:a", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);

    if (isNaN(a)) {
        return res.status(400).json({message: 'Uno de los parámetros no es un número'});
    } else {
        const result = core.pow(a);
        await createHistoryEntry({ firstArg: a, secondArg: null,  result, operationName: "POW" });
        return res.send({ result });
    }
});

router.get("/historial", async function (req, res) {
    const history = await obtenerHistorial();
    return res.send(history);
    
});

router.get("/Historial/borrar", async function (req, res) {
    await borrarHistorial();
    return res.send({ message: 'Historial borrado' });
});

router.get("/id/:id", async function (req, res) {
    const id = req.params.id;

    try {
        const result = await obtenerHistorialPorID(id);

        if (!result) {
            return res.status(404).send({ error: `El ID '${id}' no existe en el historial` });
        }

        return res.send({ result });
    } catch (error) {
        console.error('Error al obtener la entrada del historial:', error);
        return res.status(500).send({ error: 'Error al obtener la entrada del historial' });
    }
});

export default router;

