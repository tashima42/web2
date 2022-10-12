export function buildContentRepository({ Content }) {
  return Object.freeze({
    insert,
    filter,
    addComment,
    addLike,
    addDislike,
    getMostLiked,
  })

  async function insert({ name, description, ingredients, price, image, user }) {
    const inserted = await Content.create({ name, description, ingredients, price, image, user })
    return inserted
  }
  async function filter({ ingredient, maxPrice }) {
    const query = {}
    if (ingredient) {
      query.ingredients = ingredient
    }
    if (maxPrice) {
      query.price = { $lt: maxPrice }
    }
    const found = await Content.find(query).lean()
    return found ? found : null
  }

  async function addComment({ comment, id }) {
    const updated = await Content.updateOne({ _id: id }, { $push: { comments: comment } })
    return updated
  }
  async function addLike({ id }) {
    const updated = await Content.updateOne({ _id: id }, { $inc: { likes: 1 } })
    return updated
  }
  async function addDislike({ id }) {
    const updated = await Content.updateOne({ _id: id }, { $inc: { dislikes: 1 } })
    return updated
  }
  async function getMostLiked() {
    const content = await Content.find().sort({ likes: -1 }).lean()
    return content[0]
  }
}