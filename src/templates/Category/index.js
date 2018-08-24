import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

// Components
import Link from 'gatsby-link'
import Layout from 'components/Layout'

const Category = ({ pageContext, data, location }) => {
  const { category } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const categoryHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } in "${category}"`

  return (
    <div>
      <Layout location={location}>
        <div className="container">
          <h1>{categoryHeader}</h1>
          <ul>
            {edges.map(({ node }) => {
              const { path, title } = node.frontmatter

              return (
                <li key={path}>
                  <Link to={path}>{title}</Link>
                </li>
              )
            })}
          </ul>
          {/*
                  This links to a page that does not yet exist.
                  We'll come back to it!
                */}
        </div>
      </Layout>
    </div>
  )
}

Category.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              path: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Category

export const pageQuery = `
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`
