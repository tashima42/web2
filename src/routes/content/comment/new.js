import { contentRepository } from "../../../repositories/index.js"

export async function contentCommentNewRoute(req, res) {
  try {
    const { id } = req.params
    const { comment } = req.body

    await contentRepository.addComment({ comment, id })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, error: { code: "INTERNAL-SERVER-ERROR", message: error } })
  }
}
