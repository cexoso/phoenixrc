export const showModal = (opts: {
  duration?: number
  appearance?: Phoenix.ModalProperties['appearance']
  icon?: Phoenix.ModalProperties['icon']
  text: Phoenix.ModalProperties['text']
}) => {
  const duration = opts.duration ?? 0.8
  Modal.build({
    duration: duration === 0 ? undefined : duration,
    origin(modalRect) {
      const ss = Screen.all()
      const mainScreen = ss.find((s) => {
        const frame = s.flippedFrame()
        return frame.x === 0 && frame.y === 0
      })

      const frame = mainScreen?.flippedVisibleFrame()
      if (!frame) {
        return {
          x: 0,
          y: 0,
        }
      }
      return {
        x: frame.x + frame.width / 2 - modalRect.width / 2,
        y: frame.y + frame.height / 2 - modalRect.height / 2,
      }
    },
    appearance: 'light',
    icon: App.get('Phoenix')?.icon(),
    text: 'hello Phoenix!',
  }).show()
}
