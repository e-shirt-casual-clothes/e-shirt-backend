const express = require ('express');
const jwt = require ('jsonwebtoken');
const cors = require ('cors');
const userRouter = require ('./users.routers');
const sessionsRouter = require ('./sessions.routes');

const routes = express.Router();

function ensureAutenticated(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(403).json({ message:"[CONTÉUDO EDUCACIONAL] PROJETO FINAL DO CURSO DE DESENVOLVIMENTO DE SISTEMAS DO SENAC SÃO CARLOS
                                          
_____ __  __________ ______   ____________ _____ __  _____    __       ________   ____ ______  __ __  ___________
  ___     / ___// / / /  _/ __ \_  __/  / ____/ ____ \ ___// / / /   |  / /      / ____/ /  / __ \_  __/_/ // /_/ ____/ ___/
 / _ \    \__ \/ /_/ // // /_/ // /    / /   / / __ `\__ \/ / / / /| | / /      / /   / /  / / / // / /_  _  __/ __/  \__ \ 
/  __/   ___/ / __  // // _, _// /    / /___/ / /_/ /__/ / /_/ / ___ |/ /___   / /___/ /___ /_/ // / /_  _  __/ /___ ___/ / 
\___/   /____/_/ /_/___/_/ |_|/_/     \____/\ \__,_/____/\____/_/  |_/_____/   \____/_____\____//_/   /_//_/ /_____//____/ "                                          

            
            
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
