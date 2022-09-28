import Joi from "joi"

export function joiMiddleware(schema, validateProperty) {
  return (req, res, next) => {
    try {
      Joi.assert(req[validateProperty], schema)
      next()
    } catch (error) {
      const {details} = error
      const message = details.map(i => i.message).join(',')
      res.status(400).send({success: false, error: { code: 'INVALID-PARAMS', message}})
    }
  }
}
