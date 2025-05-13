import mongoose, { Schema, Document } from "mongoose";

// ממשק עבור המודל
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isAvatarImageSet: boolean;
  avatarImage: string;
}

// סכמת המשתמש
const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    isAvatarImageSet: {
      type: Boolean,
      default: false,
    },
    avatarImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // הוספת createdAt ו-updatedAt באופן אוטומטי
  }
);

// הסרת שדות רגישים בתגובה
userSchema.set("toJSON", {
  transform: (_, ret) => {
    delete ret.password; // הסרת הסיסמה מהפלט
    return ret;
  },
});

// יצוא המודל
const User = mongoose.model<IUser>("User", userSchema);
export default User;
