export function buildUserRepository({ User }) {
  return Object.freeze({
    insert,
    update,
    findByEmail,
    findById,
    findAll,
    remove,
  })

  async function insert({ email, password, name, role }) {
    const insertedUser = await User.create({ email, password, name, role })
    return insertedUser
  }
  async function update({ id, email, password, name, role }) {
    const query = { }
    if(email) query.email = email
    if(password) query.password = password
    if(name) query.name = name
    if(role) query.role = role
    const updated = await User.updateOne({_id: id},query)
    return updated
  }
  async function findByEmail(email) {
    const foundUser = await User.findOne({ email })
    return foundUser ? foundUser : null
  }
  async function findById(id) {
    const foundUser = await User.findOne({ _id: id })
    return foundUser ? foundUser : null
  }
  async function findAll() {
    const found = await User.find()
    return found
  }
  async function remove(id) {
    const removed = await User.deleteOne({ _id: id})
    return removed
  }
}