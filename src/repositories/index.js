import mongoose from "mongoose"

import User from "./schemas/user.js"
import Content from "./schemas/content.js"

import { buildUserRepository } from "./user.js"
import { buildContentRepository} from "./content.js"

async function connectDb(user, pass, host) {
  const url = `mongodb://${host}`
  try {
    await mongoose.connect(url, {
      user: user,
      pass: pass,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: "majority",
    })
    console.info("Connected to db")
  } catch (error) {
    console.error(error)
  }
}

const userRepository = buildUserRepository({ User })
const contentRepository = buildContentRepository({ Content})

export {
  connectDb,
  userRepository,
  contentRepository,
}