/**
 * Format Joi validation errors.
 * @param {Object} JoiError Error object.
 * @returns {Object} Formatted error.
 */
export const formatJoiError = (JoiError) => {
  const { details } = JoiError;
  const error = {};

  details.forEach((detail) => {
    if (error[detail.context.label]) {
      error[detail.context.label].push(detail.message);
    } else {
      error[detail.context.label] = [detail.message];
    }
  });

  return error;
};

/**
 * Validate request data using Joi.
 * @param {Object} validationSchema Joi validation schema.
 * @param {Object} Data Request data to be validated.
 * @returns {Object} Validation messages if any.
 */
export const joiValidate = (validationSchema, data) => {
  const validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
    skipFunctions: true,
  };

  const result = validationSchema.validate(data, validationOptions);

  if (result.error) {
    const formattedError = formatJoiError(result.error);
    result.error = formattedError;
    return result;
  }

  return result.value;
};
