import jsonwebtoken from "jsonwebtoken"
export function buildJwtHelper(secret) {
  return Object.freeze({
    sign,
    verify,
  })

  function sign(data) {
    return jsonwebtoken.sign(
      { data }, 
      secret,
      { expiresIn: (60 * 60 * 24 * 30)}
    )
  }

  function verify(token) {
    return jsonwebtoken.verify(token, secret)
  }
}
