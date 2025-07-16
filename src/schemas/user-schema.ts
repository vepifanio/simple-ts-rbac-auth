import { z } from "zod"

const CreateUserSchema = {
  body: z.object({
    email: z.email(),
    password: z.string().min(6),
    name: z.string().min(2),
    role: z.enum(["admin", "user"])
  })
}

const UpdateUserSchema = {
  body: z.object({
    email: z.email().optional(),
    password: z.string().min(6).optional(),
    name: z.string().min(2).optional(),
  })
}

export {
  CreateUserSchema,
  UpdateUserSchema
}