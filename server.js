const express = require('express');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');
const app = express();

app.use(compression());
app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server listening on port ${port}...`));