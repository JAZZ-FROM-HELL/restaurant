import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import {uuid} from "uuidv4";

@Injectable()
export class ContextMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        req.headers['requestId'] = req.headers['requestId'] ?? uuid();
        next();
    }
}
