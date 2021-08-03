const express = require ('express');
const jwt = require ('jsonwebtoken');
const cors = require ('cors');
const userRouter = require ('./user.routes');
const sessionsRouter = require ('./sessions.routes');

const routes = express.Router();

function ensureAutenticated(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(403).json({
            message: 'Token inexistente'
        });
    }

    const [, token] = authHeader.split(' ');
    try {
        jwt.verify(token, 'secret_key');
        return next();
    } catch (error) {
        return response.status(403).json({
            message: 'Token inválido'
        });
    }
}

routes.use(cors());
routes.use('/sessions', sessionsRouter);
routes.use(ensureAutenticated);
routes.use('/users', userRouter);

module.exports = routes;