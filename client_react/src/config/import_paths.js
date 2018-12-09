export const Scenes = {
  Feeds: () => require('../scenes/feeds/feeds').default,
}

export const SharedUI = {
  Button: () => require('../shared_ui/button/button'),
  Modal: () => require('../shared_ui/modal/modal'),
  Backdrop: () => require('../shared_ui/backdrop/backdrop'),
  TextInput: () => require('../shared_ui/text_input/text_input'),
}