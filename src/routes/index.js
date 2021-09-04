const express = require ('express');
const jwt = require ('jsonwebtoken');
const cors = require ('cors');
const userRouter = require ('./users.routers');
const sessionsRouter = require ('./sessions.routes');

const routes = express.Router();

function ensureAutenticated(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(403).json({
            
            
    message:"             _____ __  __________ ______   ____________ _____ __  _____    __       ________   ____ ______  __ __  ___________ ",
	message:"    ___     / ___// / / /  _/ __ \_  __/  / ____/ ____ \ ___// / / /   |  / /      / ____/ /  / __ \_  __/_/ // /_/ ____/ ___/    ",
	message:"   / _ \    \__ \/ /_/ // // /_/ // /    / /   / / __ `\__ \/ / / / /| | / /      / /   / /  / / / // / /_  _  __/ __/  \__ \    ",
	message:"   /  __/   ___/ / __  // // _, _// /    / /___/ / /_/ /__/ / /_/ / ___ |/ /___   / /___/ /___ /_/ // / /_  _  __/ /___ ___/ /    " ,
	message:"   \___/   /____/_/ /_/___/_/ |_|/_/     \____/\ \__,_/____/\____/_/  |_/_____/   \____/_____\____//_/   /_//_/ /_____//____/     ",
	message:"                                                                                                                               ",
	                                                                                                          
	message:           "[CONTÉUDO EDUCACIONAL] PROJETO FINAL DO CURSO DE DESENVOLVIMENTO DE SISTEMAS DO SENAC SÃO CARLOS",
	                                                                                                          
	message:                                       "SEJA DIFERENTE, SEJA VOCÊ MESMO!",
	            
	message:            "Autores:",
	

	message:                    "João Carlos Chavatte – joao.cchavatte@senacsp.edu.br",
	

	message:                    "Michael Dantas Siqueira dos Santos – michael.dssantos1@senacsp.edu.br",
	

	message:                    "Robinson Queiroz Machado – robinson.qmachado@senacsp.edu.br",
	            
	            
	            
	message:    "Repositório no Github: https://github.com/e-shirt-casual-clothes/",
	

	message:    "Interface gráfica do utilizador (GUI - Graphical User Interface): https://loja.e-shirt-casual-clothes.store/",
	        
	message:    "Projeto: https://e-shirt-casual-clothes.store/",
	        
	        
	message:                                                                 "Dúvidas, críticas ou sugestões: contato@e-shirt-casual-clothes.store",


       
        
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
