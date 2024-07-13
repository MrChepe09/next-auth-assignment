import jwt from 'jsonwebtoken';
export const LoginUser = (email: string, password: string) => {
    const jwt_secret = process.env.JWT_SECRET || '';
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(email === 'admin@gmail.com' && password === 'password'){
            const jwtToken = jwt.sign({ email: email, type: 'admin' }, jwt_secret, { expiresIn: '20d' });
            resolve({ token: jwtToken, type: 'admin' });
            } else if(email === 'user@gmail.com' && password === 'password'){
                const jwtToken = jwt.sign({ email: email, type: 'user' }, jwt_secret, { expiresIn: '20d' });
                resolve({ token: jwtToken, type: 'user' });
            } else {
                reject('invalid username or password');
            }
        }, 2000);
    }
)}

export const LogoutUser = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('');
        }, 2000);
    });
}