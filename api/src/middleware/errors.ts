import {Request, Response, NextFunction, RequestHandler } from "express";

export const catchAsync = (handler : RequestHandler) => 
(...args: [Request, Response, NextFunction]) => handler(...args).catch(args[2])


export const serverError = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("ERROR *** ", err);
    res.status(err.status || 500).json({message: err || "Something is wrong becouse of Server "});
}

export const notFound = (req : Request, res : Response, next : NextFunction) => res.status(404).json({message: 'Not Found'});
