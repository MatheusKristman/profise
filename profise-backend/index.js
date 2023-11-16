const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const professionalRoute = require("./routes/professional.js");
const userRoute = require("./routes/user.js");
const paymentRoute = require("./routes/payment.js");
const categoryRoute = require("./routes/category.js");
const orderRoute = require("./routes/order.js");
const { completeRegister, updateUser } = require("./controllers/professionalController.js");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_KEY;
const User = require("./models/User.js");

dotenv.config();

const app = express();

app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  let event;

  if (webhookSecret) {
    const sig = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (error) {
      console.log(`⚠️  Webhook signature verification failed.`, error.message);
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }
  }

  if (event.type === "checkout.session.completed") {
    const session = await stripe.checkout.sessions.retrieve(event.data.object.id);

    if (session.amount_total === 8000) {
      await User.findOneAndUpdate(
        { _id: session.metadata.user_id },
        {
          $inc: {
            coins: 300,
          },
        },
      );
    }

    if (session.amount_total === 12000) {
      await User.findOneAndUpdate(
        { _id: session.metadata.user_id },
        {
          $inc: {
            coins: 600,
          },
        },
      );
    }

    if (session.amount_total === 15000) {
      await User.findOneAndUpdate(
        { _id: session.metadata.user_id },
        {
          $inc: {
            coins: 1000,
          },
        },
      );
    }
  }

  res.json({ received: true });
});

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/profile-image", express.static(path.join(__dirname, "public/pro/profile-image")));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/pro/profile-image");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post("/professional/complete-register", upload.single("profileImage"), completeRegister);
app.post("/professional/profile-update", upload.single("profileImage"), updateUser);

app.use("/professional", multer().none(), professionalRoute);
app.use("/user", multer().none(), userRoute);
app.use("/payment", multer().none(), paymentRoute);
app.use("/category", multer().none(), categoryRoute);
app.use("/order", multer().none(), orderRoute);

const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.error(`ERROR ON LISTEN (${error}), CAN'T CONNECT`));
