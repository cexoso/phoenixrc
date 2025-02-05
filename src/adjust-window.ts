// 定义调整步长和调整间隔
const STEP = 20

// 定义计时器变量
let leftTimer: Parameters<typeof clearInterval>[0] = undefined

// 获取窗口在屏幕中的相对位置
function getWindowPosition(window: Window) {
  const frame = window.frame()
  const screen = window.screen().flippedVisibleFrame()
  const centerX = frame.x + frame.width / 2
  const screenCenterX = screen.x + screen.width / 2

  return centerX < screenCenterX ? 'left' : 'right'
}

function adjustWindowWidth(forward: 'left' | 'right') {
  const win = Window.focused()
  if (!win) return
  const frame = win.frame()
  const screen = win.screen().flippedVisibleFrame()

  const frameCenterX = frame.x + frame.width / 2
  const screenCenterX = screen.x + screen.width / 2

  const deta = 20
  const minWidth = 50

  if (forward === 'left') {
    // 左移
    if (frame.x === screen.x || frameCenterX < screenCenterX) {
      const destWidth = Math.max(frame.width - deta, minWidth)
      const realDeta = frame.width - destWidth
      frame.width -= realDeta
      // 动右边
    } else {
      // 动左边
      const destX = Math.max(frame.x - deta, screen.x)
      const realX = frame.x - destX
      frame.x -= realX
      frame.width += realX
    }
  } else {
    // 右移
    if ((frame.x === screen.x && frame.width === screen.width) || frameCenterX >= screenCenterX) {
      const maxRight = Math.min(frame.x + frame.width, screen.width)
      // 动左边
      const destX = Math.min(frame.x + deta, maxRight - minWidth, screen.x + screen.width)
      const realX = destX - frame.x
      frame.x += realX
      frame.width -= realX
    } else {
      // 动右边
      const destWidth = Math.min(frame.width + deta, screen.width)
      const realDeta = destWidth - frame.width
      frame.width += realDeta
    }
  }

  win.setFrame(frame)
}

// 绑定快捷键
Key.on('left', ['alt', 'shift'], () => {
  adjustWindowWidth('left')
})

// 绑定快捷键
Key.on('right', ['alt', 'shift'], () => {
  adjustWindowWidth('right')
})
