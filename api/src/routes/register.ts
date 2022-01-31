import { Router } from 'express'
import { validate, registerSchema } from '../validation'
import { User } from '../models'
import { logIn } from '../auth';
import { guest, catchAsync } from '../middleware'; //catchAsync

const router = Router();


router.post('/register', guest, catchAsync(async (req, res) => {

    console.log("Register Endpoint Req Body", req.body)

    try {
        await registerSchema.validateAsync(req.body, { abortEarly: false })    
    } catch (error) {
        res.json(error);
    }


    await validate(registerSchema, req.body);

    const { email, name, surname, username, password } = req.body;

    const foundEmail = await User.exists({ email });
    const foundUsername = await User.exists({ username })

    if (foundEmail || foundUsername) {
        return res.status(405).json({ message: "Username or Email already taken" });
    }

    const user = await User.create({
        email,
        name,
        surname,
        username,
        password
    })

    logIn(req, user.id)



    return res.status(201).json({
        message: "User Created"
    })

    //rediscache(user);
    

}))


export default router;