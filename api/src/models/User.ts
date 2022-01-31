import { options } from '@hapi/joi'
import { compare, hash } from 'bcryptjs'
import{ Schema, model, Document } from 'mongoose'
import { BCRYP_WORK_FACTOR } from '../config'

interface UserDocument extends Document {
    email: string,
    name: string,
    surname: string,
    username: string,
    password: string
    matchPassword : (password : any) => Promise<boolean> 
}

const userSchema = new Schema({
    email: String,
    name: String,
    surname: String,
    username: String,
    password: String
}, {
    timestamps: true
})

userSchema.pre('save', async function() {
    if(this.isModified('password')) {
        this.password = await hash(this.password, BCRYP_WORK_FACTOR);
    }
})

userSchema.methods.matchPassword = function(password : any) {
    return compare(password, this.password);
}

userSchema.set('toJSON', {
    transform: (doc, {__v, password, ...rest}, options) => rest
})

export const User = model<UserDocument>('User', userSchema)