import { buildCryptoHelper } from "./crypto.js"

describe("test crypto helper", () => {
  const cryptoHelper = buildCryptoHelper()
  it("should hash a string", async () => {
    const string = "password"
    const hash = await cryptoHelper.hashBcrypt(string)
    console.log({ string, hash })

    expect(hash).toBeDefined()
    expect(typeof hash).toBe("string")
  })
  it("should compare a hash with a string", async () => {
    const string = "password"
    const hash = "$2b$10$K2R1btVfgWaTHY9zXsXbmuAsuOVFl2dlcbk.KLRJhEKjZuZFAhV9."
    const compare = await cryptoHelper.compareBcrypt(string, hash)
    console.log({ compare })

    expect(compare).toBe(true)
  })
})