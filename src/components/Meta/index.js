import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'

const Meta = ({ site, title, url, image, description }) => {
  const metaTitle = title || get(site, 'title')
  const metaDescription = description || get(site, 'description')
  const metaImage = image || `${get(site, 'url')}/img/tamanyan_net.jpg`
  const metaUrl = url || get(site, 'url')

  return (
    <Helmet
      title={metaTitle}
      meta={[
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:site',
          content: `@${get(site, 'twitter')}`,
        },
        { property: 'og:title', content: metaTitle },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:url',
          content: metaUrl,
        },
        {
          property: 'og:image',
          content: metaImage,
        },
        {
          property: 'google-site-verification',
          content: 'bqC3Rou08IfTSyHaAdHgZK3qKHiSLHVpdgfiEjylKwI',
        },
      ]}
    >
      <html lang="ja" />
    </Helmet>
  )
}
export default Meta
