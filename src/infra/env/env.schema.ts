import * as Joi from 'joi';

export const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production'),
  PORT: Joi.number(),
  APP_PREFIX: Joi.string(),
  ALLOWED_ORIGIN: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  REDIS_PASSWORD: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  DOMAIN: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CALLBACK_URL: Joi.string().required(),
  CLIENT_ORIGIN: Joi.string().required(),
});
