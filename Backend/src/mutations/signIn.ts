import { comparePassword, createJWT } from "../modules/auth.js";
import { MutationResolvers } from "../types.js";

export const signIn: MutationResolvers['signIn'] = async (_, {username, password}, {dataSources}) => {
  try {
    const user = await dataSources.db.user.findUnique({where: {username}})
    if (!user) {
      throw new Error('User not found')
    }
    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      throw new Error('User has invalid password')
    }

    return {
      code: 200,
      message: 'User signed in',
      token: createJWT({username: user.username, id: user.id}),
      success: isValidPassword
    }
  } catch(e) {
    return {
      code: 403,
      message: (e as Error)?.message ?? 'An error occured',
      token: null,
      success: false
    }
  }
}