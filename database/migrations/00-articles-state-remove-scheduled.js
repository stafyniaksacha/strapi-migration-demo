module.exports = {
  async up(knex) {
    // change articles state from Scheduled to Draft 
    await knex
      .from('articles')
      .update({
        state: 'Draft'
      })
      .where({
        state: 'Scheduled'
      })
  },
  async down(knex) {
		// This one isn't implemented yet, will be eventually
  },
}