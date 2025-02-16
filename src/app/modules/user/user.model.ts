import { model, Schema } from 'mongoose'
import { UserRole } from '../../../enums'
import { IUser } from './user.interface'
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.user,
    },
  },

  { timestamps: true },
)

const User = model<IUser>('user', UserSchema)
export default User
