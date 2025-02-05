// Build and show a modal for half a second
// const modal = Modal.build({
//   duration: 0.5,
//   weight: 48,
//   appearance: 'dark',
//   icon: App.get('Phoenix').icon(),
//   text: 'Hello World!',
// }).show();
//
// Build and show a modal in the middle of the main screen
const screenFrame = Screen.main().flippedVisibleFrame();
const modal = Modal.build({
  text: 'Hello World!',
  origin: (frame) => ({
    x: screenFrame.width / 2 - frame.width / 2,
    y: screenFrame.height / 2 - frame.height / 2,
  }),
}).show();
//
// // Show an input modal in the middle of the main screen
// const screenFrame = Screen.main().flippedVisibleFrame();
// const modal = new Modal();
// modal.isInput = true;
// modal.appearance = 'light';
// modal.origin = {
//   x: screenFrame.width / 2 - modal.frame().width / 2,
//   y: screenFrame.height / 2 - modal.frame().height / 2,
// };
// modal.textDidChange = (value) => {
//   console.log('Text did change:', value);
// };
// modal.textDidCommit = (value, action) => {
//   console.log('Text did commit:', value, action);
// };
// modal.show();
//
