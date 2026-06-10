const prisma = require("../database/prisma");


//cria os usuarios
async function CreateUser(req, res) {
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
//read todos os usuarios 
async function ReadallUser(req, res) {
  const allUsers = await prisma.user.findMany();

  res.json(allUsers);
}
//read por id
async function ReadUser(req, res) {
  const { id } = req.params;

  Where: ({
    id: parseInt(id),
  });
  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado." });
  }
  res.json(user);
}
//read por email
async function ReadEmailUser(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ msg: "Por favor, informe o email que deseja buscar." });
    }
    if (!email) {
      return res.status(404).json({ msg: "Usuário não encontrado." });
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
    res
      .status(500)
      .json({
        msg: "Erro no servidor ao buscar o email.",
        error: error.message,
      });
  }
}

//Update
async function update(res, req){
    const { id } = req.params;
    const { name, age, cpf, email, password } = req.bory;

    const updateUser = await prisma.user.update({
        where: { id: Number(id)},
        data:{name, age},
    });
    res.json({
        msg: "Usuário atualizado com sucesso!"        
        });
}


