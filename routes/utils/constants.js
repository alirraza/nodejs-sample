const API_ENDPOINTS = {
  AUTH: {
    INDEX: '/auth',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password'
  }
};

const HTTP_CODES = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT_ERROR: 409,
  INTERNAL_SERVER_ERROR: 500
};

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const PASSWORD_PATTERN_ERROR = {
  'string.pattern.base':
    'Password must be at least 8 characters and contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character.'
};

const STRING_REQUIRED_ERROR = {
  'string.empty': '{{#label}} cannot be an empty field',
  'string.required': '{{#label}} is a required field',
  'string.base': '{{#label}} is not valid'
};

const NUMBER_REQUIRED_ERROR = {
  'number.empty': '{{#label}} cannot be an empty field',
  'number.required': '{{#label}} is a required field',
  'number.base': '{{#label}} must be a number'
};

const OBJECT_REQUIRED_ERROR = {
  'object.missing': '{{#label}} cannot be missing',
  'object.base': '{{#label}} is not valid'
};


export {
  API_ENDPOINTS,
  HTTP_CODES,
  NUMBER_REQUIRED_ERROR,
  OBJECT_REQUIRED_ERROR,
  PASSWORD_PATTERN,
  PASSWORD_PATTERN_ERROR,
  STRING_REQUIRED_ERROR
};
