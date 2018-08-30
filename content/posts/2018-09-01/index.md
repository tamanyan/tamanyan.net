---
title: TypeScript + Nuxt.js + Firebase で Web アプリを構築
description: 非 IT 企業のエンジニアに求められている事について話す
date: '2018-08-24T22:40:32.169Z'
image: ./non-tech-company-engineer.jpg
layout: post
path: '/typescript-nuxtjs-firebase/'
category: Programming
tags:
  - Firebase
  - Nuxt.js
  - TypeScript
author: tamanyan
---

Nuxt.js と Firebase を利用していて、多少クセはあるものの、非常に良い感じに Web アプリケーションを構築できている。今回したアプリケーションのアーキテクチャは以下のようである。

全てを Firebase で構築できれば、何も問題ないのだが、世の中のサービスはそんな甘いものではなく、今日ではいろいろなシステムと連携するようなマイクロサービスアーキテクチャが流行っている。私の所属する企業でも既存システムとの連携が必要で全部 Firebase の中だけで完結させる事はできていない。

ここでは Frontend - BFF までを Firebase で構築して、後のバックエンドについては Firebase 以外もしくは異なる Firebase のプロジェクトで構成されていることとする。

<!--more-->


## Nuxt.js と BFF の間のリクエスト

### Firebase Hosting の Rewrite 機能を利用

/api/ 以下を BFF へのアクセスに振り分けるように Firebase Hosting の設定を変更。

```json:firebase.json
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [{
      "source": "/api/**",
      "function": "api"
    },{
      "source": "**",
      "function": "ssrapp"
    }]
  },
  "functions": {
    "source": "dist/functions",
    "predeploy": "yarn build && yarn setup"
  }
}
```

### HTTP プロキシ の設定

開発サーバを立ち上げる際はデフォルトだと

BFF側が http://localhost:5000
Nuxt.js側が  http://localhost:3000

で起動されると思う

`@nuxtjs/axios` と `@nuxtjs/proxy` を利用すると簡単に HTTP のプロキシを作成してくれる。

```javascript:nuxt.config.js
module.exports = {
  ...
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: {
    '/api/': { target: process.env.API_BASE_URL /* http://localhost:5000 */, pathRewrite: {'^/api/': ''}},
  },
  ...
}
```

## 開発・本番環境の分け方

基本的に同一アカウント内に開発環境 DevSampleApp と本番環境 SampleApp の両方を作成している。ステージング環境なども必要であれば適宜用意する。

```json:.firebaserc
{
  "projects": {
    "default": "dev-sample-app",
    "production": "sample-app"
  }
}
```

CI/CD の時に環境を分けてテスト・デプロイできるようにしておく。

```json:package.json
{
  ...
  "scripts": {
    ...
    "use_dev": "firebase use default --token $FIREBASE_TOKEN",
    "use_prod": "firebase use production --token $FIREBASE_TOKEN"
  }
}
```

各環境ごとの環境変数は `.env.local` `.env.dev` `.env.prod` と .env ファイルを用意して対応した。

```javascript:nuxt.config.js
require('dotenv').config()

module.exports = {
  env: {
    APP_ENV: process.env.APP_ENV || 'development',
    APP_BASE_URL: process.env.APP_BASE_URL || 'http://localhost:3000'
  },
  ...
}
```

## Nuxt.js と Firebase で組んで良かった点

### Nuxt.js が簡単すぎた

Rails 的考えなんだろうが、フルスタックフレームワークの恩恵を多大に受けることができた。特に SSR やルーティング作成の容易さ素晴らしく、触っていて久しぶりに簡単だなーと感じて開発していた。

### 運用コストが安かった

Could Functionsのメモリは最大の2GBとして、約 50 万PVのプロダクトでだいたい一ヶ月 $20 くらい課金されていた。他のクラウドで組んでいた場合のコスト計算をしていないので、なんとも言えない。しかし、良くも悪くも組んでいた予算を大幅に下回る結果になった。

### 急に100倍近くのリクエストが飛んできてもビクともしなかった

何かの告知的なもので急激にアクセスが増え、最終的に100倍近くのアクセスが急に来ても全く問題がなかった。全く想定していないアクセス数だったが、何もいじる事なく粛々とアクセスをさばく Cloud Functions さんマジカッケー。

## 悩みどころ

### Cloud Functions はアクセスがこないと Cold Start から始まるので、起動が遅い

Cloud Functions の起動がやけに遅くて、これ本番で大丈夫なの？と心配になっていた。SSR を利用していることもあって、本番で解決されないとまずい問題だったが、アクセスが増えると解決された。

### Blue-Green Deployment

デプロイ時のダウンタイムをなくしたいのだが、バージョンニングができないところが辛い。AWS Lambda だとできるみたいだが、その辺はきっと開発してくれると信じている。

[AWS Lambda Function Versioning and Aliases](https://docs.aws.amazon.com/lambda/latest/dg/versioning-aliases.html)

### Google Cloud Functions Emulator が Node 6 しか対応していない

Nuxt.js は version 1.0.0 以降から Node 8 以降しか対応していない。[Cloud Functions は Node 8 に対応できるようになった](https://cloud.google.com/functions/docs/concepts/nodejs-8-runtime)。しかし、ローカルでの開発をする上での [Google Cloud Functions Emulator](https://github.com/GoogleCloudPlatform/cloud-functions-emulator) が Node 6 しか対応していない（※ 2018/08/20 時点）。

> The Emulator only supports Node v6.x.x. It does not support Node v8.x.x or Python

それでも無理やり使用すると一応ちゃんと動作している。デプロイ後は Emulator を使用しないので、今のところ目をつむっている。

## Cloud Firestore の使い道

Cloud Firestore は **One Platform で他のシステムとの連携なしと割り切った時**にはとにかく強力だが、その他のシステムにあるデータとの連携が苦手。ビジネスロジックも各環境（モバイル Web、スマートフォンアプリ）ごとに書く必要がある。

無理に使う必要もないのだが、Firebase でアプリを組むとすぐに使える Datastore なので**他のシステムと連携が必要なさそうな独立したデータ**を保存するようにしている。

例えばアンケート結果やお問い合わせなどは他との連携がない独立したデータであることが多い（中に User ID さえ入っていれば良い）。
