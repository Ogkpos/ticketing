import request from "supertest";
import { app } from "../../app";

it("Fails when an email that does not exist is spplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "test1234",
    })
    .expect(400);
});

it("Fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "test1234",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "test12345",
    })
    .expect(400);
});

it("Responds with a cookie when given valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "test1234",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "test1234",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
