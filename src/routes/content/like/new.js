import Joi from "joi"
import { contentRepository } from "../../../repositories/index.js"

export async function contentLikeNewRoute(req, res) {
  try {
    const { id } = req.params

    await contentRepository.addLike({ id })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, error: { code: "INTERNAL-SERVER-ERROR", message: error } })
  }
}

export const contentLikeNewSchema = Joi.object().keys({
  id: Joi
    .string()
    .max(140)
    .min(10)
    .required(),
})