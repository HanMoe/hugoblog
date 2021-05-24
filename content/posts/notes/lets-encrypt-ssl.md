---
title: '关于免费通配符证书'
date: 2019-11-01 13:50:00
tags: [记录]
published: true
hideInList: false
feature: https://cdn.nuoea.com/19-11-1/1.jpg
---

## 说明

Let's Encrypt 是国外一个公共的免费SSL项目，由 Linux 基金会托管，它的来头不小，由 Mozilla、思科、Akamai、IdenTrust 和 EFF 等组织发起，目的就是向网站自动签发和管理免费证书，以便加速互联网由 HTTP 过渡到 HTTPS，目前 Facebook 等大公司开始加入赞助行列。


Let's Encrypt 已经得了 IdenTrust 的交叉签名，这意味着其证书现在已经可以被 Mozilla、Google、Microsoft 和 Apple 等主流的浏览器所信任，用户只需要在 Web 服务器证书链中配置交叉签名，浏览器客户端会自动处理好其它的一切，Let's Encrypt 安装简单，使用非常方便。

## 使用 certbot 
- 1、获取工具
``` 
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
```
- 2、获取证书
```
./certbot-auto certonly  -d 你的域名 -d *.你的域名 --manual --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory
```
- 3、配置解析
Certbot 要求给域名配置一条 TXT 记录，在没有确认 TXT 记录生效之前不要回车执行。配置好之后就可以看到证书文件被生成。剩下的只需要通过SCP等方法下载就好了。
- 4、重要说明
上述有三个交互式的提示：
> 是否同意 Let's Encrypt 协议要求
> 询问是否对域名和机器（IP）进行绑定
> 输入邮箱，给你发送一封验证邮件
> 确认同意才能继续。
- 5、证书更新
证书有效期为三个月，到期之前需要更新证书，更新流程就是重新执行一遍上面的操作，新证书会在你申请证书的日期上加三个月。

## 使用 [Freessl](https://freessl.cn/) 

Freessl 是一个申请免费证书的网站，如果觉得自己敲代码太麻烦，可以使用这个网站获取SSL证书。网站提供TrustAsia和Let's Encrypt两种证书选择。获取证书的操作也比较的简单，按照步骤一直下一步就可以了，没有什么学习成本。
值得一提的是，通过网站获取的通配符证书有效期也是三个月。如果到期之后，网站也提供了自动续期的功能，不过是需要收费的。

