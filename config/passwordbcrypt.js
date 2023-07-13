import bcrypt from 'bcrypt';

export const PasswordGenrate = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    return hashedpassword;
}