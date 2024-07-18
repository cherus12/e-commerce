"use strict";
// @ts-ignore
const stripe = require("stripe");

const stripeKey = new stripe.Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products } = ctx.request.body;
    console.log(products, "products");

    const lineItems = await Promise.all(
      products.map(async (product) => {
        console.log(product, "product");
        const item = await strapi
          .service("api::product.product")
          .findOne(product.id);

        console.log(item, "item");

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: product.quantity,
        };
      })
    );
    try {
      const session = await stripeKey.checkout.sessions.create({
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/success=true`,
        cancel_url: `${process.env.CLIENT_URL}/success=false`,
        line_items: lineItems,
        shipping_address_collection: { allowed_countries: ["US", "CA"] },
        payment_method_types: ["card"],
      });

      console.log(session, "Session");

      await strapi.service("api::order.order").create({
        data: {
          products,
          stripe_id: (await session).id,
        },
      });
      console.log(session, "Session2");

      return { stripeSession: session };
    } catch (err) {
      ctx.response.status = 500;
      return err;
    }
  },
}));
