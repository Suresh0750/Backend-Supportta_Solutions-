import CommonBaseRepository from "../../../repositories/baseRepositories/commonBaseRepository";
import UserModel ,{ IUser } from "../../../models/user.model";
import { IUserMethods } from "../../../interface/users/user.interface";


export default class UserRepository extends CommonBaseRepository<{UserModel:IUser}> implements IUserMethods{
            constructor(){
                super({
                    UserModel : UserModel
                })
            }
            async findByEmail(email: string): Promise<IUser | null> {
               try {
                return await this.findOne("UserModel",{email}).exec()

               } catch (error:unknown) {
                throw error
               }
            }
}