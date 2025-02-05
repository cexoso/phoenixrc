'use strict';

const screenFrame = Screen.main().flippedVisibleFrame();
Modal.build({
  text: "Hello World!",
  origin: (frame) => ({
    x: screenFrame.width / 2 - frame.width / 2,
    y: screenFrame.height / 2 - frame.height / 2
  })
}).show();
