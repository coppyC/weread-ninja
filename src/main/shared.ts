export interface IConf {
  PinTop: boolean
  RemberSize: boolean
}

/**
 * 客户端向 electron 发送的指令集
 * 前缀 CURD 分别代表 create read update delete
 */
export const CCMD = new class {
  RConf
  UPinTop
  URemberSize

  constructor() {
    Object.keys(this).forEach(k => this[k] = k)
  }
}

/**
 * electron 向客户端发送的指令集
 * 前缀 CURD 分别代表 create read update delete
 */
export const SCMD = new class {
  UConf

  constructor() {
    Object.keys(this).forEach(k => this[k] = k)
  }
}
