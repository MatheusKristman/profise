const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token.includes("Bearer")) {
    return res.status(401).json({ message: "Acesso negado no token!" });
  }

  try {
    const userVerified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

    if (!userVerified) {
      return res.status(401).json({ message: "Acesso negado na verificação" });
    }

    req.user = userVerified.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Acesso negado!" });
  }
};

module.exports = { auth };
