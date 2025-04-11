const axios = require("axios");

module.exports = async (req, res) => {
  const IPAPI_TOKEN = process.env.IPAPI_TOKEN;
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

  try {
    const response = await axios.get(`http://api.ipapi.com/api/${ip}?access_key=${IPAPI_TOKEN}`);
    const { latitude, longitude } = response.data;
    res.status(200).json({ latitude, longitude });
  } catch (error) {
    console.error("Erro ao consultar IPAPI:", error);
    res.status(500).json({ error: "Falha ao obter localização via IP" });
  }
};
