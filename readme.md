# Pluto99HECC

[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](#) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/@behaver/pluto99-hecc) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)

## 简介

Pluto99HECC 是计算冥王星 J2000 日心平黄经坐标的组件库，其使用的算法为 Pluto99 算法。

### 计算时效

本组件的计算有效时间范围是：从 -2998/04/23，JDE 626150.5 至 2984/07/26，JDE 2811150.5

### 计算精度

相较于 DE406 的最大误差：0.00005 AU
在日冥距离最小时，且地球在太阳和冥王星中间时，精度最差。
冥王星的近日点为29.65 AU，所以地冥的最小距离为28.65 AU。已知的最大误差0.00005 AU，等效于 arctan(0.00005/28.65) 弧度，即 0.37 角秒。

## 安装

通过 npm 安装，在你的 node 项目目录下执行：

`npm install @behaver/pluto99-hecc`

安装完成后，调用即可：

`const PlutoHECC = require('@behaver/pluto-hecc');`

## 用例

```js
const PlutoHECC = require('@behaver/pluto-hecc');
const { JDateRepository } = require('@behaver/jdate');

let jdr = new JDateRepository(2446896);
let pluto = PlutoHECC(jdr);

// 获取冥王星 J2000 日心黄道 x 坐标
let x = pluto.x;

// 获取冥王星 J2000 日心黄道 y 坐标
let y = pluto.y;

// 获取冥王星 J2000 日心黄道 z 坐标
let z = pluto.z;

// 获取冥王星 J2000 直角坐标
let rc = pluto.rc;
```

## API

`constructor(jdate)`

构造函数

* jdate 参照儒略时间

`get x()`

获取 冥王星 J2000 日心黄道坐标 x 值

`get y()`

获取 冥王星 J2000 日心黄道坐标 y 值

`get z()`

获取 冥王星 J2000 日心黄道坐标 z 值

`get rc()`

获取 冥王星 J2000 日心黄道球坐标

`get obTime()`

获取观测儒略时间

`set obTime(jdr)`

设定观测儒略时间

* jdr 儒略时间对象

## 许可证书

The MIT license.