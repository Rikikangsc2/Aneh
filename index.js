const express = require('express');
const axios = require('axios');
const path = require('path');
const gpt = require("./func/gpt.js");
const acak = require("./func/randomApi.js");
const fakeUa = require('fake-useragent');


const app = express();
const port = process.env.PORT || 3000;

const tidyJSONResponse = (req, res, next) => {
  res.rikiJSON = (data, status = 200, author = "Anonymous") => {
    const jsonResponse = {
      status: status,
      author: author,
      data: data
    };
      res.setHeader('Content-Type', 'application/json');
      res.status(status).send(JSON.stringify(jsonResponse,null,2));
  };
  next();
};

app.use("/json",tidyJSONResponse);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//home.ejs
app.get("/", async (req, res) => {
    res.render("home")
});

//azzpt
app.get("/json/azzgpt", async (req, res) => {
    if (!req.query.q && !req.query.nama) {
        res.send("harap isi semua params")
    } else {
        const riki = await gpt(req.query.q,req.query.nama)
    const data = {respon : riki}
    res.rikiJSON(data,200,`api-riki.vercel.app`)
    }
})

//tts
app.get('/tts', async (req, res) => {
    try {
        const text = req.query.q;

        const response = await axios.post('https://api.elevenlabs.io/v1/text-to-speech/zrHiDhphv9ZnVXBqCLjz', {
            model_id: "eleven_multilingual_v2",
            text: text
        }, {
            headers: {
                'Accept': 'audio/mpeg',
                'User-Agent': fakeUa(), // User agent acak
                'X-Forwarded-For': req.ip, // IP pengguna
                'xi-api-key': await acak(),
                'Content-Type': 'application/json',
                'responseType': 'arraybuffer'
            },
            responseType: 'arraybuffer'
        });

        res.setHeader('Content-Type', 'audio/mpeg');
        res.status(200).send(Buffer.from(response.data, 'binary'));
    } catch (err) {
        console.error(err);
        if (err.response) {
            res.status(err.response.status).send(err.response.data);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});



app.listen(port, () => {
 console.log(`Example app listening at http://localhost:${port}`);
});