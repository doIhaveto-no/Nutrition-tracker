import { type Request, type Response } from "express";

function validateId(req: Request, res: Response): number {
    let id: number;
    try {
        id = parseInt(req.params.id as string);
        if (id < 1) throw Error();
        return id;
    } catch {
        res.status(400);
        res.json({ error: "Id must be an integer greater than zero" });
        return -1;
    }
}

function validateLimit(req: Request, res: Response): number {
    let limit: number;
    try {
        limit = parseInt((req.query.limit || "20").toString());
        if (limit < 1) throw Error();
        return limit;
    } catch { 
        res.status(400);
        res.json({ error: "Parameter limit must be an integer greater than zero" });
        return -1;
    }
}

function validatePage(req: Request, res: Response): number {
    let page: number;
    try {
        page = parseInt((req.query.page || "1").toString());
        if (page < 1) throw Error();
        return page;
    } catch {
        res.status(400);
        res.json({ "error": "Parameter page must be an integer greater than zero" });
        return -1;
    }
}

function validateSort(req: Request, res: Response, allowType: boolean): string {
    const sort = (req.query.sort || "id") as string;
    if (sort in ['id', 'name_sr', 'name_en', 'kcal', 'protein', 'carbohydrates', 'fats'] || (allowType && sort == 'type'))
        return sort;
    else
        return '';
}

function validateOrder(req: Request, res: Response) {
    const ord = (res.query.sort || "asc") as string;
    if (ord == 'asc' || ord == 'desc')
        return ord;
    else
        return '';
}

export { validateId, validateLimit, validatePage, validateSort, validateOrder };