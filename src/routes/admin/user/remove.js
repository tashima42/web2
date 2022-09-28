import Joi from "joi"
import { userRepository } from "../../../repositories/index.js"

export async function adminUserRemoveRoute(req, res) {
  try {
    const { id } = req.params

    const foundUser = await userRepository.findById(id)
    if (!foundUser) {
      return res.status(404).json({ success: false, error: { code: "REMOVE-USER-NOT-FOUND", message: "User not found" } })
    }

    await userRepository.remove(id)

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, error: { code: "INTERNAL-SERVER-ERROR", message: error } })
  }
}

export const adminUserRemoveSchema = Joi.object().keys({
  id: Joi
    .string()
    .max(140)
    .min(10)
    .required(),
})