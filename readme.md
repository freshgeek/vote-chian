# 区块链投票系统
 
本项目是基于以太坊的区块链技术，实现一个简单的投票系统、及基于token的投票系统，主要是为了熟悉区块链技术，以及以太坊的基本概念。


## 1. 搭建本地的私链准备工作

我这边是拿 centos 作为搭建，对应版本为：

Linux VM-4-16-centos 3.10.0-1160.71.1.el7.x86_64 #1 SMP Tue Jun 28 15:37:28 UTC 2022 x86_64 x86_64 x86_64 GNU/Linux

### 1.1 安装 go+geth

#### 1.1.1 安装 go

参考 菜鸟教程： https://www.runoob.com/go/go-environment.html

#### 1.1.2 安装 geth

1. 直接下载现成的： https://geth.ethereum.org/downloads
   右下角可以显示旧版本，我这边安装的是 1.11.6 版本，因为新版本不支持 pow，很多坑对新手不友好，后面熟悉了之后再去踩坑会好很多
2. 命令参数不一样：

拿视频教程为例：

> nohup geth --datadir ./data --networkid 15 --rpc --rpcapi db, eth, net, web3, personal, miner --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "\*" 2>output log

对比我的

> ./geth --datadir ./data --networkid 19763 --http --http.port 8545 --http.addr 0.0.0.0 --http.corsdomain "\*" --http.api admin,debug,web3,eth,txpool,personal,miner,net --rpc.enabledeprecatedpersonal --allow-insecure-unlock

**_ 如果嫌麻烦可以直接安装一个 truffle vs 插件，然后可以快速搭建 ganache 私链 _**

### 安装

#### 1. 初始化创世块

./geth --datadir ./data init ./genesis.json

我直接拿了官网的，https://github.com/ethereum/go-ethereum

```
{
  "config": {
    "chainId": <arbitrary positive integer>,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "berlinBlock": 0,
    "londonBlock": 0
  },
  "alloc": {},
  "coinbase": "0x0000000000000000000000000000000000000000",
  "difficulty": "0x20000",
  "extraData": "",
  "gasLimit": "0x2fefd8",
  "nonce": "0x0000000000000042",
  "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "timestamp": "0x00"
}

```

#### 2. 启动

> 直接启动
> ./geth --datadir ./data --networkid 19763 --http --http.port 8545 --http.addr 0.0.0.0 --http.corsdomain "\*" --http.api admin,debug,web3,eth,txpool,personal,miner,net --rpc.enabledeprecatedpersonal --allow-insecure-unlock

> 后台 nohup
> nohup
> ./geth --datadir ./data --networkid 19763 --http --http.port 8545 --http.addr 0.0.0.0 --http.corsdomain "\*" --http.api admin,debug,web3,eth,txpool,personal,miner,net --rpc.enabledeprecatedpersonal --allow-insecure-unlock
> console.log 2>&1 &

### 几个命令

#### web3 attach

./geth attach --datadir ./data

#### 创建账号 web3.personal.newAccount()

#### 解锁 web3.personal.unlockAccount('0x8cbe269fde905f9e849fe677dabdb265f0924527','',300000)

#### 默认账号

#### 默认 ethbase

#### 挖矿，不挖交易没法生效，miner.start(1)

# 安装 truffle

truffle 是一个开发框架:https://github.com/trufflesuite/truffle

> npm install truffle -g

创建新的文件夹，进去后

> truffle unbox webpack

如果出现编译错误，升级 node 后再安装
安装网络问题，更改 host

> https://www.cnblogs.com/xionglingxin-Mirai/articles/17451643.html

# 项目启动

## 1. 合约编译

> truffle compile

## 2.合约部署到本地

> truffle migrate

## 3. 启动前端代码
到app 目录下

> npm install 

> npm run dev

