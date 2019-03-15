export const Scenes = {
  Home: () => require('../scenes/home/home').default,
  AnimeCharacters: () => require('../scenes/anime_characters/anime_characters').default,
}

export const SharedUI = {
  Button: () => require('../shared_ui/button/button'),
  Modal: () => require('../shared_ui/modal/modal'),
  Backdrop: () => require('../shared_ui/backdrop/backdrop'),
  TextInput: () => require('../shared_ui/text_input/text_input'),
}

export const Libs = {
  Utils: () => require('../libs/utils'),
}