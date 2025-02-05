import './adjust-window'
import './launch-app'
import './move-window'

Modal.build({
  duration: 0.8,
  weight: 48,
  appearance: 'light',
  icon: App.get('Phoenix')?.icon(),
  text: 'hello Phoenix!',
}).show()
