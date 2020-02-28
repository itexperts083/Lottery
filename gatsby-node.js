const PATH = require("path")
module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const resultTemplate = PATH.resolve("./src/templates/result.js")
    const res = await graphql(`
    query {
      allAllJson {
        edges {
          node {
            slug
          }
        }
      }
    }
  `) // Query comes here

    res.data.allAllJson.edges.forEach(edge => {
        createPage({
            component: resultTemplate,
            path: `/${edge.node.slug}`,
            context: {
                slug: edge.node.slug,
            },
        })
    })
}


// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    // Only update the `/app` page.
    if (page.path.match(/^\/quiniela/)) {
        // page.matchPath is a special key that's used for matching pages
        // with corresponding routes only on the client.
        page.matchPath = "/quiniela/*"
        // Update the page.
        createPage(page)
    }
}