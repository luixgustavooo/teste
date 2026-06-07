const prisma = require('../database/prisma');

async function CreateUser(req, res) {

    const newUser = await prisma.user.create({
        data: {
            name,
            age,
            email,
        }
    });
    res.json({
        msg: "Usuario Criado com sucesso",
        newUser
    });
}

async function ReadallUser(req, res) {
    const allUsers = await prisma.user.findMany();

    res.json(allUsers)
    
}

async function ReadUser(req, res) {
    
    
}