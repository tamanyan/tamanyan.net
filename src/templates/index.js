import { graphql } from 'gatsby'
import get from 'lodash/get'
import React from 'react'

import Post from 'templates/Post'
import Meta from 'components/Meta'
import Layout from 'components/Layout'
import Page from 'templates/Page'

const Template = ({ data, location }) => {
  console.log(data);
  return (
    <div>
      <Layout location={location}>
        <Meta
          title={get(data, 'post.frontmatter.title')}
          site={get(data, 'site.meta')}
        />
        {get(data, 'post.frontmatter.layout') != 'page' ? (
          <Post
            data={get(data, 'post')}
            site={get(data, 'site.meta')}
            options={{
              isIndex: false,
              adsense: get(data, 'site.meta.adsense'),
            }}
          />
        ) : (
          <Page {...this.props} />
        )}
      </Layout>
    </div>
  )
}
export default Template

export const pageQuery = graphql`
  query PostByPath($path: String!) {
    site {
      meta: siteMetadata {
        title
        description
        url: siteUrl
        twitter
        adsense
      }
    }
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        layout
        title
        path
        category
        tags
        description
        date(formatString: "YYYY/MM/DD")
        author {
          id
          icon
          name
          bio
          twitter
        }
        image {
          childImageSharp {
            fixed(width: 500) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
    }
  }
`
