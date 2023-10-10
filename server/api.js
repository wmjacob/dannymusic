const express = require('express');
const moment = require('moment-timezone');
const router = express.Router();
const mailJet = require ('node-mailjet');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const DOWNLOAD_PASSWORD_SECRET = 'album-access-password';
const DOWNLOAD_LINK_SECRET = 'album-access-link';
const BIO_LINK_SECRET = 'bio-access-link';
const CONTACT_EMAIL_SECRET = 'contact-email-secret';
const MAIL_JET_SECRET = 'mail-jet-secret';
const MAIL_JET_TEMPLATE_SECRET = 'mail-jet-template-secret';
const getSecretValue = async (secret, decode=false) => {
  if (process.env.NODE_ENV !== 'development') {
    const client = new SecretManagerServiceClient();
    const name = `projects/dannymusic/secrets/${secret}/versions/latest`;
    const [version] = await client.accessSecretVersion({ name });
    if (!version.payload || !version.payload.data || !version.payload.data.toString) {
      res.status(500).json({ error: 'Internal Error' });
      return;
    }
    if (decode) {
      return JSON.parse(Buffer.from(version.payload.data.toString(), 'base64'));
    }
    return version.payload.data.toString();
  }
  const secretValue = process.env[`SECRET_${secret.toUpperCase().replaceAll('-', '_')}`];
  if (decode) {
    return JSON.parse(Buffer.from(secretValue, 'base64'));
  }
  return secretValue;
}

router.post('/download-link', async function(req, res) {
    const postData = req.body;
    const password = postData.password;
    const passwordReal = await getSecretValue(DOWNLOAD_PASSWORD_SECRET);
    if (password && password === passwordReal) {
      const downloadLink = await getSecretValue(DOWNLOAD_LINK_SECRET);
      res.status(200).json({
        link: downloadLink,
      });
    } else {
    res.status(200).json({
        link: '',
      });
    }
});

router.post('/bio-link', async function(_req, res) {
  const bioSecret = await getSecretValue(BIO_LINK_SECRET);
  res.status(200).json({
    link: bioSecret,
  });
});

router.get('/status', function (_req, res) {
  res.status(200).json({ status: 'ok' });
});

router.post('/contact-email', async function(req, res) {
  const contactEmail =  await getSecretValue(CONTACT_EMAIL_SECRET);
  const mjCreds =  await getSecretValue(MAIL_JET_SECRET, true);
  const mjTemplate =  await getSecretValue(MAIL_JET_TEMPLATE_SECRET);
  const mailJetClient = mailJet.apiConnect(mjCreds.publicKey, mjCreds.privateKey);
  const currentDateTime = moment().tz('America/New_York');
  const formattedDate = currentDateTime.format('MMMM Do, YYYY [at] h:mm A');
  const data = req.body;
  const subject = data.subject;
  const postBody = {
    Messages:[{
      From: {
        Email: contactEmail,
        Name: '2Forks Contact Us',
      },
      To: [{
        Email: contactEmail,
        Name: '2Forks Contact Us',
      }],
      TemplateID: parseInt(mjTemplate, 10),
      TemplateLanguage: true,
      Subject: subject,
      Variables: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        date: formattedDate,
        message: data.message,
      },
      CustomID: 'contactUsFormSubmission',
    }],
  };
  let success = false;
  try {
    await mailJetClient.post('send', {'version': 'v3.1'}).request(postBody);
    success = true;
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({ success });
})

module.exports = router;
