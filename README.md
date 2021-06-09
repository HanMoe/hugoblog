# About nuoea.com

> Chance favors the prepared mind.

### Live demo:

> <https://nuoea.com>
### Any questions?

- Issue:
<https://github.com/insdram/nuoea/issues/new>

- Email: 
<inminu@live.com>

# 备忘录:

### 主仓库
> <https://github.com/insdram/nuoea>  
### 备份仓库
> Keybase：<keybase://private/nuoea/nuoea.com>  
> Coding.net： <https://e.coding.net/nuoea/hugo/nuoea.git>
> 码云 Gitee： <https://gitee.com/nuoea/nuoea.git>  
### 架构备忘

> - ~~国内：通过阿里云云效 Codeup & Flow 部署至：阿里云 OSS + CDN~~ (2019.12.20) 
> - ~~国内：通过 [Coding](https://coding.net/) 部署至：[Gitee pages](https://nuoea.gitee.io)~~ 
> - ~~国内：通过 [Coding](https://coding.net/) 部署至：[Coding pages](https://blog.nuoea.com)~~ 
> - ~~国内：通过 GitHub Action 部署至腾讯云 [CloudBase](https://cloud.tencent.com/product/tcb)~~ (2020.08.12)
> - ~~境外：通过 GitHub Action 部署至 [GitHub Pages](https://nuoea.github.io/)~~ (2020.08.12)
- 通过 [Github](https://github.com) 部署至 阿里云 [COS](https://cloud.tencent.com/product/cos) + [CDN](https://cloud.tencent.com/product/cdn) (2021.05.27)

### 添加备用仓库 remote
> default branch: main  
> remote url 传递 id:token 免输各个 git 仓库的账号密码
```
git remote set-url --add --push origin https://id:token@github.com/nuoea/nuoea.com.git
git remote set-url --add --push origin https://id:token@e.coding.net/nuoea/nuoea.com/hugo.git
git remote set-url --add --push origin https://id:token@git.code.tencent.com/nuoea/nuoea.com.git
git remote set-url --add --push origin https://id:token@gitee.com/nuoea/nuoea.com.git
git remote set-url --add --push origin https://id:token@codeup.aliyun.com/id/nuoea/hugo.git
git remote set-url --add --push origin keybase://private/nuoea/nuoea
```

### Coding.net 持续集成部分命令
```
pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: env.GIT_BUILD_REF]],
          userRemoteConfigs: [[
            url: env.GIT_REPO_URL,
            credentialsId: env.CREDENTIALS_ID
          ]]])
        }
      }
      stage('Build Hugo') {
        agent {
          docker {
            image 'envimate/hugo:latest'
            reuseNode true
          }
        }
        steps {
          sh 'hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify'
        }
      }
      stage('上传到 COS Bucket') {
        steps {
          sh 'coscmd config -a ${COS_SECRET_ID} -s ${COS_SECRET_KEY} -b ${COS_BUCKET_NAME} -r ${COS_BUCKET_REGION} -m 30'
          sh 'coscmd upload -r ${COS_UPLOAD_FROM_PATH} /'
          echo '部署成功！'
        }
      }
    }
  }
```
### 腾讯云 CloudBase Actions
> <https://github.com/marketplace/actions/tencent-cloudbase-github-action>
```
      - name: Deploy to Tencent CloudBase
        id: deployStatic
        uses: TencentCloudBase/cloudbase-action@v1.1.1
        with:
          secretId: ${{ secrets.CLOUDBASE_SECRET_ID }}
          secretKey: ${{ secrets.CLOUDBASE_SECRET_KEY }}
          envId: ${{ secrets.CLOUDBASE_ENV_ID }}
          staticSrcPath: public
```

### 部署到阿里云 OSS 的 Actions
> <https://github.com/marketplace/actions/uptoc-action>
```
      - name: Deploy to OSS
        uses: saltbo/uptoc@master
        with:
          driver: oss
          region: cn-shanghai
          bucket: ${{ secrets.bucket }}
          exclude: public/images,public/photos
          dist: public
        env:
          UPTOC_UPLOADER_AK: ${{ secrets.ACCESS_KEY_ID }}
          UPTOC_UPLOADER_SK: ${{ secrets.ACCESS_KEY_SECRET }}
```
### Gitee Pages Free 自动部署 Actions
> https://github.com/marketplace/actions/gitee-pages-action
```
      - name: Build Gitee Pages
        uses: yanglbme/gitee-pages-action@master
        with:
          gitee-username: ${{ secrets.GITEE_USERNAME }}
          gitee-password: ${{ secrets.GITEE_PASSWORD }}
          gitee-repo: nuoea/nuoea
          branch: gh-pages
          # directory: /
          https: true
```

### 通过空提交运行 GitHub Acions

当没有新提交时， 通过 push empty commit 运行 GitHub Actions

```
git commit --allow-empty -m "Rerun GitHub Acions"
git push
```

### 写新文章

1. 生成新文章

```
hugo new posts/making/new_title.md
```

2. 修改 Front matter:  

- `categories` 删除多余的分类    
- `tags` 按需添加
- `draft: true` 改为：`draft: false`  
- `slug` 按需修改

3. 写文章 

通过 Typora 或 VSCode 编辑文章

4. Push & auto deploy:

```
git add .
git commit -m "Post new_title"
git push
```

5. 本地调试（~~Web Server~~）

```
hugo server -w -D -p 8080 -t hello
```
- `hugo server` 把 Hugo 当作 Web 服务器，而非构建静态网页  
- `-w` 有文件变化立即刷新（默认开启）  
- `-D` 构建草稿，撰写新文章时很有用  
- `-p 8080` 端口+端口号（默认 1313）  
- `-t hello-friend` 使用 hello-friend 主题    
- `hugo --help` 查看所有命令  

6. 本地构建

```
hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify
```
- `--cleanDestinationDir` 构建前先清理目标文件夹，即 public  
- `--forceSyncStatic` 强制同步 static 文件夹  
- `--gc` 构建后执行一些清理任务（删除掉一些没用的缓存文件）  
- `--ignoreCache` 构建时忽略缓存  
- `--minify` 压缩网页代码  
- `hugo --help` 查看所有命令  

7. 本地部署至腾讯云 CloudBase
```
cd gpm/github.com/nuoea/nuoea.com
tcb hosting deploy public / -e TCB-envID
```
- `public` 本地 Hugo 静态网页文件（能过第 6 步的命令构建）  
- `/` CloudBase 静态托管的目录，一般部署至根目录`/`  
- `-e TCB-envID` CloudBase 的环境 ID   

### 静态文件（CSS、JS）
> Update: 2021.01.05 使用 Hugo 自带的 Asset minification  
> ~~Update: 2020.12.18 从腾讯云换到了 jsDelivr~~  
```
{{ $maincss := resources.Get "css/style.css" | resources.Minify | resources.Fingerprint "sha256" }}
<link rel="stylesheet" href="{{ $maincss.RelPermalink }}" integrity="{{ $maincss.Data.Integrity }}" crossorigin="anonymous">
```

#### PS：刷新 CDN

**新方式**：（CDN URL 不变）
将`cdn.jsdelivr.net`改为 `purge.jsdelivr.net`，在浏览器中请求即可刷新 CDN。

**旧方法**：
通过打 Tag 的方式刷新 jsDelivr 的 CDN
`tag`对应`commit`
```
git tag vX.X.X
git push origin vX.X.X
# git push origin --tags # 推送所有 Tags
```

### 文章中图片处理方式

现在写博客添加图片，需要手动添加图片地址。

原方法依然可用，注意图片URL即可。

- 图片存放目录：

> Hugo 目录的`static/images/`文件夹下（可按年月分类）。
- 文章中引用的图片 URL：

> `https://nuoea.com/images` `+` `图片路径和名称`
- 如：

> `https://nuoea.com/images/2020/05/ubuntu2004.jpg`
### 相册展示的照片

- 照片存放目录：

> 照片需要上传至腾讯云COS。但是本博客没有开启相册页面，无须操作。
> ~~Hugo 目录的`static/photos/`文件夹下，相册页面会自动索引。~~


