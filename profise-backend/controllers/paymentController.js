const stripe = require("stripe")(process.env.STRIPE_KEY);

async function calculateOrderAmount(coinQuant) {
  if (coinQuant === 300) {
    const product300 = await stripe.products.create({
      name: "Pacote de 300 moedas",
    });

    const price300 = await stripe.prices.create({
      product: product300.id,
      unit_amount: 8000,
      currency: "brl",
    });

    return price300.id;
  }

  if (coinQuant === 600) {
    const product600 = await stripe.products.create({
      name: "Pacote de 600 moedas",
    });

    const price600 = await stripe.prices.create({
      product: product600.id,
      unit_amount: 12000,
      currency: "brl",
    });

    return price600.id;
  }

  if (coinQuant === 1000) {
    const product1000 = await stripe.products.create({
      name: "Pacote de 1000 moedas",
    });

    const price1000 = await stripe.prices.create({
      product: product1000.id,
      unit_amount: 15000,
      currency: "brl",
    });

    return price1000.id;
  }

  return null;
}

async function createCheckoutSession(req, res) {
  const {
    coinQuant,
    actualEnv,
    name,
    lastName,
    company,
    cep,
    tel,
    city,
    state,
    address,
    addressNumber,
    email,
    id,
    paymentMethod,
  } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      line_items: [
        {
          price: await calculateOrderAmount(coinQuant),
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_method_types: [paymentMethod],
      metadata: {
        user_id: id,
        company,
        cep,
        city,
        state,
        address: address + ", " + addressNumber,
        email,
        name: name + " " + lastName,
        phone: tel,
      },
      success_url: `${
        actualEnv === "development" ? process.env.DOMAIN_DEV : process.env.DOMAIN
      }/pagamento-confirmado?session_id={CHECKOUT_SESSION_ID}&coin_quant=${coinQuant}&price=${
        coinQuant === 300 ? 80 : coinQuant === 600 ? 120 : 150
      }`,
      cancel_url: `${
        actualEnv === "development" ? process.env.DOMAIN_DEV : process.env.DOMAIN
      }/painel-de-controle/compra-de-moedas`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Ocorreu um erro", error });
  }
}

async function getStripeSession(req, res) {
  const { sessionId } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return res.status(200).json({ email: session.customer_details?.email });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Ocorreu um erro", error });
  }
}

async function stripeConfig(req, res) {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
}

module.exports = { createCheckoutSession, stripeConfig, getStripeSession };
