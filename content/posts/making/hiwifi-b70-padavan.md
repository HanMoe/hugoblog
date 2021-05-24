---
title: '极路由B70刷老毛子Padavan固件全过程'
date: 2018-10-21 00:00:00
tags: [折腾]
published: true
hideInList: false
feature: https://cdn.nuoea.com/18-10-21/9981260.jpg
---

在折腾酸酸乳的时候，无意中看到的这个固件，说是可以用路由器直接挂载酸酸乳，比较感兴趣，就到恩山论坛注册了账号翻了翻帖子。因为手上在用的主路由是小米的PRO，偶尔会有不稳定，但也不是什么大事。比较不爽的是，总是会弹分享路由得金币乱七八糟的广告，所以寻思如果有固件，刷成第三方也蛮好的。只是比较遗憾的是，并没有找到这个路由器的固件，却看到荒野无灯出了极路由B70的padavan固件。想到正好有个B70在家吃灰。就翻出来折腾了。


整个折腾过程不算太难，搞过VPS的基本都能走下来。只是B70这个机器现在比较麻烦的是解锁的过程，很多的教程都失效了。我也是在不断的尝试中，找到了一个现在还能用的解锁方式。

## 解锁

现在官方最新的固件版本号是：1.4.8.20462s 。 这个版本是不能解锁SSH的。唯一的办法就是降级。现在降级的固件在网上也几乎找不到了。分享一下：
>  下载 ：[2.142baf](https://pan.nuoea.com/tools/padavan/b70/B70%E5%AE%98%E6%96%B9%E5%9B%BA%E4%BB%B6/2.142baf.zip)

降级过程：

- 拔掉路由电源。
- 用网线将极路由 LAN 口与电脑网口相连，刷机路由器无需联网，有无线网卡的建议将电脑的无线禁用。
- 按住极路由 RESET 不放，然后插上电源。
- 5秒之后松开 RESET，等待本地连接自动获取IP，网关IP为变为192.168.2.1。
- 浏览器中输入 192.168.2.1 选择降级固件刷机。
- 刷机完成，网关变成192.168.199.1。


到此降级成功。如果中途有地方卡住了，可以重新再来一次。`注意：刷机降级有风险，请谨慎操作！！！`

## 获取权限

这里需要用到的工具是 `WINSCP`。具体过程如下：


- 在极路由官方云插件平台中，下载vsftpd插件， 并设置好。
- WinSCP登录FTP, 密码为路由器后台密码。
- 把破解文件拖入上传。
- 在极路由官方云插件平台中，安装 定时重播 插件。当前已经下架, 可点击任意一个软件，然后在该软件的浏览器网址中找到sid号码，并把sid号码改成118284854安装。
- 在自定义规则中填入： *  * * * * sh /tmp/storage/2.sh ，并启动。
- 回到 WinSCP 软件，  过1分钟左右， 点击刷新按钮。
- 用putty或者xshell ssh登录。用户名：root ，密码：路由器后台密码，端口：22

到此为止整个路由器的准备工作都完成了。剩下的就是刷固件了。

## 备份固件

一定要记得备份，如果以后想要刷回官方固件，备份文件就特别重要了。关键的时候，还可以用来救砖。

```
root@Hiwifi:/tmp# cat /proc/mtd //命令说明：查看原固件分区信息
dev: size erasesize name
mtd0: 00080000 00020000 "u-boot"
mtd1: 00080000 00020000 "debug"
mtd2: 00040000 00020000 "Factory"
mtd3: 02000000 00020000"firmware"
mtd4: 00180000 00020000 "kernel"
mtd5: 01e80000 00020000 "rootfs"
mtd6: 00080000 00020000"hw_panic"
mtd7: 00080000 00020000 "bdinfo"
mtd8: 00080000 00020000 "backup"
mtd9: 01000000 00020000 "overlay"
mtd10: 02000000 00020000"firmware_backup"
mtd11: 00200000 00020000 "oem"
mtd12: 02ac0000 00020000 "opt"
root@Hiwifi:~# dd if=/dev/mtd0 of=/tmp/u-boot.bin //命令说明：备份打包mtd0为u-boot.bin文件到tmp目录下
1024+0 records in
1024+0 records out
root@Hiwifi:~# dd if=/dev/mtd2 of=/tmp/Factory.bin//命令说明：备份打包mtd2为Factory.bin文件到tmp目录下
512+0 records in
512+0 records out
root@Hiwifi:~# dd if=/dev/mtd3 of=/tmp/firmware.bin//命令说明：备份打包mtd3为firmware.bin文件到tmp目录下
65536+0 records in
65536+0 records out
root@Hiwifi:~#
```

其它mtd文件也可以全部备份到tmp目录下。使用winscp工具，scp连接路由器，192.168.199.1。用winscp工具把备份的/tmp/*.bin原厂固件下载到本地电脑备用。

## 备份MAC地址

MAC地址规则及示例：

```
WAN MAC：在LAN的基础上最后一位加1，具体以固件内看到的为准。示例：D4:EE:07:32:84:23
LAN MAC：机器背面的MAC地址即LAN地址，也可以进官方固件查看。示例：D4:EE:07:32:84:22
2.4G MAC：同LAN MAC，也可以用WirelessMon软件查看。示例：D4:EE:07:32:84:22
5G MAC：可以用WirelessMon软件查看，与2.4GMAC区别是第二位不同。示例：D0:EE:07:32:84:22
```

## 刷入 breed

breed 就类似于安卓手机上的 Recovery 。刷上了这个，之后路由器在想刷什么固件都不用担心变砖。

过程也是很简单。

- 用 WINSCP 工具将 breed.bin 文件复制到路由tmp目录。
- 输入命令：root@Hiwifi:～# cd /tmp
- 输入命令：root@Hiwifi:/tmp# mtd breed.bin u-boot
- 输入命令：root@Hiwifi:/tmp#mtd erase firmware_backup 
- reboot

## 刷入 padavan

最后就是刷固件了。

- 路由器抜电源，长按复位键，不要松开。
- 插上电源，5秒后松开复位键，浏览器输入：192.168.1.1。
- 上传 padavan 固件，点恢复固件。

## 最后

刷好之后重启一次，就可以登录路由器了。登录之后别忘了还要双清一次。然后恢复MAC地址。之后就可以享受新固件带来的乐趣了。