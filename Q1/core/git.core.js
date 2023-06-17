const axios = require("axios");

async function listRepos(inputString, category) {
  const Authorization = `Basic ${Buffer.from(`${process.env.GIT_USERNAME}:${process.env.GIT_PASSWORD}`).toString("base64")}`;
  const response = await axios.get("https://api.github.com/search/repositories", {
    params: {
      q: `${inputString} in:${category}`,
    },
    headers: {
      Authorization,
    },
  });

  return response.data;
}

module.exports = {
  listRepos,
};
