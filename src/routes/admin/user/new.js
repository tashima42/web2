import Joi from "joi"
import { userRepository } from "../../../repositories/index.js"
import { cryptoHelper } from "../../../helpers/index.js"

export async function adminUserNewRoute(req, res) {
  try {
    const { email, password, name, role } = req.body

    const foundUser = await userRepository.findByEmail(email)
    if (foundUser) {
      return res.status(400).json({ success: false, error: { code: "CREATE-USER-EMAIL-ALREADY-EXISTS", message: "There already is a user with this email" } })
    }

    const hashedPassword = await cryptoHelper.hashBcrypt(password)

    const user = await userRepository.insert({ email, password: hashedPassword, name, role })

    return res.status(200).json({ success: true, user })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, error: { code: "INTERNAL-SERVER-ERROR", message: error } })
  }
}

export const adminUserNewSchema = Joi.object().keys({
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
  name: Joi
    .string()
    .min(2)
    .max(1000)
    .required(),
  role: Joi
    .string()
    .valid('admin', 'user')
    .required(),
})