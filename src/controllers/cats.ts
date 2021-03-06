import { Response, Request} from 'express';
import User from '../models/User';
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

    let cats = await Cat.find({ category_id: category_id }).skip(from).limit(limit).catch((err) => {
        return res.status(500).json({
            ok: false,
            err
        });
    });

    if (!cats) {
        return res.status(404).json({
            ok: false,
            cats: 'There are no cats in DB'
        });
    };

    return res.status(201).json({
        ok: true,
        cats
    });
};

const AddFavoriteElement = async (req: Request, res: Response) => {
    const cat: any = await Cat.findOne({ img_url: String(req.query.img_url) }).catch((err) => {
        return res.status(500).json({
            ok: false,
            err
        });
    });

    if (!cat) return res.json({ok: false, msg: 'Cat image not found in DB'});

    const user: any = await User.findOne({token: String(req.query.token)}).catch((err) => {
        return res.status(500).json({
            ok: false,
            err
        });
    });

    if (!user) return res.json({ ok: false, err: 'User not find in DB' });

    if (!user.fav_img) {
        user.fav_img = [req.query.img_url];
    } else {
        if (user.fav_img.length >= 10) {
            res.status(401).json({
                ok: false,
                msg: 'Favorite image storage full. Delete some image to insert another.'
            });
        };
        user.fav_img = [...user.fav_img, req.query.img_url];
    };

    user.save((err: object, updatedUser: object) => {
        if (err) res.status(500).json({ok: false, err});
        else {
            res.status(200).json({
                ok: true,
                user: updatedUser
            });
        };
    });
};

export {getAllCats, filterCats, AddFavoriteElement};