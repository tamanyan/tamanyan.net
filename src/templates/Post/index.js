const _ = require('lodash')

import { Link } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import map from 'lodash/map'
import Img from 'gatsby-image'

import Adsense from 'components/Adsense'
import Footer from 'components/Footer'
import './style.scss'

const Post = ({ data, site, options }) => {
  const {
    category,
    tags,
    description,
    title,
    path,
    date,
    image,
    author,
  } = data.frontmatter
  const { isIndex, adsense } = options
  const { url } = site
  const html = get(data, 'html')
  const isMore = isIndex && !!html.match('<!--more-->')
  const fixed = get(image, 'childImageSharp.fixed')
  const pageUrl = url + path

  return (
    <div className="article" key={path}>
      <div className="container">
        <div className="info">
          <Link style={{ boxShadow: 'none' }} to={path}>
            <h1>{title}</h1>
          </Link>
          <div className="meta">
            <div className="meta-info">
              <time dateTime={date}>{date}</time>
              {Badges({ items: [category], primary: true, type: 'categories' })}
              {Badges({ items: tags, type: 'tags' })}
            </div>
            {Socials({ link: pageUrl, text: title })}
          </div>
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: isMore ? getDescription(html) : html,
          }}
        />
        {((pageUrl, title) => {
          if (isIndex == false) {
            return (
              <div className="bottom">
                {Socials({ link: pageUrl, text: title })}
              </div>
            )
          }
        })(pageUrl, title)}
        {isMore ? Button({ path, label: 'MORE', primary: true }) : ''}
        <hr />
        {isIndex == false ? Profile({ author: author }) : ''}
        {getAd(isIndex, adsense)}
      </div>
    </div>
  )
}

export default Post

const getAd = (isIndex, adsense) => {
  return !isIndex ? <Adsense clientId={adsense} slotId="" format="auto" /> : ''
}

const getDescription = body => {
  body = body.replace(/<blockquote>/g, '<blockquote class="blockquote">')
  if (body.match('<!--more-->')) {
    body = body.split('<!--more-->')
    if (typeof body[0] !== 'undefined') {
      return body[0]
    }
  }
  return body
}

const Button = ({ path, label, primary }) => (
  <Link className="readmore" to={path}>
    <span
      className={`btn btn-outline-primary btn-block ${
        primary ? 'btn-outline-primary' : 'btn-outline-secondary'
      }`}
    >
      {label}
    </span>
  </Link>
)

const Badges = ({ items, primary, type }) =>
  map(items, (item, i) => {
    return (
      <a
        href={`/${type}/${_.kebabCase(item)}`}
        className={`badge ${primary ? 'badge-primary' : 'badge-secondary'}`}
        key={i}
      >
        {item}
      </a>
    )
  })

const Socials = ({ link, text }) => {
  return (
    <span className="social">
      <a
        href={`https://b.hatena.ne.jp/entry/s/${link}`}
        target="_blank"
        className="share-btn hatena"
      >
        <i className="fa fa-hatena" />
      </a>
      <a
        href={`https://twitter.com/share?url=${link}&amp;text=${text}&amp;hashtags=tamanyannet`}
        target="_blank"
        className="share-btn twitter"
      >
        <i className="fa fa-twitter" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
        target="_blank"
        className="share-btn facebook"
      >
        <i className="fa fa-facebook" />
      </a>
    </span>
  )
}

const Profile = ({ author }) => (
  <div className="profile">
    <div className="name-icon">
      <img className="icon" src={author.icon} />
      <div className="name">{author.name}</div>
    </div>
    <div className="social-accounts">
      <a
        href={`https://twitter.com/tamanyan55`}
        target="_blank"
        className="share-btn twitter"
      >
        <i className="fa fa-twitter" />
      </a>
      <a
        href={`https://github.com/tamanyan`}
        target="_blank"
        className="share-btn github"
      >
        <i className="fa fa-github" />
      </a>
      <a
        href={`https://www.linkedin.com/in/tyoshida`}
        target="_blank"
        className="share-btn linkedin"
      >
        <i className="fa fa-linkedin" />
      </a>
      <a
        href={`mailto:tamanyan.ttt@gmail.com`}
        target="_blank"
        className="share-btn email"
      >
        <i className="fa fa-email" />
      </a>
    </div>
    <div className="description">{author.bio}</div>
  </div>
)
