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
const nexmo = require('./nexmo/nexmo')
const db = require('./db/db')

app.set('port', (process.env.PORT || 8080))
app.use(express.static(__dirname + '/public'))  // static directory
app.use(bodyParser.json({type: 'application/json'}))
nexmo.init();

// Custom routes (not convered by static files, uses twig template engine)
app.post('/', (req, res) => {
  googleAssitant.apiAssistant(req, res)
});

app.get('/send-sms', (req, res) => {
  console.log('Received /send-sms request');
  nexmo.sendSms()
  res.end('done')
});


// lets startup this puppy
app.listen(app.get('port'), () => {
  msg.log('\n')
  console.log(chalk.cyan('Server Started ' + new Date()));
  msg.log('\n')
  const serverInfo = chalk.yellow(`http://localhost:${app.get('port')}`);
  msg.success('=', _.pad(`Application Running On: ${serverInfo}`, 80), '=')
})
