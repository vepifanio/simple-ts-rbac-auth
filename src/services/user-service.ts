import { Collection } from "mongodb";
import { User } from "../types/user";
import { hash } from "bcryptjs";

export class UserService {
  constructor(private collection: Collection<User>) {}

  async create(data: Omit<User, "_id">) {
    const hashedPassword = await hash(data.password, 10)
    const result = await this.collection.insertOne({
      email: data.email,
      password: hashedPassword,
      name: data.name,
      role: data.role
    })

    return this.collection.findOne({ _id: result.insertedId })
  }

  async findAll() {
    return this.collection.find().project<Omit<User, "password">>({ password: 0 }).toArray()
  }

  async findByEmail(email: string) {
    return this.collection.findOne({ email })
  }

  async update(id: string, data: Partial<User>) {
    if (data.password) {
      data.password = await hash(data.password, 10)
    }

    await this.collection.updateOne({ _id: id }, { $set: data })
    return this.collection.findOne({ _id: id })
  }

  async delete(id: string) {
    return this.collection.deleteOne({ _id: id })
  }
}