import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import "dotenv/config"
import { joiMiddleware } from "./middleware/joi.js"
import { authenticateMiddlewareAdmin, authenticateMiddlewareAny } from "./middleware/authenticate.js"

import { connectDb } from "./repositories/index.js"

import { authLoginRoute, authLoginSchema } from "./routes/auth/login.js"
import { adminUserNewRoute, adminUserNewSchema } from "./routes/admin/user/new.js"
import { adminUserUpdateRoute, adminUserUpdateSchema } from "./routes/admin/user/update.js"
import { adminUserFindRoute, adminUserFindSchema } from "./routes/admin/user/find.js"
import { adminUserRemoveRoute, adminUserRemoveSchema } from "./routes/admin/user/remove.js"
import { contentNewRoute, contentNewSchema } from "./routes/content/new.js"
import { contentFilterRoute, contentFilterSchema } from "./routes/content/filter.js"
import { contentCommentNewRoute, contentCommentNewSchema } from "./routes/content/comment/new.js"
import { contentLikeNewRoute, contentLikeNewSchema } from "./routes/content/like/new.js"
import { userUpdateRoute, userUpdateSchema } from "./routes/user/update.js"

const app = express()
const port = process.env.PORT || 3895

app.use(cors({ origin: "*" }))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

app.post("/auth/login",
  joiMiddleware(authLoginSchema, "body"),
  authLoginRoute
)

app.post("/admin/user",
  authenticateMiddlewareAdmin,
  joiMiddleware(adminUserNewSchema, "body"),
  adminUserNewRoute
)
app.put("/admin/user",
  authenticateMiddlewareAdmin,
  joiMiddleware(adminUserUpdateSchema, "body"),
  adminUserUpdateRoute
)
app.get("/admin/user",
  authenticateMiddlewareAdmin,
  adminUserFindRoute
)
app.get("/admin/user/:id",
  authenticateMiddlewareAdmin,
  joiMiddleware(adminUserFindSchema, "params"),
  adminUserFindRoute
)
app.delete("/admin/user/:id",
  authenticateMiddlewareAdmin,
  joiMiddleware(adminUserRemoveSchema, "params"),
  adminUserRemoveRoute
)
app.post("/content/",
  authenticateMiddlewareAny,
  joiMiddleware(contentNewSchema, "body"),
  contentNewRoute
)
app.get("/content",
  contentFilterRoute
)
app.post("/content/:id/comment",
  joiMiddleware(contentLikeNewSchema, "params"),
  joiMiddleware(contentCommentNewSchema, "body"),
  contentCommentNewRoute
)
app.post("/content/:id/like",
  joiMiddleware(contentLikeNewSchema, "params"),
  contentLikeNewRoute
)
app.put("/user/",
  authenticateMiddlewareAny,
  joiMiddleware(userUpdateSchema, "body"),
  userUpdateRoute
)

const user = process.env.DB_USER
const pass = process.env.DB_USER_PWD
const host = process.env.DB_HOST

connectDb(user, pass, host).then(() => {
  app.listen(port, () => console.info("app listening on port " + port))
})
