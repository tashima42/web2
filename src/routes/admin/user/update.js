import Joi from "joi"
import { userRepository } from "../../../repositories/index.js"
import { cryptoHelper } from "../../../helpers/index.js"

export async function adminUserUpdateRoute(req, res) {
  try {
    const { email, password, name, role } = req.body

    const foundUser = await userRepository.findByEmail(email)
    if (!foundUser) {
      return res.status(404).json({ success: false, error: { code: "UPDATE-USER-NOT-FOUND", message: "User not found" } })
    }

    const hashedPassword = await cryptoHelper.hashBcrypt(password)

    await userRepository.update({ id: foundUser._id, email, password: hashedPassword, name, role })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, error: { code: "INTERNAL-SERVER-ERROR", message: error } })
  }
}

export const adminUserUpdateSchema = Joi.object().keys({
  email: Joi
    .string()
    .email(),
  password: Joi
    .string()
    .min(5)
    .max(140)
    .regex(/[a-z]/, 'lower-case')
    .regex(/[0-9]/, 'number'),
  name: Joi
    .string()
    .min(2)
    .max(1000),
})