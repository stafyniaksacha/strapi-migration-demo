const articles = [
  // article-1
  { slug: 'article-1', version: 1, state: 'Published', title: "Article N°1", content: "# Hello world\nversion 1" },
  { slug: 'article-1', version: 2, state: 'Published', title: "Article N°1", content: "# Hello world\nversion 2" },
  { slug: 'article-1', version: 3, state: 'Published', title: "Article N°1", content: "# Hello world\nversion 3" },
  { slug: 'article-1', version: 4, state: 'Scheduled', title: "Article N°1", content: "# Hello world\nversion 4" },
  { slug: 'article-1', version: 5, state: 'Draft', title: "Article N°1", content: "# Hello world\nversion 5" },

  // article-2
  { slug: 'article-2', version: 1, state: 'Published', title: "Article N°2", content: "# Hello world\nversion 1" },
  { slug: 'article-2', version: 2, state: 'Published', title: "Article N°2", content: "# Hello world\nversion 2" },
  { slug: 'article-2', version: 3, state: 'Draft', title: "Article N°2", content: "# Hello world\nversion 3" },
]


async function importArticles() {
  const tasks = []

  for (const article of articles) {
    tasks.push(
      strapi.entityService.create('api::article.article', {
        data: article
      })
    )
  }

  await Promise.all(tasks)
}

module.exports = {
  importArticles,
}