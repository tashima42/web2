import { buildJwtHelper } from "./jwt"

describe("test jwt helper", () => {
  const jwtHelper = buildJwtHelper("secret")
  it("should sign a jwt", () => {
    const data = { name: "user" }
    const jwt = jwtHelper.sign(data)
    console.log({ jwt })

    expect(jwt).toBeDefined()
    expect(typeof jwt).toBe("string")
  })
  it("should verify a jwt", () => {
    const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJ1c2VyIn0sImlhdCI6MTY2NDMzNjk0OCwiZXhwIjoxNjY0NDIzMzQ4fQ.BDQj7HXl1BBAgkYCtgk2l5LjEce1FmttUi6tx9-SXHI"
    const { data } = jwtHelper.verify(jwt)
    console.log({ data })

    expect(data).toBeDefined()
    expect(data.name).toBe("user")
  })
})