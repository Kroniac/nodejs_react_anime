import  { Config } from '../config/import_paths';

const {
  ErrorMessages,
  ErrorTypes,
} = Config.Errors();

export const StandardNetErrorHandling = (
  err = {},
) => {
  if (err.type === ErrorTypes.NONET) {
    console.log( err.type );
  } else {
    let error = {};
    if (err.error) error = err.error.response;
    else error = err.response;
    console.log( err.type );
    if (error) {
      if (error.status === 400
        && error.data.non_field_errors
        && error.data.non_field_errors.length > 0) {
        const errorMessage = error.data.non_field_errors[0];
        console.log(
          `${ErrorMessages.REQUEST_ERRORED} ${errorMessage}`
        );
      } else {
        const errStatus = error.status;
        if (errStatus) {
          let errData = error.data;
          if (IsObject(errData)) {
            errData = JSON.stringify(errData);
          }
          console.log(
            `${ErrorMessages.NETWORK_ERROR} ${errStatus} - ${errData}`
          );
        } else {
          console.log(
            `${ErrorMessages.NETWORK_ERROR} ${errStatus}`
          );
        }
      }
    } else {
      console.log(ErrorMessages.NETWORK_ERROR);
    }
  }
};

export const GetNetErrorCode = (err = {}) => {
  if (err.error && err.error.response) {
    return err.error.response.status;
  }

  if (err.response) { // handle cases that don't have
    return err.response.status;
  }

  return null;
};

export const IsObject = value => (
  value && typeof value === 'object' && value.constructor === Object
);