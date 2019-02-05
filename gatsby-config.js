const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: 'Tamanyan.net | たまにゃんのエンジニアブログ',
    description: 'ソフトウェアエンジニアリング・データサイエンス・バンコクの生活について書く。',
    siteUrl: 'https://tamanyan.net',
    twitter: 'tamanyan55',
    adsense: '',
  },
  pathPrefix: '/',
  mapping: {
    'MarkdownRemark.frontmatter.author': `AuthorYaml`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, `content`, `posts`),
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/images/`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1440,
              linkImagesToOriginal: false,
              wrapperStyle: 'margin-bottom: 1.0725rem;',
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          `gatsby-remark-katex`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Tamanyan.net | たまにゃんのエンジニアブログ',
        short_name: 'Tamanyan.net | たまにゃんのエンジニアブログ',
        description: 'ソフトウェアエンジニアリング・データサイエンス・バンコクの生活について書く。',
        homepage_url: 'https://tamanyan.net',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#3f51b5',
        display: 'standalone',
        icons: [
          {
            src: '/img/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/img/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-51247761-4',
      },
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        mergeSecurityHeaders: true,
        mergeLinkHeaders: true,
        mergeCachingHeaders: true,
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    // 'gatsby-plugin-react-next',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-twitter',
    'gatsby-transformer-sharp',
    `gatsby-transformer-yaml`,
  ],
}
