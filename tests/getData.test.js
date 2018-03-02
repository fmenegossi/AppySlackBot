require('dotenv').config()
const request = require('supertest')
const sendToSlack = require('../lib/sendToSlack')
const getData = require('../lib/getData')
const {getToken} = require('../lib/getToken')
const config = require('../config/config')
const username = process.env.SAP_EMAIL
const password = process.env.SAP_PASSWORD
const tokenUrl = config.TOKEN_URL

describe('It checks if we can get data and token from Api', () => {
  test('get token', () => {
    return getToken(username,password,tokenUrl)
        .then((token) => {
          if (token !== '') {
            sendToSlack('token not working')
          }
          expect(token !== '')
        })

  })
})
