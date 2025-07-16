import fastify from "fastify";
import fastifyEnv from "@fastify/env"
import fastifyMongo from "@fastify/mongodb"
import { jwtPlugin } from "./plugins/jwt";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import { authRoutes } from "./routes/auth-routes";

const app = fastify({ logger: true });

app.withTypeProvider<ZodTypeProvider>();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const envSchema = {
  type: "object",
  required: ["MONGODB_URI", "JWT_SECRET"],
  properties: {
    MONGODB_URI: {
      type: "string"
    },
    JWT_SECRET: {
      type: "string"
    }
  }
}

app
  .register(fastifyEnv, { schema: envSchema })
  .ready((err) => {
    if (err) {
      console.error(err)
    }
  });

app.register(fastifyMongo, {
  forceClose: true,
  url: process.env.MONGODB_URI!
});

app.register(jwtPlugin);

app.register(authRoutes)

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 Server running on http://localhost:3333')
})