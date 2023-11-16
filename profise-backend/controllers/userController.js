const User = require("../models/User.js");
const Order = require("../models/Order.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password, remember } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Credenciais inválidas!" });
    }

    const passwordExists = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordExists) {
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }

    const token = jwt.sign(
      { id: user._id, accountType: user.accountType },
      process.env.JWT_SECRET,
      {
        expiresIn: remember ? "30 days" : "24h",
      },
    );

    return res.status(200).json(token);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Ocorreu um erro durante o login" });
  }
};

const requestOrder = async (req, res) => {
  try {
    const {
      category,
      categoryId,
      requestAnswers,
      requesterLocation,
      requesterName,
      requesterEmail,
      requesterContact,
    } = req.body;

    if (
      !category ||
      !categoryId ||
      !requestAnswers ||
      !requesterLocation ||
      !requesterName ||
      !requesterEmail ||
      !requesterContact
    ) {
      return res
        .status(405)
        .json({ message: "Ocorreu um erro durante a solicitação, tente novamente" });
    }

    await Order.create({
      category,
      categoryId,
      requestAnswers,
      requesterLocation,
      requesterName,
      requesterEmail,
      requesterContact,
    });

    return res.status(200).json({ message: "Solicitação criada com sucesso!" });
  } catch (error) {
    console.log("ERRO requestOrder", error);
    return res.status(400).json({ message: "Ocorreu um erro durante o cadastro do pedido", error });
  }
};

module.exports = { login, requestOrder };
