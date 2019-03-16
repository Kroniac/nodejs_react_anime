export const ErrorMessages = {
  NO_NETWORK_MESSAGE: 'No Network',
  LOGIN_NETWORKERROR_MESSAGE: 'Network error. Unable to log in.',
  COMPANYNAME_NETWORKERROR_MESSAGE: 'Network Error. Unable To Retrieve Comapny Name and User Names',
  LOGINFAIL_MESSAGE: 'Username and Password Unmatched. Attempts left before password reset: ',
  RESETPASSWORD_MESSAGE: 'Login Trial Limit Reached. Please call support center at ',
  NETWORK_ERROR: 'Network error',
  REQUEST_ERRORED: 'Request errored.',
  GET_GCM_ERROR: 'GCM Token unavailable. Please check network. App will close',
  NETWORK_ERROR_RESTART: 'Please check network and restart app.',
  EXACTLY_10_DIGITS: 'exactly 10 digits',
  EXACTLY_10_LETTERS: 'exactly 10 letters',
  EXACTLY_10_LETTERS_OR_NUMBERS: 'exactly 10 letters or numbers',
  AT_LEAST_2_LETTERS: 'at least 2 letters',
  INCORRECT_EMAIL_ADDRESS: 'incorrect email address',
  ONLY_ALPHANUMERIC: 'exactly 15 letters and numbers with no symbol',
  ALPHANUMERIC_ONLY: 'numbers and letters only',
  PERCENTAGE: 'invalid',
  AT_LEAST_3_LETTERS: 'at least 3 letters',
  ZIPCODE: 'exactly 6 digits',
  NUMBERS_ONLY: 'numbers only',
  END_OF_PAGE: 'End Of Page',
  EXACTLY_10_NUMBERS: 'exactly 10 numbers',
  10000: 'Push notification timed out.',
  20000: 'No network. Please turn on network.',
  30000: 'Network error.',
  40000: 'No phone service.',
};

export const ErrorTypes = {
  GCM_REGID_TIMEOUT: 10000,
  NONET: 20000,
  NETWORK: 30000,
  GSM_NO_SERVICE: 40000,
  INTERNAL_ERROR: 50000,
  END_OF_PAGE: 70000,
};

export const ServerErrors = {
  duplicateUsername: 'Username already exists',
  duplicatePlateNumber: 'vehicle with this plate number already exists.',
};
