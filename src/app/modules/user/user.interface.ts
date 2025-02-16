import { UserRole } from '../../../enums'

export type IUser = {
  name: string
  email: string
  password: string
  role: UserRole
}
