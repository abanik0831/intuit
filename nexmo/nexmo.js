const Nexmo = require('nexmo')
import request from 'request-promise'

let nexmo;

function init() {
    nexmo = new Nexmo({
      apiKey: '89277534',
      apiSecret: '2ea36b28328aa509'
    })
}


function sendSms(to, companyName, location, time) {
    const from = '12017628341'
    const text = `${companyName} is requesting your services at ${location} at ${time}. Do you accept?`
    nexmo.message.sendSms(from, to, text)

    // const headers = {
    //     'Content-Type':     'application/json'
    // };
    
    // // Configure the request
    // const options = {
    //     url: 'https://rest.nexmo.com/sms/json',
    //     method: 'POST',
    //     headers: headers,
    //     form: {
    //         from: '12017628341',
    //         text: 'A message from nexmo',
    //         to: '14089095234',
    //         api_key: '89277534',
    //         api_secret: '2ea36b28328aa509'
    //     }
    // };

    // request(options).then((error, response, body) => {
    //     console.log('error:', error); // Print the error if one occurred
    //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //     console.log('body:', body); // Print the HTML for the Google homepage.
    //   });

    //   const data = await request('https://www.google.com')
    //   console.log(data)

      // return data
}


export {
    init,
    sendSms,
};