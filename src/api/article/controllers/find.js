'use strict';

module.exports = {
  /**
   * Find last publised article version by slug
   */
  async bySlug(ctx) {
    const { slug } = ctx.params

    const article = await strapi.service('api::article.find').bySlug(slug)

    const sanitized = await strapi.controller('api::article.article').sanitizeOutput(article, ctx)
    return strapi.controller('api::article.article').transformResponse(sanitized)
  },

  /**
   * Find last publised articles version
   */
  async latest(ctx) {
    const articles = await strapi.service('api::article.find').latest()

    const sanitized = await strapi.controller('api::article.article').sanitizeOutput(articles, ctx)
    return strapi.controller('api::article.article').transformResponse(sanitized)
  }
}