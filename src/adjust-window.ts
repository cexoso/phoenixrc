function adjustWindowWidth(forward: 'left' | 'right') {
  const win = Window.focused()
  if (!win) return
  const frame = win.frame()
  const screen = win.screen().flippedVisibleFrame()

  const frameCenterX = frame.x + frame.width / 2
  const screenCenterX = screen.x + screen.width / 2

  const deta = Math.floor(screen.width / 20)
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

function adjustWindowHeight(forward: 'up' | 'down') {
  const win = Window.focused()
  if (!win) return
  const frame = win.frame()
  const screen = win.screen().flippedVisibleFrame()

  const frameCenterY = frame.y + frame.height / 2
  const screenCenterY = screen.y + screen.height / 2

  const deta = Math.floor(screen.height / 20)
  const minHeight = 50

  if (forward === 'up') {
    // 左移
    if (frame.y === screen.y || frameCenterY < screenCenterY) {
      const destHeight = Math.max(frame.height - deta, minHeight)
      const realDeta = frame.height - destHeight
      frame.height -= realDeta
      // 动右边
    } else {
      // 动左边
      const destY = Math.max(frame.y - deta, screen.y)
      const realY = frame.y - destY
      frame.y -= realY
      frame.height += realY
    }
  } else {
    // 右移
    if ((frame.y === screen.y && frame.height === screen.height) || frameCenterY >= screenCenterY) {
      const macDown = Math.min(frame.y + frame.height, screen.height)
      // 动左边
      const destY = Math.min(frame.y + deta, macDown - minHeight, screen.y + screen.height)
      const realY = destY - frame.y
      frame.y += realY
      frame.height -= realY
    } else {
      // 动右边
      const destHeight = Math.min(frame.height + deta, screen.height)
      const realDeta = destHeight - frame.height
      frame.height += realDeta
    }
  }

  win.setFrame(frame)
}

Key.on('left', ['alt', 'shift'], () => {
  adjustWindowWidth('left')
})

Key.on('right', ['alt', 'shift'], () => {
  adjustWindowWidth('right')
})

Key.on('up', ['alt', 'shift'], () => {
  adjustWindowHeight('up')
})

Key.on('down', ['alt', 'shift'], () => {
  adjustWindowHeight('down')
})
