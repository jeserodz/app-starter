import { compareSync, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { User } from "../models/user";
import { Token } from "../models/token";

export const UserService = {
  async login(username: string, password: string) {
    const user = await User.findOne({ where: { username } });

    if (!user) return new Error("User not found");

    if (!compareSync(password, user.password)) return new Error("Invalid credentials");

    const token = new Token();
    token.jwt = sign({ username: user.username }, "secret");
    token.user = user;
    await token.save();

    return token;
  },

  async create(data: { username: string; password: string; displayName?: string; email?: string }) {
    const user = new User();
    Object.assign(user, data);
    user.password = hashSync(data.password, 10);
    await user.save();
    return user;
  },

  async get(id: number) {
    const user = await User.findOne({ where: { id } });
    return user;
  },

  async getByUsername(username: string) {
    const user = await User.findOne({ where: { username } });
    return user;
  }
};
