import { userRepository } from "../../repositories/index.js"
import { cryptoHelper } from "../../helpers/index.js"

export async function userUpdateRoute(req, res) {
  try {
    const { email, password, name } = req.body
    let pwd = undefined

    const { user } = res.locals

    const foundUser = await userRepository.findByEmail(email)
    if (!foundUser) {
      return res.status(404).json({ success: false, error: { code: "UPDATE-USER-NOT-FOUND", message: "User not found" } })
    }

    if (password) {
      pwd = await cryptoHelper.hashBcrypt(password)
    }

    await userRepository.update({ id: user._id, email, password: pwd, name })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, error: { code: "INTERNAL-SERVER-ERROR", message: error } })
  }
}
