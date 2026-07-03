const jwt = require('jsonwebtoken');

function AuthMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    // 1. Verifica se o header foi enviado
    if (!authHeader) {
        return res.status(401).json({ msg: "Token não fornecido!" });
    }

    // 2. Valida o formato do header (deve ser "Bearer <token>")
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ msg: "Formato de token inválido!" });
    }

    const token = parts[1];

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.userId = decoded.id;
        return next();
        
    } catch (erro) {
        
        return res.status(401).json({ msg: "Token inválido ou expirado!" });
    }
}

module.exports = { AuthMiddleware };