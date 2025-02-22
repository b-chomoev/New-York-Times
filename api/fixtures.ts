import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "crypto";

const run = async () => {
    await mongoose.connect(config.db);

    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
    } catch (error) {
        console.log(error);
    }

    await User.create({
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
    await db.close();
};

run().catch(console.error);
