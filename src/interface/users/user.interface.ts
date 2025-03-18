
import { IUser } from "./user.type"

export interface IUserMethods {
    findByEmail(email:string):Promise<IUser | null>
}