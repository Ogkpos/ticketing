import request from "supertest";
import { app } from "../../app";

it("Responds with details about our current user", async () => {
  // const authResponse = await request(app)
  // .post("/api/users/signup")
  // .send({
  // email: "test@test.com",
  // password: "test1234",
  // })
  // .expect(201);
  // const cookie: any = authResponse.get("Set-Cookie");
  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(400);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("Responds with null, if user is not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
