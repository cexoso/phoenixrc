// 定义布局单位
const LEFT_HALF = { x: 0, y: 0, width: 0.5, height: 1 }
const RIGHT_HALF = { x: 0.5, y: 0, width: 0.5, height: 1 }
const TOP_HALF = { x: 0, y: 0, width: 1, height: 0.5 }
const BOTTOM_HALF = { x: 0, y: 0.5, width: 1, height: 0.5 }

// 辅助函数：移动窗口到指定位置
function moveWindowToUnit(
  win: Window | undefined,
  unit: { x: number; y: number; width: number; height: number }
) {
  if (!win) return

  const screen = win.screen().flippedVisibleFrame()
  win.setFrame({
    x: screen.x + screen.width * unit.x,
    y: screen.y + screen.height * unit.y,
    width: screen.width * unit.width,
    height: screen.height * unit.height,
  })
}

// 左半屏
Key.on('left', ['command', 'alt'], () => {
  const win = Window.focused()
  moveWindowToUnit(win, LEFT_HALF)
})

// 右半屏
Key.on('right', ['command', 'alt'], () => {
  const win = Window.focused()
  moveWindowToUnit(win, RIGHT_HALF)
})

// 上半屏
Key.on('up', ['command', 'alt'], () => {
  const win = Window.focused()
  moveWindowToUnit(win, TOP_HALF)
})

// 下半屏
Key.on('down', ['command', 'alt'], () => {
  const win = Window.focused()
  moveWindowToUnit(win, BOTTOM_HALF)
})

Key.on('f', ['command', 'alt'], () => {
  const current = Window.focused()
  if (current) {
    const screen = current.screen()
    const frame = screen.flippedVisibleFrame()
    current.setFrame({
      x: frame.x,
      y: frame.y,
      width: frame.width,
      height: frame.height,
    })
  }
})

// 我的三块屏幕的设备 id
const screenOrders = [
  '37D8832A-2D66-02CA-B9F7-8F30A301B230',
  'D06B1E2C-0A4C-416D-A9B1-FCA46111F154',
  'CF26C7C3-BADD-4C0A-8E4A-B497DBC652E9',
]

// 获取当前聚集的应用的上一块屏幕
function setFocusedScreen(isPre: boolean) {
  const window = Window.focused()
  if (!window) return
  const screen = window.screen()
  const current = screen.identifier()
  const index = screenOrders.findIndex((id) => id === current)
  function getValidIndex(index: number) {
    if (index >= screenOrders.length) {
      return 0
    }
    if (index < 0) {
      return screenOrders.length - 1
    }
    return index
  }

  function getScreenByIndex(index: number) {
    return Screen.all().find((s) => s.identifier() === screenOrders[getValidIndex(index)])
  }
  if (index === -1) {
    return setScreen(window, getScreenByIndex(0))
  }
  return setScreen(window, getScreenByIndex(index + (isPre ? -1 : 1)))
}

function setScreen(window: Window, screen: Screen | undefined) {
  if (screen && window) {
    window.setFrame(screen.flippedVisibleFrame())
  }
}

Key.on('left', ['command', 'alt', 'control'], () => {
  setFocusedScreen(false)
})

Key.on('right', ['command', 'alt', 'control'], () => {
  setFocusedScreen(true)
})
