import { hashPassword } from "../modules/auth.js";
import { MutationResolvers } from "../types.js";

export const createUser: MutationResolvers['createUser'] = async (_, {username, password}, {dataSources}) => {
  try {
    const createdUser = await dataSources.db.user.create({
      data: {username, password: await hashPassword(password)},
    });
  
    return {
      code: 201,
      message: 'User has been created',
      success: true,
      user: {
        id: createdUser.id,
        username: createdUser.username
      }
    }
  } catch(e) {
    return {
      code: 400,
      message: (e as Error).message,
      success: false,
      user: null
    }
  }
}