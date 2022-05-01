const express = require('express');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');
const app = express();
const sgMail = require('@sendgrid/mail');
const cors = require('cors');

app.use(cors());
app.use(compression());
app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));


app.post('/api/sendMessage', function (req, res) {
  const emailMessage = {
    to: contactRecipient,
    from: contactRecipient,
    subject: `Message from ${req.body.name} via Portfolio Contact Form`,
    text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`
  };

  sgMail.setApiKey(apiKey);
  sgMail.send(emailMessage).then(() => {
    console.log(`Email sent via contact form from: ${req.body.name} / ${req.body.email}`);
    res.status(200).send('Email Sent');
  }).catch((error) => {
    console.error(error);
    res.status(error.code).send('Failed to send email.');
  });
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 8080;
const apiKey = process.env.SENDGRID_API_KEY || '';
const contactRecipient = process.env.CONTACT_RECIPIENT || '';



app.listen(port, () => console.log(`Server listening on port ${port}...`));