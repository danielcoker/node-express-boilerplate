import Joi from 'joi';

const commonSchema = {
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .trim(true)
    .prefs({ abortEarly: true })
    .message({
      'string.min': 'Password must be at least 6 characters long.',
    })
    .required(),
};

// Schema to validate register inputs.
export const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: commonSchema.email,
  password: commonSchema.password,
});

// Schema to validate login inputs.
export const loginSchema = Joi.object({
  email: commonSchema.email,
  password: commonSchema.password,
});
