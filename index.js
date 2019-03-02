'use strict';

const DataX = require('./data/x');
const DataY = require('./data/y');
const DataZ = require('./data/z');
const { JDateRepository, CacheSpaceOnJDate } = require('@behaver/jdate');
const { RectangularCoordinate3D } = require('@behaver/coordinate/3d');

/**
 * 冥王星 J2000 日心黄经坐标计算组件
 *
 * 计算的有效时间范围为：
 * 
 * 从 -2998/04/23，JDE 626150.5
 * 至 2984/07/26，JDE 2811150.5
 *
 * 计算精度：
 *
 * 相较于 DE406 的最大误差：0.00005 AU
 * 日冥距离最小时，且地球在太阳和冥王星中间时，精度最差。
 * 冥王星的近日点为29.65 AU，所以地冥的最小距离为28.65 AU。
 * 已知的最大误差0.00005 AU，等效于 arctan(0.00005/28.65) 弧度，即 0.37 角秒。
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class Pluto99HECC {

  /**
   * 构造函数
   * 
   * @param {JDateRepository} jdate 参照儒略时间
   */
  constructor(jdate) {
    let self = this;
    
    this.private = {};
    this.private.jdate = jdate;
    this.cache = new CacheSpaceOnJDate(jdate);

    // 计算中间量 X 的私有函数
    this.private.X = function() {
      if (!self.cache.has('X')) {
        let X = -1 + 2 * (self.private.jdate.JDE - 626150.5) / 2185000;
        self.cache.set('X', X);
      }

      return self.cache.get('X');
    };

    // Pluto99 数据计算函数
    this.private.calc = function(serie) {

      // 参数检验
      if (!(serie instanceof Array)) throw Error('The param serie should be an Array.');

      let t = self.private.jdate.JDEC;
      let X = self.private.X(),
          XMap = [ 1, X, X * X ];
      let serie_r = 0;
      for (var i = 0; i < serie.length; i++) { // table
        let table_r = 0;
        for (var j = 0; j < serie[i].length; j++) { // item
          table_r += serie[i][j][0] * Math.sin(serie[i][j][1] * t + serie[i][j][2]);
        }
        serie_r += table_r * XMap[i];
      }

      return serie_r;
    };
  }

  /**
   * 获取 冥王星 J2000 日心黄道坐标 x 值
   * 
   * @return {Number} 冥王星 J2000 黄道日心坐标 x 值
   */
  get x() {
    if (!this.cache.has('x')) {
      let x = this.private.calc(DataX) + 9.922274 + 0.154154 * this.private.X();
      this.cache.set('x', x);
    }

    return this.cache.get('x');
  }

  /**
   * 获取 冥王星 J2000 日心黄道坐标 y 值
   * 
   * @return {Number} 冥王星 J2000 黄道日心坐标 y 值
   */
  get y() {
    if (!this.cache.has('y')) {
      let y = this.private.calc(DataY) + 10.016090 + 0.064073 * this.private.X();
      this.cache.set('y', y);
    }

    return this.cache.get('y');
  }

  /**
   * 获取 冥王星 J2000 日心黄道坐标 z 值
   * 
   * @return {Number} 冥王星 J2000 黄道日心坐标 z 值
   */
  get z() {
    if (!this.cache.has('z')) {
      let z = this.private.calc(DataZ) - 3.947474 - 0.042746 * this.private.X();
      this.cache.set('z', z);
    }

    return this.cache.get('z');
  }

  /**
   * 获取 冥王星 J2000 日心黄道球坐标
   * 
   * @return {RectangularCoordinate3D} 冥王星 J2000 日心黄道直角坐标
   */
  get rc() {
    return new RectangularCoordinate3D(this.x, this.y, this.z);
  }

  /**
   * 设定观测儒略时间
   * 
   * @param {JDateRepository} jdr 观测儒略时间
   */
  set obTime(jdr) {
    if (!(jdr instanceof JDateRepository)) throw Error('The param jdr should be a instance of JDateRepository.');

    this.cache.on(jdr);
    this.private.jdate = jdr;
  }

  /**
   * 获取观测儒略时间
   * 
   * @return {JDateRepository} 观测儒略时间
   */
  get obTime() {
    return this.private.jdate;
  }
}

module.exports = Pluto99HECC;
