import './adjust-window'
import './launch-app'
import './move-window'
import { showModal } from './modal'

showModal({
  text: 'hello Phoenix!',
  icon: App.get('Phoenix')?.icon(),
})
