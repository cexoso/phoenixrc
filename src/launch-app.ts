// TODO: 在激活的应用前展示一个图标，否则我很难关注到被同一个应用不同窗口到底谁被激活了
let lastWindow: Window | undefined = undefined
let timerHandler: number | undefined = undefined

function getNextWindow(windows: Window[]): Window | undefined {
  const lastWindows = windows.findIndex((w) => lastWindow !== undefined && w.isEqual(lastWindow))
  if (windows.length === 0) {
    return undefined
  }
  if (lastWindows === -1) {
    return windows[0]
  }

  const next = lastWindows + 1
  if (next >= windows.length) {
    return windows[0]
  }

  return windows[next]
}

// appName 是应用在 macOS 上的名称，可以使用 ls /Applications 来查看目前 mac 上存在的应用
// 你会看到类型 Google Chrome.app 格式的目录名，如果你希望唤起这个应用, 可以使用
// focusOrLaunch("Google Chrome")
function focusOrLaunch(appNameOrBundleId: string) {
  const app = App.get(appNameOrBundleId)
  if (app) {
    if (timerHandler) {
      Timer.off(timerHandler)
    }
    const windows = app?.windows()
    const window = getNextWindow(windows)

    if (window === undefined) {
      // 存在应用被打开又没有窗口的场景，这种场景需要使用 app.focus 来唤起应用
      app.focus()
      return
    }
    lastWindow = window

    timerHandler = Timer.after(2, () => {
      lastWindow = undefined
    })

    window.focus()
  } else {
    App.launch(appNameOrBundleId, { focus: true })
  }
}

Key.on('i', ['command'], () => {
  focusOrLaunch('Ghostty')
})

Key.on('i', ['alt'], () => {
  focusOrLaunch('Alacritty')
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
  focusOrLaunch('Code')
})

Key.on('u', ['alt'], () => {
  focusOrLaunch('飞书会议')
})

Key.on('l', ['command', 'shift'], () => {
  Phoenix.reload()
})
