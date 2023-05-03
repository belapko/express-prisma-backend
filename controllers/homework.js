const {prisma} = require('../prisma/prisma-client')
const {home} = require("nodemon/lib/utils");

// @route GET /api/homework/
// @desc get all homeworks of all users
// @access private
const all = async (req, res) => {
    try {
        const homeworks = await prisma.homework.findMany();
        res.status(200).json(homeworks);
    } catch (e) {
        res.status(500).json({message: 'Не удалось получить список домашних заданий'});
    }
};

// @route GET /api/homework/:id
// @desc get homework by id
// @access private
const homework = async (req, res) => {
    const {id} = req.params;
    try {
        const homework = await prisma.homework.findUnique({where: {id}});
        res.status(200).json(homework);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// @route POST /api/homework/add with body = {name: ..., content: ...}
// @desc create new homework
// @access private
const add = async (req, res) => {
    try {
        const data = req.body;
        if (!data.name || !data.content) {
            return res.status(400).json({message: 'Все поля являются обязательными!'});
        }

        const homework = await prisma.homework.create({
            data: {
                ...data,
                userId: req.user.id
            }
        });
        res.status(201).json(homework);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};


// @route DELETE /api/homework/remove with id in body
// @desc delete homework
// @access private
const remove = async (req, res) => {
    try {
        const {id} = req.body;
        await prisma.homework.delete({
            where: {
                id
            }
        });
        res.status(204).json('OK');
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// @route PUT /api/homework/edit with body = {fieldThatNeedToBeUpdated: ...}
// @desc update(edit) homework
// @access private
const edit = async (req, res) => {
    try {
        const data = req.body;
        const id = data.id;
        await prisma.homework.update({
            where: {
                id,
            },
            data
        });
        const updatedHomework = await prisma.homework.findUnique({where: {id}});
        res.status(201).json(updatedHomework);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

module.exports = {
    all,
    homework,
    add,
    remove,
    edit
};