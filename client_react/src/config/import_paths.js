export const Scenes = {
  Home: () => require('../scenes/home/home').default,
  AnimeCharacters: () => require('../scenes/anime_characters/anime_characters').default,
}

export const SharedUI = {
  Button: () => require('../shared_ui/button/button'),
  Modal: () => require('../shared_ui/modal/modal'),
  Backdrop: () => require('../shared_ui/backdrop/backdrop'),
  TextInput: () => require('../shared_ui/text_input/text_input'),
  LoadingOverlay: () => require('../shared_ui/loading_overlay/loading_overlay'),
  SnackBar: () => require('../shared_ui/snackbar/snackbar'),
}

export const Config = {
  ApiUrls: () => require('./api_urls'),
  Errors: () => require('./error'),
}

export const Libs = {
  Networking: () => require('../libs/networking'),
  Utils: () => require('../libs/utils'),
}