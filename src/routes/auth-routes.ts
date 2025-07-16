
import { UserService } from "../services/user-service";
import { User } from "../types/user";
import { LoginSchema } from "../schemas/login-schema";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { compare } from "bcryptjs";

export const authRoutes: FastifyPluginCallbackZod = async (app) => {
  const usersCollection = app.mongo.db!.collection<User>("users");
  const usersService = new UserService(usersCollection)

  app.post('/login', {
    schema: LoginSchema
  }, async (request, reply) => {
    const { email, password } = request.body;

    const user = await usersService.findByEmail(email)

    if (!user) {
      return reply.status(401).send({ message: "Invalid credentials" })
    }

    const isPasswordCorrect = await compare(password, user.password)

    if (!isPasswordCorrect) {
      return reply.status(401).send({ message: "Invalid credentials" })
    }

    const access_token = app.jwt.sign({ sub: user._id.toString(), role: user.role })

    return {
      access_token
    }
  })
}