import express from 'express';
import core from './core.js';

import { createHistoryEntry, obtenerHistorial, History } from './models.js'

const router = express.Router();

router.get("/sub/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json('Uno de los parámetros no es un número');
    } else {
        const result = core.sub(a, b);

        await createHistoryEntry({ firstArg: a,secondArg: b,result, operationName: "SUB" })
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
        return res.send({ result });
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
        return res.send({ result });
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
        return res.json({ result });
    }
});


router.get("/pow/:a", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);

    if (isNaN(a)) {
        return res.status(400).json('Uno de los parámetros no es un número');
    } else {
        const result = core.pow(a);
        return res.send({ result });
    }
});

router.get("/historial", async function (req, res) {
    const history = await obtenerHistorial();
    return res.send(history);
    
});

export default router;