import { Router } from 'express';
import { logIn, logOut } from '../auth';
import { Unauthorized } from '../errors';
import { auth, catchAsync, guest } from '../middleware';
import { User } from '../models';
import { validate, loginSchema } from '../validation';

const router = Router();

router.post('/login', guest, catchAsync(async (req, res) => {
    await validate(loginSchema, req.body)

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if(!user || !( await user.matchPassword(password))) {

        throw new Unauthorized('Incorrect email or password')

    }

    logIn(req, user.id)

    res.status(300).json({message: 'LOGIN'})
}))


router.post('/logout', auth, catchAsync (async (req, res) => {
    //res.json( { message: 'Logout'} )
    await logOut(req, res)

    res.status(204).json({message: 'LOGOUT'})
}))



export default router;