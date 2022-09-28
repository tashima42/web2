import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import "dotenv/config"
import { jwtHelper } from "./helpers/index.js"


/*
import path, { dirname } from "path"
import { fileURLToPath } from 'url';
*/


import { connectDb } from "./repositories/index.js"

import { authLoginRoute } from "./routes/auth/login.js"
import { adminUserNewRoute } from "./routes/admin/user/new.js"
import { adminUserUpdateRoute } from "./routes/admin/user/update.js"
import { adminUserFindRoute } from "./routes/admin/user/find.js"
import { adminUserRemoveRoute } from "./routes/admin/user/remove.js"
/*
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
*/

const app = express()
const port = process.env.PORT || 3895

app.use(cors({ origin: "*" }))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

// routes
//app.get("/auth/authorize", (_, res) => res.sendFile(path.join(__dirname, "../public/authorize.html")))
app.post("/auth/login", authLoginRoute)

app.post("/admin/user", (req, res, next) => authenticateMiddleware(req, res, next, true), adminUserNewRoute)
app.put("/admin/user", (req, res, next) => authenticateMiddleware(req, res, next, true), adminUserUpdateRoute)
app.get("/admin/user", (req, res, next) => authenticateMiddleware(req, res, next, true), adminUserFindRoute)
app.get("/admin/user/:id", (req, res, next) => authenticateMiddleware(req, res, next, true), adminUserFindRoute)
app.delete("/admin/user/:id", (req, res, next) => authenticateMiddleware(req, res, next, true), adminUserRemoveRoute)

const user = process.env.DB_USER
const pass = process.env.DB_USER_PWD
const host = process.env.DB_HOST

connectDb(user, pass, host).then(() => {
  app.listen(port, () => console.info("app listening on port " + port))
})

function authenticateMiddleware(req, res, next, admin) {
  const { session } = req.cookies
  const jwt = jwtHelper.verify(session)
  if (jwt && jwt.data && jwt.data.user) {
    res.locals.user = jwt.data.user
  }
  if (admin === true) {
    if (res.locals.user.role != "admin") {
      return res.status(403).json({ success: false, error: { code: "FORBIDDEN", message: "Only admins can perform this action" } })
    }
  }
  next()
}
