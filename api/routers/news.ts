import express from "express";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import News from "../models/News";

const newsRouter = express.Router();

newsRouter.get("/", async (req, res, next) => {
    try {
        const news = await News.find();

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

newsRouter.post("/", imagesUpload.single('image'), auth, async (req, res) => {
    try {
        const expressReq = req as RequestWithUser;
        const user = expressReq.user;

        if (!user) {
            res.status(401).send({error: 'User not found!'});
            return;
        }

        const newNews = {
            image: req.file ? 'images' + req.file.filename : null,
            title: req.body.title,
            email: user._id,
        }

        const news = new News(newNews);
        await news.save();

        res.send(news);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "Something went wrong"});
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
