const request = require('supertest')
const app = require('../app')

describe('Test the root path', () => {
  test('It should response the GET method', () => {
    return request(app)
      .get('/')
      .set({ 'x-test': 'monkey' })
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })
})
