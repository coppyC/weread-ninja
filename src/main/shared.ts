export const DefaultConf = Object.seal({
  PinTop: false,
  RemberSize: false,
  RemberPosition: false,
})

export type IConf = typeof DefaultConf

/**
 * 客户端向 electron 发送的指令集
 * 前缀 CURD 分别代表 create read update delete
 */
export const CCMD = new class {
  RConf
  UPinTop
  URemberSize
  URemberPosition

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
