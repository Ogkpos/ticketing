import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
import Jwt from "jsonwebtoken";

declare global {
  // var signin: () => Promise<string[]>;
  var signin: (id?: string) => string[];
}

jest.setTimeout(30000); // 30 seconds

//tell jest to redirect the actual natswrapper(using our mock)
jest.mock("../nats-wrapper");

process.env.STRIPE_KEY =
  "sk_test_51NsRkZDolqEj84itbASpzGIkNdPe3OQXsqnvG6T8tZN1WEM6uqyvogPumiCn7qvG1xwrODvcSyUonZ1MmHSSSOzx00AdtJ5RTj";

let mongo: any;
beforeAll(async () => {
  jest.clearAllMocks();
  process.env.JWT_KEY = "wemustsucceed";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

/*
global.signin = async () => {
  const email = "test@test.com";
  const password = "test1234";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie: any = response.get("Set-Cookie");
  return cookie;
};
*/
global.signin = (id?: string) => {
  //Build a jwt payload
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  // create the JWT
  const token = Jwt.sign(payload, process.env.JWT_KEY!);
  //build the session object
  const session = { jwt: token };
  //turn tht session into JSON
  const sessionJSON = JSON.stringify(session);
  //take JSON and encode it as base64(takes a string an convert it to base6)
  const base64 = Buffer.from(sessionJSON).toString("base64");
  //return a string(coookie) with the encoded data
  return [`session=${base64}`];
};
