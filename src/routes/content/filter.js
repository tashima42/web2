import Joi from "joi"
import { contentRepository } from "../../repositories/index.js"

export async function contentFilterRoute(req, res) {
  try {
    const { ingredient, maxPrice } = req.body

    const content = await contentRepository.filter({ ingredient, maxPrice })

    const sortedContents = sortByLikeDislikeRatio(content)

    return res.status(200).json({ success: true, content: sortedContents })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, error: { code: "INTERNAL-SERVER-ERROR", message: error } })
  }
}

function sortByLikeDislikeRatio(contents) {
  contents.sort((a, b) => calcRatio(b) - calcRatio(a))
  return contents

  function calcRatio({ likes, dislikes }) {
    return likes - dislikes
  }
}

export const contentFilterSchema = Joi.object().keys({
  ingredient: Joi
    .string()
    .max(1000)
    .min(1),
  maxPrice: Joi
    .number()
    .min(0),
})