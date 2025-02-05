// appName 是应用在 macOS 上的名称，可以使用 ls /Applications 来查看目前 mac 上存在的应用
// 你会看到类型 Google Chrome.app 格式的目录名，如果你希望唤起这个应用, 可以使用
// focusOrLaunch("Google Chrome")
function focusOrLaunch(appNameOrBundleId: string) {
  const app = App.get(appNameOrBundleId)
  if (app) {
    app.focus()
  } else {
    App.launch(appNameOrBundleId, { focus: true })
  }
}

Key.on('i', ['command'], () => {
  focusOrLaunch('Alacritty')
})

Key.on('i', ['alt'], () => {
  focusOrLaunch('Ghostty')
})

Key.on('r', ['alt'], () => {
  focusOrLaunch('Arc')
})

Key.on('g', ['alt'], () => {
  focusOrLaunch('Google Chrome')
})

Key.on('f', ['alt'], () => {
  focusOrLaunch('Lark')
})

Key.on('a', ['alt'], () => {
  focusOrLaunch('WeChat')
})

Key.on('d', ['alt'], () => {
  focusOrLaunch('Doubao')
})

Key.on('w', ['alt'], () => {
  focusOrLaunch('Figma')
})

Key.on('m', ['alt'], () => {
  focusOrLaunch('Simulator')
})

Key.on('v', ['alt'], () => {
  focusOrLaunch('com.microsoft.VSCode')
})

Key.on('u', ['alt'], () => {
  focusOrLaunch('飞书会议')
})

Key.on('l', ['command', 'shift'], () => {
  Phoenix.reload()
})

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
  Phoenix.notify('No active window')
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

// Key.on('l', ['command'], () => {
//   App.all().forEach((app) => {
//     console.log(`${app.name()}: ${app.bundleIdentifier()}`)
//   })
// })

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
    // mac 是从右向左数的，但是我习惯从左向右数
    return { window, screen: screen.next() }
  }
  return { window, screen: screen.previous() }
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

Modal.build({
  duration: 0.8,
  weight: 48,
  appearance: 'light',
  icon: App.get('Phoenix')?.icon(),
  text: 'hello Phoenix!',
}).show()
