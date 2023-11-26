const axios = require('axios');

async function gpt(query, nama) {
  const url = `https://chatgpt4.my.id/api/processdata?question=${encodeURIComponent(`hallosaya AI yang bernama ${nama} Ada yang bisa saya bantu?\n\n question: ${query}`)}`
  const hasil = await axios.get(url);
  return hasil.data.response;
}
module.exports = gpt;
