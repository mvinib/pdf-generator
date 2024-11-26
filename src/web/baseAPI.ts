import { Router } from "express";

export abstract class BaseAPI {
    abstract get getRoutes(): [ string, Router ];
}