import Joi from "joi"
import { userRepository } from "../../../repositories/index.js"

export async function adminUserFindRoute(req, res) {
  try {
    const { id } = req.params
    let users = []

    if (id) {
      const foundUser = await userRepository.findById(id)
      if (!foundUser) {
        return res.status(404).json({ success: false, error: { code: "UPDATE-USER-NOT-FOUND", message: "User not found" } })
      }
      users.push(foundUser)
    } else {
      const foundUsers = await userRepository.findAll()
      users = [...users, ...foundUsers]
    }

    return res.status(200).json({ success: true, users })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, error: { code: "INTERNAL-SERVER-ERROR", message: error } })
  }
}

export const adminUserFindSchema = Joi.object().keys({
  id: Joi
    .string()
    .max(140)
    .min(10)
    .required(),
})