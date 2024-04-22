import {User} from '@prisma/client'
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export type JWTUser = Pick<User, 'id' | 'username'>;

export const createJWT = (user: JWTUser): string => {
  const token = jwt.sign(user, process.env.JWT_SECRET as string)
  return token
}

export const getUser = (token: string): JWTUser | null => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JWTUser
    return payload
  } catch(e) {
    console.error(e)
    return null
  }
}


export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 5)
}

export const comparePassword = (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash)
}

