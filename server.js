const express = require('express');
const bodyParser = require('body-parser');
const qr = require('qr-image');
const fs = require('fs');

const app = express();

// Use the PORT environment variable if it's set, otherwise default to 3000
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/generate', (req, res) => {
    const url = req.body.url;
    const qr_svg = qr.image(url, { type: 'png' });
    const qrPath = 'public/qr_code.png';

    qr_svg.pipe(fs.createWriteStream(qrPath))
        .on('finish', () => {
            fs.writeFile('public/user_input.txt', url, (err) => {
                if (err) throw err;
                res.redirect('/');
            });
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

