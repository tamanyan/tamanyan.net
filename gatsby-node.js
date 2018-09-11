const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const PostTemplate = path.resolve('./src/templates/index.js')
const CategoryTemplate = path.resolve('./src/templates/Category/index.js')
const TagTemplate = path.resolve('./src/templates/Tag/index.js')
const TagListTemplate = path.resolve('./src/templates/TagList/index.js')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allFile(filter: { extension: { regex: "/md|js/" } }, limit: 1000) {
              edges {
                node {
                  id
                  name: sourceInstanceName
                  path: absolutePath
                  remark: childMarkdownRemark {
                    id
                    frontmatter {
                      layout
                      path
                      tags
                      category
                    }
                  }
                }
              }
            }
          }
        `
      ).then(({ errors, data }) => {
        if (errors) {
          console.log(errors)
          reject(errors)
        }

        // Create blog posts & pages.
        const items = data.allFile.edges
        const posts = items.filter(({ node }) => /posts/.test(node.name))
        _.each(posts, ({ node }) => {
          if (!node.remark) return
          const { path } = node.remark.frontmatter
          createPage({
            path,
            component: PostTemplate,
          })
        })

        const pages = items.filter(({ node }) => /page/.test(node.name))
        _.each(pages, ({ node }) => {
          if (!node.remark) return
          const { name } = path.parse(node.path)
          const PageTemplate = path.resolve(node.path)
          createPage({
            path: name,
            component: PageTemplate,
          })
        })

        /* ------------- Start creating Tag Pages ------------- */

        // Tag pages:
        let tags = []
        // Iterate through each post, putting all found tags into `tags`
        _.each(posts, edge => {
          if (_.get(edge, 'node.remark.frontmatter.tags')) {
            tags = tags.concat(edge.node.remark.frontmatter.tags)
          }
        })

        // Eliminate duplicate tags
        tags = _.uniq(tags)

        // Make tag pages
        _.each(tags, tag => {
          createPage({
            path: `/tags/${_.kebabCase(tag)}/`,
            component: TagTemplate,
            context: {
              tag,
            },
          })
        })

        // Make tag list page
        createPage({
          path: `/tags/`,
          component: TagListTemplate,
        })

        /* ------------- Finish creating Tag Pages ------------- */

        /* ------------- Start creating Category Pages ------------- */

        // Category pages:
        let categories = []
        // Iterate through each post, putting all found tags into `tags`
        _.each(posts, edge => {
          if (_.get(edge, 'node.remark.frontmatter.category')) {
            categories = categories.concat([
              edge.node.remark.frontmatter.category,
            ])
          }
        })

        // Eliminate duplicate tags
        categories = _.uniq(categories)

        // Make tag pages
        _.each(categories, category => {
          createPage({
            path: `/categories/${_.kebabCase(category)}/`,
            component: CategoryTemplate,
            context: {
              category,
            },
          })
        })

        /* ------------- Finish creating Category Pages ------------- */
      })
    )
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        templates: path.resolve(__dirname, 'src/templates'),
        scss: path.resolve(__dirname, 'src/scss'),
      },
    },
  })
}
