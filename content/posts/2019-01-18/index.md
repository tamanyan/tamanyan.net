---
title: 前処理大全は機械学習に関わる人の必需品
description: 前処理大全についてレビューする。データサイエンスの現場において、「前処理」と呼ばれるデータの整形に多くの時間を費やす。この本は前処理にのみ特化して説明が書かれている。
date: '2019-01-18T22:40:32.169Z'
image: ./card.jpeg
layout: post
path: '/preprocessing-cookbook/'
category: 本紹介
tags:
  - DataScience
author: tamanyan
---

本橋智光さん著の「<a href="https://amzn.to/2TWldLy" target="_blank">前処理大全 データ分析のためのSQL/R/Python実践テクニック</a>」を読み終えたのでレビューする。
感想を述べると「<span class="strong">機械学習のモデルはなんとなく理解できたけど、モデルをどのようなデータを渡して訓練すれば良いか分からない人に良い</strong>」。

<!-- <iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="https://rcm-fe.amazon-adsystem.com/e/cm?ref=qf_sp_asin_til&t=tamanyan0a1-22&m=amazon&o=9&p=8&l=as1&IS1=1&detail=1&asins=4774196479&linkId=509edc3694525316204459e8caaba708&bc1=FFFFFF&lt1=_top&fc1=333333&lc1=0066C0&bg1=FFFFFF&f=ifr">
</iframe> -->

## 良いと思った点

### 駄目なコードと良いコードが併記されている

本書ではSQLとRとPythonの３つの言語で各前処理のコードの書き方が分かる。個人的にはRは必要なかったが、読む対象を広げているのだなという印象を受ける。 

<!--more-->

この本は更に良いのは、実装するコードが「Awesome（良い）」と「Not Awesome（悪い）」のさらに２種類に分けてコードが書かれている。特にSQLに関しては書き方に気をつけないとフルサーチになってしまうので、この点に関しては気をつけていったほうが良いなと感じた。

例えばランダムに半分データを撮ってくるSQLを書くと以下のように2種類併記されている。

#### Not Awesome
```sql
SELECT *
FROM sample_database
-- データ行ごとに乱数を生成し、乱数の小さい順にデータを並び替え
ORDER BY RANDOM()
-- 事前にカウントしたデータ数を入力し、抽出する割合を掛ける
LIMIT ROUND(120000 * 0.5)
```

#### Awesome
```sql
SELECT *
FROM sample_database
-- 乱数を発生し、0.5以下を取り込む
WHERE RANDOM() <= 0.5
```

### 正規化や欠損の補完など細かいテクニックが分かる

線形モデルは特に残差が正規分布に従う仮定に基づいているので、値を正規化しないと精度が落ちてしまう。そのような場合での数値の正規化の方法などが書かれている。また欠損の定数の補完、集計値の補完など様々なテクニックが説明されている。

## 最後に

この本では「前処理」の具体的なテクニックをコードを用いながら学習できると感じた。内容も難しくないので、機械学習やり始めの方はぜひ手にとってほしい。

<!-- <iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="https://rcm-fe.amazon-adsystem.com/e/cm?ref=qf_sp_asin_til&t=tamanyan0a1-22&m=amazon&o=9&p=8&l=as1&IS1=1&detail=1&asins=4774196479&linkId=509edc3694525316204459e8caaba708&bc1=FFFFFF&lt1=_top&fc1=333333&lc1=0066C0&bg1=FFFFFF&f=ifr">
</iframe> -->
