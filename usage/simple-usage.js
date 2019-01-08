const apickli = require('../lib/apickli.js')

const ctx = {
  variables: {
    a: 1,
    connection: 'close'
  }
}

const req = {
  baseUrl: 'https://httpbin.org',
  headers: {
    Authorization: 'Bearer abcd'
  }
}

const request = apickli
  .request(req)
  .map(apickli.setHeader('map', '`a`'))
  .map(apickli.setQueryParameter('a', '`a`'))
  .map(apickli.setMethod('GET'))
  .map(apickli.setUri('/status/400?q=`a`'))
  .chain(apickli.inspectTemplated)

console.log('before')
request
  .execute(ctx)
  .then(apickli.assertResponseCode(400))
  .then(apickli.assertResponseHeaderValue('Connection', '`connection`'))
  .catch(err => console.error(err))
console.log('after')
