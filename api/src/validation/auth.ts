import Joi from '@hapi/joi'
import { BCRYP_MAX_BYTES } from '../config'

const email = Joi.string().min(8).max(254).lowercase().trim().required()
const name = Joi.string().min(2).max(50).trim().required()
const surname = Joi.string().min(2).max(50).trim().required()
const username = Joi.string().min(1).max(10).trim().required()
const password = Joi.string().min(3).max(BCRYP_MAX_BYTES, 'utf8')
                .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
                .message('"{#label} must contain one uppercase, one lowecase, one special character and one number"')
                .required()
const passwordConfirmation = Joi.valid(Joi.ref('password')).required()

export const registerSchema = Joi.object({
    email,
    name,
    surname,
    username,
    password,
    passwordConfirmation

})


export const loginSchema = Joi.object({
    username,
    password
})