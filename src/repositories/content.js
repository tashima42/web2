export function buildContentRepository({ Content }) {
  return Object.freeze({
    insert,
  })

  async function insert({ name, description, ingredients, price, image }) {
    const inserted = await Content.create({ name, description, ingredients, price, image })
    return inserted
  }
}