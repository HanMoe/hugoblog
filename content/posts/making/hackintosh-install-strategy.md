---
title: 'Hackintosh 安装全攻略'
date: 2019-11-21 23:15:16
tags: [折腾]
published: true
hideInList: false
feature: https://cdn.nuoea.com/19-11-21/1.jpg
---
## 写在前面

感觉现在已经离不开 macOS 了。因为手里的这台15款的Macbook Pro 什么都好，就是性能已经慢慢的跟不上我的要求，所以折腾了一台 Hackintosh ，配置之前也发出来了--[我的配置](https://nuoea.com/post/asrock-itx-hackintosh/)。然后就有小伙伴要求写个教程。我就想整理一下，尽可能全面的从硬件的选购到整个装机点亮的过程都记录下来。希望可以给想折腾的小伙伴一点参考。


## 硬件指南

选对的合适的硬件，那么 `Hackintosh` 就已经成功了90%以上。选对硬件，意味着安装时可以少走弯路，新手也能很轻松的折腾，不仅可以节省大量的时间成本，而且在使用的过程中也可以获得更加完整、稳定的体验。升级起来，也不需要每次都费劲功夫的折腾驱动，非常省心。

就目前而言，能够比较稳定使用的配置是：

- Intel 1151针的 第八代、第九代酷睿处理器。`免驱`
- 市面上主流的华硕、技嘉、华擎、微星主板。`缩水版除外`
- AMD 的Radeon VII系列、Vega系列、RX系列显卡。`免驱`
- 主流 M.2接口支持NVME协议的固态硬盘。`免驱`
- 4k分辨率、5k分辨率的显示器。`体验最好`
- 苹果Mac拆机或者同款的蓝牙WiFi二合一无线网卡。`免驱`
- 主流的DDR4内存条。`越大越好`
- 电源机箱别贪便宜，特别是电源千万不能缩水。`功率要足`

基本上 Hackintosh 的配置就从上面的选购指南中挑选就行了，只要不买一些冷门小众的品牌，不会有太大的问题。当然也会有人说，我不喜欢AMD的显卡，我就想用英伟达的显卡做双系统可不可以。答案是可以。但是英伟达的显卡目前不支持升级到 `MacOS Mojave 10.14.0`以上。只能停留在 `10.13.6` 这个版本。所以不介意自己不能使用最新版的同学可以选择N卡。

## 前期准备

- 进入主板BIOS设置，将”安全启动”关闭,将”传统模式”打开。
- 一个空白的U盘，8G以上的容量。
- 一个已经制作好带CLover引导工具的安全镜像（.dmg格式）。这里提供一个10.14.6的镜像--[下载提取码：qrwt](https://pan.baidu.com/s/1yx7A_wlfepp6ybTCRcz4cg) 
- Win 平台需要镜像写入软件：TransMac。
- Mac 平台需要镜像写入软件：Etcher。

## 写入镜像

### Win 平台

![](https://cdn.nuoea.com/19-11-21/2.jpg)

写入镜像

- 打开 `TransMac` 软件，插入空白U盘。
- 右键单击U盘 选 `Format Disk For Mac` 格式化U盘。
- 然后再次右键单击U盘，选中 `Restore with Disk Image` ，然后选择下载好的安装镜像写入U盘。

### Mac 平台

![](https://cdn.nuoea.com/19-11-21/3.png)

写入镜像

- 打开 `Etcher` 软件。插入空白U盘。
- 在 `Etcher` 中选中自动识别出来的U盘，点击 `Flash` 即可。

制作好了安装U盘之后，就可以开始正式安装了。

![](https://cdn.nuoea.com/19-11-21/4.png)

clover 引导工具界面

- 首先重启电脑。
- 插入已经写好镜像的U盘。开机选择从U盘启动。这个时候我们会进入到 `clover` 的引导界面。
- 移动光标到 `Boot OS X Install` 安装盘。然后敲击 `空格键` 。
- 用方向键与回车选中 `Verbose(-v)` 。
- 再用方向键和回车选择 `Boot macOS with selected options` 。
- 等待进入安装界面。

## 安装详细

![](https://cdn.nuoea.com/19-11-21/5.png)

语言选择

![](https://cdn.nuoea.com/19-11-21/6.png)

出现macOS实用工具界面,选择磁盘工具

![](https://cdn.nuoea.com/19-11-21/7.png)

选择 `SSD`,点击抹掉按钮,选择默认的 `Mac OS扩展(日志型)` ,将名称修改为 `Macintosh HD` ,点击 `抹掉` 按钮

![](https://cdn.nuoea.com/19-11-21/8.png)

抹盘成功后,它会自动生成一个200MB的EFI分区，用来存放我们的引导文件

![](https://cdn.nuoea.com/19-11-21/9.png)

到这里,磁盘工具的动作就已经结束了.退出磁盘工具进入安装界面,进行系统的安装了

![](https://cdn.nuoea.com/19-11-21/10.png)

进入安装界面

![](https://cdn.nuoea.com/19-11-21/11.png)

选择继续

![](https://cdn.nuoea.com/19-11-21/12.png)

点击同意,选择Macintosh HD

![](https://cdn.nuoea.com/19-11-21/13.png)

等它装完，期间会自动重启几次。在重启的时候还是要选择从U盘开机。选择继续安装。

![](https://cdn.nuoea.com/19-11-21/15.png)

大功告成！

![](https://cdn.nuoea.com/19-11-21/14.png)

## 性能优化

安装好了镜像，成功进入mac界面并不是结束。这个时候我们还需要替换适合自己硬件的EFI引导文件到系统的EFI分区，来驱动我们的硬件。

这里有一份 Hackintosh 长期维护的机型名单，可以在上面找到适合自己的 EFI 文件夹。

> [长期维护名单](https://github.com/daliansky/Hackintosh)

打开终端,输入命令: `diskutil list` ,它会显示类似的信息:
  
```code
/dev/disk4 (disk image):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        +8.0 GB     disk4
   1:                        EFI EFI                     209.7 MB   disk4s1
   2:                  Apple_HFS XiaoMiPro 10131         7.7 GB     disk4s2

/dev/disk5 (disk image):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        +7.0 GB     disk5
   1:                        EFI EFI                     209.7 MB   disk5s1
   2:                  Apple_HFS XiaoMiPro 10131         6.7 GB     disk5s2
```

挂载EFI分区

我们使用diskutil命令挂载EFI分区，例如这里是：`sudo diskutil mount disk5s1`

复制/替换EFI

将下载好的EFI复制到系统SSD的EFI分区下即可。

## 最后

![](https://cdn.nuoea.com/19-11-21/16.jpg)

EFI目录的结构就是如此。主要的配置项都在 config.plist 文件中。kexts 目录存放的是驱动文件。如果按照给出的标准硬件去配置着台机器的话，其实绝大部分硬件都免驱了，我们只需要几个核心的驱动文件就可以了。

- Clover -- 引导工具 [下载地址](https://github.com/Dids/clover-builder/releases)
- Lilu -- 核心驱动 [下载地址](https://github.com/acidanthera/Lilu)
- WhateverGreen -- 显卡相关 [下载地址](https://github.com/acidanthera/WhateverGreen)
- AppleALC  -- 声卡相关 [下载地址](https://github.com/acidanthera/AppleALC/tree/master/)
- VirtualSMC  -- 核心驱动 [下载地址](https://github.com/acidanthera/VirtualSMC/releases)

当然，如果已经在上面的 `长期维护的机型名单`中，找到了自己的配置。那么就不需要自己再去折腾这些了， 直接下载下来替换就能起飞了。就写到这里吧。






