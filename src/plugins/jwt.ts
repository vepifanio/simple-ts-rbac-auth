import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify"
import fp from "fastify-plugin"
import fastifyJwt from "@fastify/jwt"

export interface JwtPayload {
  sub: string
  role: "admin" | "user"
}

export const jwtPlugin: FastifyPluginAsync = async (app) => {
  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'mysecret',
    sign: {
      expiresIn: '1h'
    }
  })

  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify()
      } catch (error) {
        reply.send(error)
      }
    }
  )

  app.decorate(
    "authorize",
    (roles: JwtPayload['role'][]) => {
      async (request: FastifyRequest, reply: FastifyReply) => {
        const user = request.user as JwtPayload;
        if (!roles.includes(user.role)) {
          return reply.status(403).send({ message: "Forbidden" })
        }
      }
    }
  )
}
