import React from 'react'
import 'scss/gatstrap.scss'
import 'animate.css/animate.css'
import 'prismjs/themes/prism-okaidia.css'
// import 'font-awesome/css/font-awesome.css'

export default class HTML extends React.Component {
  render() {
    return (
      <html lang="ja">
        <head>
          <meta charSet="utf-8" />
          <meta name="google-site-verification" content="bqC3Rou08IfTSyHaAdHgZK3qKHiSLHVpdgfiEjylKwI" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {this.props.headComponents}
          <link
            href="/img/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link href="/img/favicon.ico" rel="icon" type="image/x-icon" />
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}
