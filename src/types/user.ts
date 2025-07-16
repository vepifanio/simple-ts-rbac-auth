import { Role } from "./role"

export interface User {
  _id?: string
  email: string
  password: string
  name: string
  role: Role
}