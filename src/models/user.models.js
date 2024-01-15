import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      index: true,
      lowercase: true,
      //index- to make it searchable(more optimizely)
      //it reduces performance
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      index: true,
      trim: true,
      required: true,
    },
    avatar: {
      type: String, //url cloudnary
      required: true,
    },
    coverImage: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      //here we will encrypt it lateron
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  //to encrypt password only when password is changing
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//although we have many methods already provided by mongoose, but we can also make our own custom methods
userSchema.methods.isPasswordCorrect = async function (password) {
  // console.log(password)
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
//in arrow function you do not have reference to this
export const User = mongoose.model("User", userSchema);
