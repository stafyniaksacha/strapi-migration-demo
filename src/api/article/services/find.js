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
    const knex = strapi.db.connection

    /**
     * select * 
     * from articles 
     * where (version, slug) in (
     *  select max(version) as version, slug
     *    from articles 
     *    group by slug, state
     *    having state = 'Published'
     *  )
     * limit ?
     * offset ?
     * order by created_at desc
     */
    const articles = await knex('articles')
      .limit(options.limit)
      .offset(options.offset)
      .orderBy('created_at', 'desc')
      .where(knex.raw("(version, slug) in (select max(version) as version, slug from articles group by slug, state having state = 'Published')"))
      .select()

    return articles
  }
}