import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    email: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const News = mongoose.model('News', NewsSchema);

export default News;