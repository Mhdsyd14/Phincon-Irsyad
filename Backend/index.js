const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

app.get("/pokemon", async (req, res) => {
  const limit = req.query.limit || 6;
  const offset = req.query.offset || 0;

  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon", {
      params: {
        limit: limit,
        offset: offset,
      },
    });

    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
