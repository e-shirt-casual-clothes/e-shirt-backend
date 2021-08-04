const express = require('express');
const bcryptjs = require('bcryptjs');
const { Users } = require('../../models');
const { Op } = require('sequelize');
const usersRouter = express.Router();

usersRouter.use(express.json());

usersRouter.get('/', async (request, response) => {
    try {
        const result = await User.findAll();
        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }

});

usersRouter.get('/search', async (request, response) => {
    const { text } = request.query;
    let results;
    try {
        if (text) {
            results = await User.findAll({
                where: { description: { [Op.substring]: text } }
            });
        } else {
            results = await User.findAll();
        }
        return response.status(200).json(results);
    } catch (error) {
        response.status(200).json({ error: error.message });
    }

});

usersRouter.post('/', async (request, response) => {
    const { name, street, district, city, state, phone, email, password } = request.body;
    try {
        const user = {
            name, street, district, city, state, phone, email, password: await bcryptjs.hash(password, 8),
        }
        const result = await Users.create(user);
        result.password = undefined;

        return response.status(201).json(result);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
    
});

usersRouter.put('/:id', async (request, response) => {
    const { id } = request.params;
    const nick = request.body;

    const affectedRows = await User.update(nick, {
        where: { id },
    });

    if (affectedRows < 1) {
        return response.status(404).json({ error: 'Usuario não encontrado!' })
    }
    return response.status(200).json({ success: 'Usuario alterado com sucesso!' })
});

usersRouter.delete('/:id', async (request, response) =>{
    const { id } = request.params;

    const affectedRows = await User.destroy({
        where: { id },
    });

    if (affectedRows < 1) {
        return response.status(404).jason({ error: 'Usuario não encontrado!'})
    }
    return response.status(200).json({ success: 'Usuario deletado com sucesso'})
});

module.exports = usersRouter;
