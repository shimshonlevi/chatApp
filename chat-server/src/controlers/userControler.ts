import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../model/userModels";

// פונקציה לרישום משתמש חדש
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ msg: "All fields are required", status: false });
      return;
    }

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      res.status(400).json({ msg: "Username already used", status: false });
      return;
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      res.status(400).json({ msg: "Email already used", status: false });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      msg: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// פונקציה להתחברות
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ msg: "All fields are required", status: false });
      return;
    }

    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ msg: "Incorrect username or password", status: false });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ msg: "Incorrect username or password", status: false });
      return;
    }

    res.status(200).json({
      msg: "Login successful",
      user,
      status: true
    });
  } catch (error) {
    next(error);
  }
};

export const setAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;

    // עדכון המשתמש במסד הנתונים
    const userData = await User.findByIdAndUpdate(userId, { 
      isAvatarImageSet: true, 
      avatarImage: avatarImage 
    }, { new: true });

    // מחזירים את התגובה עם הנתונים המעודכנים
    return res.json({
      isSet: userData?.isAvatarImageSet,
      image: userData?.avatarImage
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) =>{
  try {
    const users = await User.find({_id: { $ne: req.params.id}}).select([
      'email',
      'username',
      'avatarImage',
      '_id'
    ]);
    res.json(users);
  } catch (ex) {
    next(ex);
  }
  }
