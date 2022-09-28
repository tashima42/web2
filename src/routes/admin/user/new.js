import { userRepository } from "../../../repositories/index.js"
import { cryptoHelper } from "../../../helpers/index.js"

export async function adminUserNewRoute(req, res) {
  try {
    const { email, password, name, role } = req.body

    const foundUser = await userRepository.findByEmail(email)
    if (foundUser) {
      return res.status(400).json({ success: false, error: { code: "CREATE-USER-EMAIL-ALREADY-EXISTS", message: "There already is a user with this email" } })
    }

    const hashedPassword = await cryptoHelper.hashBcrypt(password)

    const user = await userRepository.insert({ email, password: hashedPassword, name, role })

    delete user.password

    return res.status(200).json({ success: true, user })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, error: { code: "INTERNAL-SERVER-ERROR", message: error } })
  }
}
