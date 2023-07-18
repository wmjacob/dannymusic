const express = require('express');
const router = express.Router();
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const DOWNLOAD_PASSWORD_SECRET = 'album-access-password'
const DOWNLOAD_LINK_SECRET = 'album-access-link'
const BIO_LINK_SECRET = 'bio-access-link'

const getSecretValue = async (secret) => {
  if (process.env.NODE_ENV !== 'development') {
    const client = new SecretManagerServiceClient();
    const name = `projects/dannymusic/secrets/${secret}/versions/latest`;
    const [version] = await client.accessSecretVersion({ name });
    if (!version.payload || !version.payload.data || !version.payload.data.toString) {
      res.status(500).json({ error: 'Internal Error' });
      return;
    }
    return version.payload.data.toString();
  }
  return process.env[`SECRET_${secret.toUpperCase().replaceAll('-', '_')}`];
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
  res.status(200).json({ status: 'jeff' });
});

module.exports = router;
