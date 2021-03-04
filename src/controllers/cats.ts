import { Response, Request} from 'express';
import Cat from '../models/Cat';

const getAllCats = async (req: Request, res: Response): Promise<any> => {

    const from: number = Number(req.query.from) || 0;
    const limit: number = Number(req.query.limit) || 10;

    let cats = await Cat.find({}).skip(from).limit(limit).catch((err) => {
        return res.status(500).json({
            ok: false,
            err
        });
    });

    if (!cats) {
        return res.status(400).json({
            ok: false,
            cats: 'There are no cats in DB'
        });
    };

    return res.status(201).json({
    ok: true,
    cats
    });
};

const filterCats = async (req: Request, res: Response): Promise<any> => {
    const from: number = Number(req.query.from) || 0;
    const limit: number = Number(req.query.limit) || 10;
    const category_id: number = Number(req.query.category_id);

    let cats = await Cat.find({category_id: category_id}).skip(from).limit(limit).catch((err) => {
        return res.status(500).json({
            ok: false,
            err
        });
    });

    if (!cats) {
        return res.status(400).json({
            ok: false,
            cats: 'There are no cats in DB'
        });
    };

    return res.status(201).json({
        ok: true,
        cats
    });
}

export {getAllCats, filterCats};