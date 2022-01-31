import express from 'express';
import session, { Store } from 'express-session';
import { SESSION_OPTIONS } from './config';
import { serverError, notFound, active, catchAsync } from './middleware';
import { home, login, register } from './routes'

const app = express();

export const createApp = (store: Store) => {

    app.use(express.json())

    app.use(
        session({ 
            ...SESSION_OPTIONS, 
            store 
        })
    )
    
    
    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Welcome To Authentication and Redis TypeScript APP' });
    })


    app.use(catchAsync(active))

    app.use(home)

    app.use(login)


    app.use(register);

    app.use(notFound)

    app.use(serverError)



    return app;
}

