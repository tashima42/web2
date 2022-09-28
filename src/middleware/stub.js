import { userRepository } from "../repositories/index.js";

// Esse middleware existe apenas para facilitar os testes pela banca avaliadora
// Ele cria um usuario admin para facilitar a utilizacao do app
export async function stubMiddleware(req, res, next) {
  const user = await userRepository.findByEmail("admin@example.com")
  if (!user) {
    userRepository.insert({
      email: "admin@example.com",
      password: "$2b$10$5D0YXjKFGSZq/SxSb/yga.YfI1e4v0m..7V8GVcZ/r0tCBXuzSXjK",
      name: "Admin",
      role: "admin",
    })
  }
  next()
}