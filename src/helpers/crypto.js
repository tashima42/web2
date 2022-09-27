import bcrypt from "bcrypt"
const SALT_ROUNDS = 10


export function buildCryptoHelper(){
  return Object.freeze({
    hashBcrypt,
    compareBcrypt,
  })

  async function hashBcrypt(string) {
    return await bcrypt.hash(string, SALT_ROUNDS)
  }
  async function compareBcrypt(plain, hashed) {
    return await bcrypt.compare(plain, hashed)
  }
}