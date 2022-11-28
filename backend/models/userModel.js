const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minLength: [6, "Password must be up to 6 characters"],
      // maxLength: [23, "Password must not exceed 23 characters"],
    },
    photo: {
      type: String,
      required: [true, "Please enter a photo"],
      default:
        "https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png",
    },
    phone: {
      type: String,
      default: "+44",
    },
    bio: {
      type: String,
      maxLength: [250, "Bio must not exceed 250 characters"],
      default: "bio",
    },
  },
  { timestamps: true },
  {
    createdAt: -1,
  }
);

// Encrypt password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
