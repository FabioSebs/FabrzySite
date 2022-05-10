import bcrypt from 'bcryptjs';

export const hashPWD = (password) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

export const comparePWD = (password, hash) => {
    const check = bcrypt.compareSync(password, hash)
    return check
} 