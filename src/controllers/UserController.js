const prisma = require("../database/prisma");

// Create: cria os usuarios
async function CreateUser(req, res) {
  const { name, age, email } = req.body; 

  const newUser = await prisma.user.create({
    data: {
      name,
      age,
      email,
    },
  });
  
  res.json({
    msg: "Usuario Criado com sucesso",
    newUser,
  });
}

// Read: lê todos os usuarios 
async function ReadAllUser(req, res) {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
}

// Read: lê por id
async function ReadUser(req, res) {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    }
  });

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado." });
  }
  
  res.json(user);
}

// Read: lê por email
async function ReadEmailUser(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Por favor, informe o email que deseja buscar." });
    }
    
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
        msg: "Erro no servidor ao buscar o email.",
        error: error.message,
      });
  }
}

// Update: atualiza o usuário
async function UpdateUser(req, res) { 
    const { id } = req.params;
    const { name, age, cpf, email, password } = req.body; 

    const updateUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, age },
    });
    
    res.json({
        msg: "Usuário atualizado com sucesso!",
        updateUser // Retornando os dados atualizados para o cliente ver
    });
}

// Delete: deleta o usuário
async function DeleteUser(req, res) { 
  const { id } = req.params;

  await prisma.user.delete({
    where: { id: Number(id) }, 
  });

  res.json({
    msg: "Usuário deletado com sucesso!"
  });
}

module.exports = {
  CreateUser,
  ReadEmailUser,
  ReadUser,
  ReadAllUser,
  UpdateUser,
  DeleteUser
};