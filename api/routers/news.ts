import express from "express";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import News from "../models/News";

const newsRouter = express.Router();

newsRouter.get("/", async (req, res, next) => {
    try {
        const news = await News.find().populate('user', 'username -_id');
        res.send(news);
    }
    catch (error) {
        next(error);
    }
});

newsRouter.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const news = await News.findById(id);

        if (!news) {
            res.status(404).send({error: 'News not found!'});
            return;
        }

        res.send(news);
    } catch (error) {
        next(error);
    }
});

newsRouter.get('/user/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const userNews = await News.find({user: id}).populate('user', 'username -_id');

        if (!userNews) {
            res.status(404).send({error: 'News not found!'});
            return;
        }

        res.send(userNews);
    } catch (error) {
        next(error);
    }
});

newsRouter.post("/", imagesUpload.single('image'), auth, async (req, res, next) => {
    const reqWithUser = req as RequestWithUser;

    try {
        const newNews = {
            image: req.file ? 'images' + req.file.filename : null,
            title: req.body.title,
            description: req.body.description,
            user: reqWithUser.user._id,
        }

        const news = new News(newNews);
        await news.save();

        res.send(news);
    } catch (error) {
        next(error);
    }
});


newsRouter.delete("/:id", auth, permit('admin'), async (req, res, next) => {
    try {
        const {id} = req.params;

        const news = await News.findByIdAndDelete(id);

        if (!news) {
            res.status(404).send({message: "News are not found"});
            return;
        }

        res.send({message: "News deleted successfully"});
    } catch (error) {
        next(error);
    }
});

export default newsRouter;
