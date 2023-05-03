const jwt = require('jsonwebtoken');
const {prisma} = require('../prisma/prisma-client');

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await prisma.user.findUnique({ // Если пользователь наш то просто модифицируем реквест
            where: {
                id: decoded.id
            }
        });
        next();
    } catch (e) {
        res.status(401).json({message: 'Вы не авторизованы!'});
    }
};

module.exports = {
    auth
}