import Joi from "joi"
import { userRepository } from "../../repositories/index.js"
import { cryptoHelper, jwtHelper } from "../../helpers/index.js"

export async function authLoginRoute(req, res) {
  try {
  const { email, password } = req.body

  const user = await userRepository.findByEmail(email)
  if (!user) {
    return res.status(404).json({ success: false, error: { code: "LOGIN-INVALID-EMAIL", message: "Invalid email"}})
  }

  const comparePassword = await cryptoHelper.compareBcrypt(password, user.password)
  if (!comparePassword) {
    return res.status(401).json({ success: false, error: { code: "LOGIN-INVALID-PASSWORD", message: "Invalid password"}})
  }

  const jwt = jwtHelper.sign({ user })
  res.cookie("session", jwt, { httpOnly: true, expires: new Date(Date.now() + (60 * 60 * 24)) })
  return res.status(200).json({ success: true, user })
  } catch (error) {
    console.error(error)  
    return res.status(500).json({ success: false, error: { code: "INTERNAL-SERVER-ERROR", message: error}})
  }
}

export const authLoginSchema = Joi.object().keys({
  email: Joi
    .string()
    .email()
    .required(),
  password: Joi
    .string()
    .min(5)
    .max(140)
    .regex(/[a-z]/, 'lower-case')
    .regex(/[0-9]/, 'number')
    .required(),
})