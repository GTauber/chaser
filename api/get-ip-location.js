const axios = require("axios");

module.exports = async (req, res) => {
  const IPAPI_TOKEN = process.env.IPAPI_TOKEN;
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

  try {
    const url = `https://api.ipapi.com/api/${ip}?access_key=${IPAPI_TOKEN}`;
    const response = await axios.get(url);
    const { latitude, longitude } = response.data;

    if (latitude && longitude) {
      res.status(200).json({ latitude, longitude });
    } else {
      res.status(500).json({ error: "Localização não encontrada na resposta da API." });
    }
  } catch (error) {
    console.error("Erro ao consultar ipapi:", error);
    res.status(500).json({ error: "Erro ao buscar localização por IP." });
  }
};
