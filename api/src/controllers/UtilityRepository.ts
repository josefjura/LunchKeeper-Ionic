import { RequestHandler, NextFunction, Request, Response } from 'express'
import request from 'request'
import { handleCall } from './Common'
import { connect, connection } from 'mongoose'

export var pingDb: RequestHandler = (req, res, next) => {
    connection.db.admin().ping().then(
        (res2) => { res.status(200).send(res2) },
        (err) => { res.status(500).send(err); }
    );
}