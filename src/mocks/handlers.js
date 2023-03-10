import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "images/chocolate.png" },
        { name: "Vanilla", imagePath: "images/vanilla.png" },
        { name: "Mint chip", imagePath: "images/mint-chip.png" },
      ])
    );
  }),
  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "M&Ms",
          imagePath: "images/m-and-ms.png",
        },
        {
          name: "Hot fudge",
          imagePath: "images/hot-fudge.png",
        },
        {
          name: "Peanut butter cups",
          imagePath: "images/peanut-butter-cups.png",
        },
      ])
    );
  }),
  rest.post("http://localhost:3030/order", (req, res, ctx) => {
    return res(ctx.json({ orderNumber: "9741592006" }));
  }),
];
