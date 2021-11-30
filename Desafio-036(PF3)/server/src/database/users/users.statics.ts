import { IUserSessionDocument } from "./users.types";
import { UsuarioPassport } from '../../utils/Interfaces';

export async function findAll(this: any) {
  const users = await this.find({})
  return users
}

export async function addSessionPassport(this:any, obj_user:UsuarioPassport) {
    const user = await this.create(obj_user)
    return user
}