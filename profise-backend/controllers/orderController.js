const Order = require("../models/Order.js");
const User = require("../models/User.js");

const getOrders = async (req, res) => {
  // pegar serviços baseado na latitude e longitude tanto do serviço quanto do profissional

  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;

    lat1 = lat1 * (Math.PI / 180);
    lon1 = lon1 * (Math.PI / 180);
    lat2 = lat2 * (Math.PI / 180);
    lon2 = lon2 * (Math.PI / 180);

    const distanceLat = lat2 - lat1;
    const distanceLon = lon2 - lon1;

    const a =
      Math.sin(distanceLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(distanceLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  }

  try {
    const { distance, lat, long, categoryId } = req.body;

    const orders = await Order.find().sort("-createdAt");

    if (!orders) {
      return res.status(404).json({ message: "Nenhum serviço foi encontrado" });
    }

    const orderFiltered = orders.filter((order) => {
      const distanceFilter = haversine(
        lat,
        long,
        order.requesterLocation.lat,
        order.requesterLocation.long,
      );

      return distanceFilter <= distance && order.categoryId.equals(categoryId);
    });

    return res.status(200).json(orderFiltered);
  } catch (error) {
    console.log("Error on GetOrders: ", error);
    return res
      .status(400)
      .json({ message: "Ocorreu um erro durante a requisição dos serviços disponíveis", error });
  }
};

const getSelectedOrder = async (req, res) => {
  try {
    const { id } = req.body;

    const orderSelected = await Order.findById(id);

    if (!orderSelected) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }

    return res.status(200).json(orderSelected);
  } catch (error) {
    console.log("Error on getSelectedOrder", error);
    return res
      .status(400)
      .json({ message: "Ocorreu um erro durante a requisição do serviço selecionado", error });
  }
};

module.exports = { getOrders, getSelectedOrder };
