import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

describe("Show tickets", () => {
  it("returns a 404 when a ticket is not found", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app).get(`/api/tickets/${id}`).send().expect(404);
  });

  it("returns a ticket when a ticket is found", async () => {
    const title = "A valid title";
    const price = 20;

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signIn())
      .send({ title, price })
      .expect(201);

    const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send()
      .expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
  });
});
