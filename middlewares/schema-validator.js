import {
  isEmpty,
  isBoolean,
  includes,
  has,
  get,
  map
} from 'lodash';
import Joi from 'joi';

import Schemas from '../schemas';

const SchemaValidator = (useJoiError = false) => {
  const _useJoiError = isBoolean(useJoiError) && useJoiError;

  const _supportedMethods = ['post', 'put', 'get', 'delete', 'patch'];

  const _validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  };

  return (req, res, next) => {
    const route = req.route.path;
    const method = req.method.toLowerCase();
    if (includes(_supportedMethods, method) && has(Schemas, route)) {
      const _schema = get(Schemas, route);

      if (_schema) {
        const {
          value,
          error
        } = Joi.compile(_schema).validate(!isEmpty(req.body)
          ? req.body : req.query, _validationOptions);

        if (error) {
          const JoiError = {
            status: 'failed',
            error: {
              original: error._object,
              details: map(error.details, ({ message, type }) => ({
                message: message.replace(/['"]/g, ''),
                type
              }))
            }
          };

          const CustomError = {
            status: 'failed',
            error: 'Invalid request data. Please review request and try again.'
          };

          return res.status(400).json(_useJoiError ? JoiError : CustomError);
        }

        if (!isEmpty(req.body)) {
          req.body = value;
        } else {
          req.query = value;
        }

        return next();
      }
    }
    return next();
  };
};

export default SchemaValidator;
