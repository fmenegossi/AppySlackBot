
const request = require('supertest')
const app = require('../app')
const sendToSlack = require('../lib/sendToSlack')

describe('Test the root path', () => {
    test('It should response the GET method', () => {
        return request(app).get('/')
          .then((response) => {
            expect(response.statusCode).toBe(200)
        }).catch((err) =>
      console.log(err)
      sendToSlack(err))
    })
})
