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

// 获取当前聚集的应用的上一块屏幕
function getFocusedScreen(isPre: boolean) {
  const window = Window.focused()
  if (!window) return
  const screen = window.screen()
  if (isPre) {
    return { window, screen: screen.previous() }
  }
  return { window, screen: screen.next() }
}

Key.on('left', ['command', 'alt', 'control'], () => {
  const result = getFocusedScreen(true)
  if (!result) {
    return
  }
  const { screen, window } = result
  window.setFrame(screen.flippedVisibleFrame())
})

Key.on('right', ['command', 'alt', 'control'], () => {
  const result = getFocusedScreen(false)
  if (!result) {
    return
  }
  const { screen, window } = result
  window.setFrame(screen.flippedVisibleFrame())
})
