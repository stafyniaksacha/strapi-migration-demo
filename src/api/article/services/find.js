'use strict';

module.exports = {
  /**
   * Find last publised article version by slug
   * 
   * @param {string} slug 
   */
  async bySlug(slug) {
    const [article] = await strapi.entityService.findMany('api::article.article', {
      filters: {
        slug,
        state: 'Published',
      },
      limit: 1,
      sort: { version: 'desc' },
    })

    return article
  },

  /**
   * Find last publised articles version
   */
  async latest(options = {limit: 10, offset: 0}) {
    const qb = strapi.db.queryBuilder('api::article.article')

    const articles = await qb
      .select(qb.raw('max(version) as version, *'))
      .where({
        state: 'Published'
      })
      .groupBy('slug')
      .limit(options.limit)
      .offset(options.offset)
      .orderBy('createdAt', 'desc')
      .execute()

    return articles
  }
}