const bcrypt = require("bcrypt");
const prisma = require("../database/prisma");
const jwt = require("jsonwebtoken");

module.exports = class AuthController {
  
  static async register(req, res) {
    const { name, age, email, password, confirmpassword, cpf } = req.body;

    if (!name || !age || !email || !password || !confirmpassword || !cpf) {
      return res.status(422).json({ message: "Todos os campos são obrigatórios!" });
    }

    if (password !== confirmpassword) {
      return res.status(422).json({ message: "A senha e a confirmação precisam ser iguais!" });
    }

    try {
      const userExists = await prisma.user.findUnique({
        where: { email: email },
      });

      if (userExists) {
        return res.status(400).json({ message: "Por favor, utilize outro e-mail!" });
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = {
        name,
        age: Number(age), 
        email,
        password: passwordHash,
        cpf
      };

      const createdUser = await prisma.user.create({
        data: newUser,
      });

      return res.status(201).json({
        message: "Usuário registrado com sucesso!",
        user: {
          name: createdUser.name,
          email: createdUser.email,
          age: createdUser.age,
        },
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Ocorreu um erro no servidor, tente novamente mais tarde.",
      });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ msg: "Email e senha são obrigatórios!" });
    }

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      
      if (!user) {
        return res.status(400).json({ msg: "Email ou senha inválidos!" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (!passwordMatch) {
        return res.status(400).json({ msg: "Email ou senha inválidos!" });
      }

      const token = jwt.sign(
        { id: user.id, name: user.name, age: user.age, email: user.email },
        process.env.JWT_SECRET, 
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        msg: "Login realizado com sucesso!", 
        token: token,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Erro no servidor ao tentar fazer login." });
    }
  }

  static async profile(req, res) {
    try {
      const user = await prisma.user.findUnique({ 
        where: { id: req.userId },
        select: {
            id: true,
            name: true,
            email: true,
            age: true
        }
      });

      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }

      return res.status(200).json({
        msg: "Dados do Usuário",
        user
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Erro ao buscar perfil do usuário." });
    }
  }
};