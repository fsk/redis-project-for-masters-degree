import Redis from 'ioredis';
import session from 'express-session';
import connecRedis from 'connect-redis';
import { REDIS_OPTIONS, APP_PORT, MONGO_URI } from './config/'; //MONGO_OPTIONS
import mongoose from 'mongoose';
import {createApp} from './app'
//import {  } from './config/session'


;(async () => {
    try {
        await mongoose.connect(MONGO_URI)
    }catch(err) {
        console.log("ERROR***", err);
        
    }
    
    const RedisStore = connecRedis(session);
    const client = new Redis(REDIS_OPTIONS);

    const store = new RedisStore({ client });

    const app = createApp(store)

    app.listen(APP_PORT, () => {
        console.log(`http://localhost:${APP_PORT}`);

    })
})()

