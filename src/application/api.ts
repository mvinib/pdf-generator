import { Router, Request, Response } from "express";
import { BaseAPI } from "../web/baseAPI";
import { htmlToPdfBuffer } from "../adapter/pdf";
import { ApplicationError } from "one_engine/dist/errors/applicationError";
import bodyParser from "body-parser";


class API implements BaseAPI {
    public get getRoutes(): [string, Router] {
        const routes = Router();

        routes.get('/',
            this.get
        )

        routes.post('/',
            this.post
        )

        return ['/', routes];
    }

    private async get(req: Request, res: Response) {
        return res.json("Working").status(200);
    }

    private async post(req: Request, res: Response) {
        if (!req.body.html) {
            throw new ApplicationError({
                message: "Envio o html a ser transformado em PDF",
                point: "Geração de PDF",
                status: 409
            })
        }
        const buffer = await htmlToPdfBuffer(req.body.html, req.body.options);

        return res.json({
            pdfBuffer: buffer
        }).status(200);
    }

}


export const api = new API();
