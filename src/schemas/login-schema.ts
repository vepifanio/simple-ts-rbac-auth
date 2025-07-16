import { z } from "zod/v4"

const LoginSchema = {
  body: z.object({
    email: z.email(),
    password: z.string(),
  }),
}

export {
  LoginSchema
}