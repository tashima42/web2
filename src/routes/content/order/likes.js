import { contentRepository } from "../../../repositories/index.js"

export async function contentOrderLikesRoute(req, res) {
  try {
    const content = await contentRepository.getMostLiked()

    return res.status(200).json({ success: true, content })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, error: { code: "INTERNAL-SERVER-ERROR", message: error } })
  }
}
