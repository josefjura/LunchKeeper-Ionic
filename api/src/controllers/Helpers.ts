import { Response } from 'express'

export async function handleRequest<T>(res: Response, functionCall: () => Promise<T>) {
    try {
        let result = await functionCall();

        if (result) {
            res.status(200).send(result);
        }
        else {
            res.status(404).send();
        }
    } catch (err) {
        res.status(500).send(err);
    }
}