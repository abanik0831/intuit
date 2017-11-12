import Nexmo from 'nexmo'
import request from 'request-promise'
import secret from '../secret.json'

let nexmo;

function init() {
    nexmo = new Nexmo({
      apiKey: secret.nexmoApiKey,
      apiSecret: secret.nexmoApiSecret
    })
}


function sendSms(to, text) {
    const from = secret.nexmoVirtualPhone
    nexmo.message.sendSms(from, to, text)
}

function receiveSms(sms) {
    
}


export {
    init,
    sendSms,
    receiveSms,
};