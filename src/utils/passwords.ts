import * as bcrypt from 'bcrypt'


export const generateHash = async (password: string) =>{
    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password,salt)
    
    return hash
}


export const validatePassword = async (plainPassword: string, hash: string): Promise<boolean> =>{
    const isValid = await bcrypt.compare(plainPassword, hash)

    return isValid
}