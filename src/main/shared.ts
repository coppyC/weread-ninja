export const DefaultConf = Object.seal({
  PinTop: false,
  RemberSize: false,
  RemberPosition: false,
})

export type IConf = typeof DefaultConf

/**
 * 客户端向 electron 发送的指令集
 * 前缀 CURD 分别代表 create read update delete，X 代表无数据操作的 execute
 */
export const C2S = new class {
  /** 读取配置 */
  RConf
  /** 修改【置顶】 */
  UPinTop
  /** 修改【记住窗口大小】 */
  URemberSize
  /** 修改【记住窗口位置】 */
  URemberPosition
  /** 关闭帮助窗口 */
  XCloseHelpWindow
  /** 刷新页面 */
  XRefresh
  /** 返回 */
  XGoBack

  constructor() {
    Object.keys(this).forEach(k => this[k] = k)
  }
}

/**
 * electron 向客户端发送的指令集
 * 前缀 CURD 分别代表 create read update delete
 */
export const S2C = new class {
  RConf

  constructor() {
    Object.keys(this).forEach(k => this[k] = k)
  }
}
