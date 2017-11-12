require('babel-core/register')
require('babel-polyfill')

'use strict'

const express = require('express')
const app     = express()
const msg     = require('gulp-messenger')
const chalk   = require('chalk')
const _       = require('lodash')
const bodyParser = require('body-parser')
const googleAssitant = require('./googleAssistant')
const pushNotification = require('./googleAssistant/pushNotification')
const nexmo = require('./nexmo/nexmo')
const db = require('./db/db')
const secret = require('./secret.json')
const data = require('./db/sample_data.json')

app.set('port', (process.env.PORT || 8080))
app.use(express.static(__dirname + '/public'))  // static directory
app.use(bodyParser.json({type: 'application/json'}))
nexmo.init();

// Custom routes (not convered by static files, uses twig template engine)
app.post('/', (req, res) => {
  googleAssitant.apiAssistant(req, res)
});

// For testing
app.get('/send-sms', (req, res) => {
  console.log(`Received /send-sms request. Sending sms to ${secret.testWorkerPhone}`)
  const text = `${data.companies[0].name} is requesting your services at ${data.companies[0].location} at ${'2:00 PM'}. Do you accept? Reply with y(es) or n(o)`
  nexmo.sendSms(secret.testWorkerPhone, text)
  res.status(200)
  res.end('done')
})

app.get('/sms-webhook', (req, res) => {
  console.log('Received /sms-webhook request')
  console.log('req.query', req.query)
  let text;
  if (req.query.keyword === 'YES') {
    text = `${data.workers[0].name} has accepted your request. They will be at your location at ${'2:00 PM'}`
  } else {
    text = `${data.workers[0].name} has declined your request. Not to worry - your Google Assistant can help you find more matches!`
  }
  nexmo.sendSms(secret.testCompanyPhone, text)
  res.status(200)
  res.end('done')
})

app.get('/push-notification', (req, res) => {
  pushNotification.pushVoiceMessage('Welcome to the small business hackathon!');
})

// lets startup this puppy
app.listen(app.get('port'), () => {
  msg.log('\n')
  console.log(chalk.cyan('Server Started ' + new Date()));
  msg.log('\n')
  const serverInfo = chalk.yellow(`http://localhost:${app.get('port')}`);
  msg.success('=', _.pad(`Application Running On: ${serverInfo}`, 80), '=')
})
