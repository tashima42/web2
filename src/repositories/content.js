export function buildContentRepository({ Content }) {
  return Object.freeze({
    insert,
    filter
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
    const found = await Content.find(query)
    return found ? found : null
  }
}