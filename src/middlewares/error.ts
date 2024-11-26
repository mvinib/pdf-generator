import { engine } from "../engine";
import type { ErrorRequestHandler } from "express";
import { IntegrationError } from 'one_engine/dist/errors/IntegrationError';
import { ApplicationError } from 'one_engine/dist/errors/applicationError';


export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    engine.error(err);

    if (err instanceof ApplicationError) {
      return res.status(err.data.status).json(err.data);
    }


    if (err instanceof IntegrationError) {
      return res.status(err.data.status).json(err.data);
    }

    return res.status(500).json({
      error: 'Something broke!',
      ...(engine.env !== 'production' ? {
        title: err.name,
        stack: err.stack,
      } : {})
    });
  }