import { contentRepository } from "../../repositories/index.js"

export async function contentNewRoute(req, res) {
  try {
    const { name, description, ingredients, price, image } = req.body

    const { user } = res.locals

    const content = await contentRepository.insert({ name, description, ingredients, price, image, user: user._id })

    return res.status(200).json({ success: true, content })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, error: { code: "INTERNAL-SERVER-ERROR", message: error } })
  }
}
