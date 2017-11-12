import Nexmo from 'nexmo'
import request from 'request-promise'
import secret from '../secret.json'

let nexmo;

function init() {
    nexmo = new Nexmo({
      apiKey: '89277534',
      apiSecret: secret.nexmoApiSecret
    })
}


function sendSms(to, text) {
    const from = '12017628341'
    nexmo.message.sendSms(from, to, text)
}

function receiveSms(sms) {
    
}


export {
    init,
    sendSms,
    receiveSms,
};