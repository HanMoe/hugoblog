---
title: "制作Big Sur风格的 icon"
date: 2021-06-27T16:30:37+08:00
tags: []
published: true
hideInList: false
feature: https://cdn.nuoea.com/2021/20210627164921.jpeg
type: 
---

## 什么是.icns

icns 是 Apple 的 macOS 操作系统的 App 图标文件的扩展名，你在 macOS 的「 Desktop 桌面」、「Finder 访达」、「Dock 程序坞」等看到应用程序的外观就是由一个内置在此 App 内部的扩展名为.icns的文件实现的。

你可以通过鼠标“右键”点击 App - “显示包内容” - 进入 “Contents” 目录 - 进入“Resources”目录，然后在目录下可以找到名为Appicon.icns或其他后缀为.icns的一个图标文件。

要创建一个.icns图标文件，需要准备以下 10 种不同大小的.png图片文件

| 图片名称 | 图片大小 |
| --- | --- |
| icon_16x16.png | 16x16 |
| icon_16x16@2x.png | 32x32 |
| icon_32x32.png | 32x32 |
| icon_32x32@2x.png | 64x64 |
| icon_128x128.png | 128x128 |
| icon_128x128@2x.png | 256x256 |
| icon_256x256.png | 256x256 |
| icon_256x256@2x.png | 512x512 |
| icon_512x512.png | 512x512 |
| icon_512x512@2x.png | 1024x1024 |

## Big Sur

在发布会上，Craig提及了macOS全新的拟物化设计。类似IOS的图标风格，加速了苹果全终端融合的进程。

但是因为时间的关系，很多第三方的APP暂时还没有适配这种风格的图标。所以，作为一名深度强迫症患者。自己去制作相关的ICNS就是唯一的出路了。

## 制作过程

- 准备最大尺寸 1024x1024 图片一张，重命名为icon.png，其他大小尺寸可以通过终端命令生成；
- 通过鼠标右键或者命令，创建一个名为icons.iconset的文件夹；
   
```
 mkdir icons.iconset
```
- 通过终端来快速创建各种不同尺寸要求的图片文件;

```
sips -z 16 16 icon.png -o icons.iconset/icon_16x16.png
sips -z 32 32 icon.png -o icons.iconset/icon_16x16@2x.png
sips -z 32 32 icon.png -o icons.iconset/icon_32x32.png
sips -z 64 64 icon.png -o icons.iconset/icon_32x32@2x.png
sips -z 128 128 icon.png -o icons.iconset/icon_128x128.png
sips -z 256 256 icon.png -o icons.iconset/icon_128x128@2x.png
sips -z 256 256 icon.png -o icons.iconset/icon_256x256.png
sips -z 512 512 icon.png -o icons.iconset/icon_256x256@2x.png
sips -z 512 512 icon.png -o icons.iconset/icon_512x512.png
sips -z 1024 1024 icon.png -o icons.iconset/icon_512x512@2x.png
```
- 最后，终端中运行下面的命令，就可以获得名为icon.icns的图标文件了;
```
iconutil -c icns icons.iconset -o icon.icns
```

**注意 : icon.png图片文件和icons.iconset文件夹要保存在同一级目录下，终端启动后切换到该目录。**


{{< photo s1="" s2="" s3="" s4="">}}