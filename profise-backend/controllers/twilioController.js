const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

dotenv.config();

const client = require("twilio")(process.env.TWILIO_ACCOUNT_ID, process.env.TWILIO_AUTH_TOKEN, {
  lazyLoading: true,
});

const sendOTP = async (req, res, next) => {
  const { phoneNumber } = req.body;

  try {
    const otpResponse = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({
        to: `+55${phoneNumber}`,
        channel: "sms",
      });

    res.status(200).json({ send: true, sms: otpResponse });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Ocorreu um erro ao enviar o código SMS", send: false });
  }
};

const verifyOTP = async (req, res, next) => {
  const { phoneNumber, otp } = req.body;

  try {
    const verifiedResponse = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `+55${phoneNumber}`,
        code: otp,
      });

    if (verifiedResponse.status === "pending" || !verifiedResponse.valid) {
      return res.status(405).json({ message: "Código inválido!" });
    }

    next();
  } catch (error) {
    console.log("Error on Verify OTP", error);
    res.status(400).json({ message: "Ocorreu um erro ao enviar o código SMS", send: false });
  }
}

const verifyRegisterOTP = async (req, res, next) => {
  const { phoneNumber, cel, name, email, otp } = req.body;

  try {
    const verifiedResponse = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `+55${phoneNumber}`,
        code: otp,
      });

    if (verifiedResponse.status === "pending" || !verifiedResponse.valid) {
      return res.status(405).json({ message: "Código inválido!", confirmed: false });
    }

    if ((!name && name?.split(" ").length < 2) || !cel || !email) {
      return res.status(400).json({ message: "ERRO: Dados não enviados!", confirmed: false });
    }

    const userAlreadyCreated = await User.find({ email });

    if (userAlreadyCreated.length > 0) {
      return res.status(200).json({ confirmed: true });
    }

    let firstName = name.split(" ").shift();
    let lastName = name.split(" ").slice(1);

    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

    for (let i = 0; i < lastName.length; i++) {
      lastName[i] = lastName[i].charAt(0).toUpperCase() + lastName[i].slice(1);
    }

    lastName = lastName.join(" ");

    const createdPro = await User.create({
      name: firstName,
      lastName: lastName,
      cel,
      email,
      accountType: "professional",
      status: "pre-active",
    });

    res.status(200).json({ confirmed: true, id: createdPro._id });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Erro ao confirmar código de verificação!",
      confirmed: false,
    });
  }
};

module.exports = { sendOTP, verifyRegisterOTP, verifyOTP };
