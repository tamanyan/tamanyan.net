---
title: 10 分で Kubernetes クラスタに Node.js アプリをデプロイする
description: 30分で Kubernetes に Node.js アプリをデプロイする方法について説明する
date: '2018-10-01T12:40:32.169Z'
image: ./typescript-nuxtjs-firebase.jpg
layout: post
path: '/deploy-node-app-to-kubernetes-in-10-mins/'
category: Backend
tags:
  - Kong
  - k8s
author: tamanyan
---

10 分でローカルの Kubernetes クラスタに Node.js で構築した Web App をデプロイする

#### この記事で分かる事

- Kunerbetes の基礎の基礎
- Node.js アプリを Kubernetes 上に構築する方法
- Docker for Mac Kubernetes の使い方

<!--more-->

#### プロジェクトのディレクトリ構成
```
> tree -L 2 -I 'node_modules' .
.
├── Makefile # command list
├── README.md
├── k8s
│   ├── deployment.yaml # Kubernetes Deployment
│   └── service.yaml # Kubernetes Service
└── node-app
    ├── Dockerfile # Dockerfile for Node.js app
    ├── index.js
    ├── package-lock.json
    └── package.json
```

## Kubernetes を知る

Docker は触っていても Kubernetes は初めてという人は結構多いのではないだろうか？

「Kubernetes は、コンテナ化したアプリケーションのデプロイ、スケーリング、および管理を行うための、オープンソースのコンテナオーケストレーションシステムである」

と書かれていても全くピンと来ない。まずオーケストレーションってなんだよ、曲でも作るのかと冗談のように考える人もいるだろう。

[オーケストレーション (コンピュータ)](https://ja.wikipedia.org/wiki/%E3%82%AA%E3%83%BC%E3%82%B1%E3%82%B9%E3%83%88%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3_(%E3%82%B3%E3%83%B3%E3%83%94%E3%83%A5%E3%83%BC%E3%82%BF))

> オーケストレーション（英: Orchestration）は、複雑なコンピュータシステム/ミドルウェア/サービスの配備/設定/管理の自動化を指す用語。

`Pod`, `Service`, `Node` など一般用語にもあるような独自の概念が出てきてイマイチとっつきにくい Kubernetes を理解するために、
まず以下の Video を見て雰囲気を感じてもらいたい。 英語だが、字幕をつけて絵だけ見ていても雰囲気を感じ取れると思う。

<iframe width="560" height="315" src="https://www.youtube.com/embed/4ht22ReBjno" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

## 構築するアプリのアーキテクチャ

## Docker for Mac Edge バージョンをインストール

[Docker Community Edition for Mac](https://store.docker.com/editions/community/docker-ce-desktop-mac) に行き、以下の `Get Docker CE for Mac (Edge)` からダウンロードする。

![Docker for Mac のインストール](./docker_for_mac_download.png)

## Kubernetes を有効にする

Docker アプリから Preferences を開き、Apply を押して有効にする。

![Docker for Mac の設定](./docker_for_mac_k8s.png)

## まとめ

## 参考URL

- [VKubernetes NodePort vs LoadBalancer vs Ingress? When should I use what?](https://medium.com/google-cloud/kubernetes-nodeport-vs-loadbalancer-vs-ingress-when-should-i-use-what-922f010849e0)
