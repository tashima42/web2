import { jwtHelper } from "../helpers/index.js"

export function authenticateMiddlewareAdmin(req, res, next) {
  return authenticateMiddleware(req, res, next, true)
}
export function authenticateMiddlewareAny(req, res, next) {
  return authenticateMiddleware(req, res, next, true)
}

function authenticateMiddleware(req, res, next, admin) {
  const { authorization } = req.headers
  let session
  if (!authorization) {
    session = req.cookies.session
  } else {
    session = authorization.split("Bearer ").join("")
  }
  validateJwt(session, res)
  next()

  function validateJwt(session, res) {
    const jwt = jwtHelper.verify(session)
    if (jwt && jwt.data && jwt.data.user) {
      res.locals.user = jwt.data.user
    }
    if (admin === true) {
      if (res.locals.user.role != "admin") {
        return res.status(403).json({ success: false, error: { code: "FORBIDDEN", message: "Only admins can perform this action" } })
      }
    }
    if (!jwt) {
      return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Only authenticated users can perform this action" } })
    }
  }
}