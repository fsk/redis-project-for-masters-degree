import { SessionOptions } from 'express-session';
import { IN_PROD } from './app';

const { env } = process;

const ONE_HOUR = 1000 * 60 * 60

const THIRTY_MINUTES = ONE_HOUR * 2;

const SIX_HOURS = ONE_HOUR * 6;

export const {

    SESSION_SECRET = `sicarim belana, secretini gizli tut lan`,
    SESSION_NAME = 'sid',
    SESSION_IDLE_TIMEOUT = THIRTY_MINUTES,

} = env

export const SESSION_ABSOLUTE_TIMEOUT = +(env.SIX_HOURS || SIX_HOURS)

export const SESSION_OPTIONS : SessionOptions = {

    secret: SESSION_SECRET,
    name: SESSION_NAME,
    cookie: {
        maxAge: +SESSION_IDLE_TIMEOUT,
        secure: IN_PROD,
        sameSite: true
    },
    rolling: true,
    resave: false,
    saveUninitialized: false

}