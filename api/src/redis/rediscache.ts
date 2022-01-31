import { createClient } from 'redis';
//import { User } from '../models';
//import { userSchema } from '../models/User';


export const rediscache = async (user: any) => {


    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    try {
        console.log("USER", user);
        
        await client.hSet(user._id, "username", user.username);
        await client.hSet(user._id, "email", user.email);

    } catch (error) {
        console.log("Redis Save Error: ", error);

    }
}



