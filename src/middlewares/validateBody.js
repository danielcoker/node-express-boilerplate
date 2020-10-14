import { ValidationError } from '../libs/errors';
import { joiValidate } from '../libs/joiValidation';
import * as schemas from '../resources/common/schemas';

/**
 * Validate incoming inputs from request body using Joi.
 * @param {String} schemaCollection Collection of all schema related to a resource.
 * @param {String} schemaName Name of schema to validate.
 */
const validateBody = (schemaCollection, schemaName) => (req, res, next) => {
  const controllerSchemaFunc = schemas[schemaCollection][schemaName];

  const requestData = joiValidate(controllerSchemaFunc, req.body);

  if (requestData.error) {
    throw new ValidationError(requestData.error);
  }

  Object.assign(req.body, requestData);

  next();
};

export default validateBody;
