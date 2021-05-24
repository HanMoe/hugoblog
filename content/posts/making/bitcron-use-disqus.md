---
title: 'Bitcron 科学使用 Disqus'
date: 2018-10-17 00:00:00
tags: [折腾]
published: true
hideInList: false
feature: 
---

## 前言

其实说到评论，老实讲 Bitcron 自带的评论还算好用，简单明了，该有的功能也都有。访问速度也没有问题。只是对于 Bitcron 来讲，所有的评论都是以一个个单独的 csv 文件的形式存在，然后存放在一个叫做 -comment 的文件夹里。从别的地方导入进来吧，很容易。但是想导出去好像我还没有找到办法。


于是，思来想去就想换了。但是现在能用的不多，好用的插件，要么就关闭服务了，要么就被挡住了。直到昨天，逛到朋友的站，讲到了可以科学的使用Disqus，利用 API 可以愉快的在圈内玩耍。立马就被种草了。

## 过程

翻了教程，整个项目跑下来其实不难，制作这个项目的大神在 Github 里面其实已经说的很详细了。我就记录一下在 Bitcron 中使用这个项目的关键点。

- 因为 Bitcron 是静态托管服务，所以如果想使用这个项目，你需要一台支持 PHP 的境外主机，国内的不行。
- 对于主机的PHP版本有要求，不能低于 5.6+
- 因为 Bitcron 默认是开启 SSL 服务的。所以存放项目文件的链接也要开启 SSL 服务，不然会有跨域的报错问题。
- Bitcron 预留了 第三方评论的设置接口。直接在  Dashboard - 呈现 中 粘贴前端代码就可以。


## 最后

贴上大神的网址：

> [fooleap](https://blog.fooleap.org/)

以及项目的 Githu 地址：

> [Disqus-php-api](https://github.com/fooleap/disqus-php-api)

有兴趣的小伙伴可以折腾一下。