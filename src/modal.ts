export const showModal = (opts: {
  duration?: number
  appearance?: Phoenix.ModalProperties['appearance']
  icon?: Phoenix.ModalProperties['icon']
  text: Phoenix.ModalProperties['text']
  frame?: Rectangle
}) => {
  const duration = opts.duration ?? 0.8
  Modal.build({
    duration: duration === 0 ? undefined : duration,
    origin(modalRect) {
      if (opts.frame) {
        const frame = opts.frame
        return {
          x: frame.x + frame.width / 2,
          y: frame.y + frame.height / 2,
        }
      }

      // 主屏幕指的是当前激活的屏幕，例如激活的窗口所在的屏幕，并不表示内置的显示器
      const mainScreen = Screen.main()
      const screenFrame = mainScreen?.frame()
      if (screenFrame) {
        return {
          x: screenFrame.x + screenFrame.width / 2 - modalRect.width / 2,
          y: screenFrame.y + screenFrame.height / 2 - modalRect.height / 2,
        }
      }
      return { x: 0, y: 0 }
    },
    appearance: 'light',
    icon: App.get('Phoenix')?.icon(),
    text: opts.text,
  }).show()
}
