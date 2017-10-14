import request from 'request-promise'

export async function extendSession(sessionId) {
  
  const params = {
    clientUUID: 'daredevil123',
    sessionId,
  }
  
  console.log('calling the api...')
  console.log(params)
  const options = {
    method: 'POST',
    url: 'https://apidev.singaporeair.com/appchallenge/misc/extendsession',
    headers: {
      'content-type': 'application/json',
      'x-api-key': 'du1yO8KLZm9PfFeg6OHQW8CFcpK1RMym3JXp78Uk',
    },
    body: JSON.stringify(params)
  }
  
  console.log('api called')
  try {
    const data = await request(options)
    return data
  } catch (err) {
    console.log(err)
  }
  
}

export async function createpnr(sessionId) {
  const params = {
    "clientUUID":"daredevil123",
    "request":{
      "tripType":"R",
      "travellerDetails":[
        {
          "title":"Miss",
          "firstName":"SIA",
          "emailAddress":"sia@appchallenge.com",
          "isLeadPax":"true",
          "contactDetails":[
            {
              "type":"MOBILE",
              "countryCode":"65",
              "number":"12312312"
            }
          ]
        }
      ]
    },
    sessionId,
  }
  
  const options = {
    method: 'POST',
    url: 'https://apidev.singaporeair.com/appchallenge/pnr/create',
    headers: {
      'content-type': 'application/json',
      'x-api-key': 'du1yO8KLZm9PfFeg6OHQW8CFcpK1RMym3JXp78Uk',
    },
    body: JSON.stringify(params)
  }
  
  console.log('create pnr api called')
  try {
    const data = await request(options)
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
  
}

export async function confirmpnr(sessionId, pnr) {
  const params = {
    "clientUUID":"daredevil123",
    "request":{
      pnr,
      "travellerDetails":[
        {
          "isLeadPassenger":"true",
          "contactDetails":[
            {
              "type":"mobile",
              "value":"12312312"
            },
            {
              "type":"email",
              "value":"sia@appchallenge.com"
            }
          ],
          "title":"Miss",
          "passengerID":"1",
          "firstName":"SIA"
        }
      ],
      "addressDetails":{
        "address":"indsdvasd",
        "city":"Singapore",
        "state":"",
        "zipCode":"",
        "countryCode":"IN"
      },
      "paymentDetails":{
        "payeeName":"test",
        "accountNumber":"5102440290873896",
        "expiryDate":"1905",
        "cvvNumber":"111",
        "amount":"1562.40",
        "currencyCode":"SGD"
      }
    },
    sessionId,
  }
  
  const options = {
    method: 'POST',
    url: 'https://apidev.singaporeair.com/appchallenge/pnr/confirm',
    headers: {
      'content-type': 'application/json',
      'x-api-key': 'du1yO8KLZm9PfFeg6OHQW8CFcpK1RMym3JXp78Uk',
    },
    body: JSON.stringify(params)
  }
  
  console.log('confirm pnr api called')
  try {
    const data = await request(options)
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}

/**
 * Expedia apis
 *
 */

export async function getTopThreeVisitDestinations() {
  const options = {
    method: 'GET',
    url: 'https://apim.expedia.com/x/activities/search?location=Rome&key=531bd696-5113-469c-8086-39073fe89517',
    json: true,
  }

  console.log('hello wrold....')
  const data = await request(options)

  return data.activities.slice(0, 3)
}