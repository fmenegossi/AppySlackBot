const request = require('supertest')
const app = require('../app')

const requestBody = {
  'text': 'list'
}

describe('Test the platform route', () => {
  test('It should response the POST method', () => {
    return request(app)
      .post('/api/platforms')
      .set({ 'x-test': 'test' })
      .send(requestBody)
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })

  test('It should give us a nice text', () => {
    return request(app)
      .post('/api/platforms')
      .set({ 'x-test': 'test' })
      .send(requestBody)
      .then((response) => {
        const result = response.body

        expect(result.text !== '')
      })
  })

  test('It should FAIL the POST method', () => {
    return request(app)
      .post('/api/platforms')
      .send(requestBody)
      .then((response) => {
        expect(response.statusCode).toBe(401)
      })
  })
})
