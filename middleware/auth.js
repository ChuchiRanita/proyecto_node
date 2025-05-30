const jwt = require('jsonwebtoken');
const SECRET = 'secreto_seguro';

module.exports = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(403).json({ message: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // contiene id, user_name y role
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
