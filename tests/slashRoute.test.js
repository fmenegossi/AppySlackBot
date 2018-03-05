const request = require('supertest')
const app = require('../app')
const sendToSlack = require('../lib/sendToSlack')

describe('Test the slash route', () => {
  test('It should response the POST method', () => {
      return request(app).post('/api/getstatus')
        .then((response) => {
          expect(response.statusCode).toBe(200)
      })
  })

  test('It should give us a nice text', () => {
      return request(app).post('/api/getstatus')
        .then((response) => {
          const result = response.body

          expect(result.text === 'status from AppyBot:')
          expect(result.attachments === [{ text: "Hello! It's status from AppyBot!" }])
      })
  })
})
