import { engine } from "../engine";
import type { Request, Response, NextFunction } from "express";


export const showRequestMiddleware = (req: Request, res: Response, next: NextFunction) => {
    engine.debug(JSON.stringify({
      body: req.body,
      method: req.method,
      path: req.path,
      headers: {
        host: req.headers['host'],
        'user-agent': req.headers['user-agent'],
        'authorization': req.headers['authorization'],
    },
      query: req.query,
    }, undefined, 4));

    return next();
  }