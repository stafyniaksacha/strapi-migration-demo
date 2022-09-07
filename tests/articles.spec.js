'use strict'

const { setup, teardown, agent } = require('./helpers/strapi')

jest.setTimeout(60000)

process.env.STRAPI_LOGGER_LEVEL = 'error'

describe('articles api', () => {
  beforeAll(setup)
  afterAll(teardown)

  describe('/api/articles/get/latest', () => {
    it('should respond with 200 to unauthenticated users', async () => {
      expect.assertions(1)

      const response = await agent().get('/api/articles/get/latest')

      expect(response.status).toBe(200)
    })

    it('should get latest published version', async () => {
      expect.assertions(4)

      const response = await agent().get('/api/articles/get/latest')

      expect(Array.isArray(response.body.data)).toBe(true)
      expect(response.body.data.length).toBe(2)
      expect(response.body.data.find(article => article.attributes.slug === 'article-1').attributes.version).toBe(3)
      expect(response.body.data.find(article => article.attributes.slug === 'article-2').attributes.version).toBe(2)
    })
  })

  describe('/api/articles/slug/:slug', () => {
    it('should respond with 200 to unauthenticated users', async () => {
      expect.assertions(1)

      const response = await agent().get('/api/articles/slug/article-1')

      expect(response.status).toBe(200)
    })

    it('should get latest published version', async () => {
      expect.assertions(1)

      const response = await agent().get('/api/articles/slug/article-1')

      expect(response.body.data.attributes.version).toBe(3)
    })
  })
})
