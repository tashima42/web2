import { contentRepository } from "../../repositories/index.js"

export async function contentFilterRoute(req, res) {
  try {
    const { ingredient, maxPrice } = req.body

    const content = await contentRepository.filter({ ingredient, maxPrice })

    return res.status(200).json({ success: true, content })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, error: { code: "INTERNAL-SERVER-ERROR", message: error } })
  }
}