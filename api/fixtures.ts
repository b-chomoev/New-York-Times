import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "crypto";
import News from "./models/News";

const run = async () => {
    await mongoose.connect(config.db);

    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('news');
    } catch (error) {
        console.log(error);
    }

    const [jane, john] = await User.create({
            email: "jane@gmail.com",
            username: "Jane",
            password: "123",
            confirmPassword: "123",
            token: randomUUID(),
            role: 'admin'
        },
        {
            email: "john@gmail.com",
            username: "John",
            password: "123",
            confirmPassword: "123",
            token: randomUUID(),
            role: 'user',
        }
    );

    await News.create([
        {
            title: 'Trump vs Putin',
            description: 'First news description',
            image: 'fixtures/trump.jpg',
            user: jane._id,
        },
        {
            title: 'Zelenskiy Ukraine',
            description: 'Second news description',
            image: 'fixtures/ukraine.jpg',
            user: jane._id,
        },
        {
            title: 'Elon Musk Grok AI',
            description: 'Third news description',
            image: 'fixtures/elon.jpg',
            user: john._id,
        },
        {
            title: 'DeepSeek AI',
            description: 'Fourth news description',
            image: 'fixtures/deepseek.jpg',
            user: john._id,
        }
    ]);

    await db.close();
};

run().catch(console.error);
