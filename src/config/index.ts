import * as dotenv from 'dotenv'

dotenv.config()

export const secret= process.env.JWT_SECRET 
export const jwtLife= process.env.JWT_LIFE 
export const username = process.env.USERNAME
export const password = process.env.PASSWORD