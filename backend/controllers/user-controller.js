const User = require("../models/user");
const { post } = require("../routes/home");

// exports.getAllUser = async (req, res, next) => {
//   let users;
//   try {
//     users = await User.find()
//       .populate("posts")
//       .exec((err, posts) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("Populated users: " + posts);
//         }
//       });
//   } catch (err) {
//     console.log(err);
//   }
//   console.log(users);

//   if (!users) {
//     return res.status(404).json({ message: "No User Found" });
//   }
//   return res.status(200).json({ users });
// };
exports.getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
    console.log(users);
  } catch (err) {
    console.log(err);
  }
  console.log(users);

  if (!users) {
    return res.status(404).json({ message: "No User Found" });
  }
  return res.status(200).json({ users });
};

///-------------------------------------------

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res
      .status(404)
      .json({ message: "User with this email already exists" });
  }
  const user = new User({
    name,
    email,
    password,
  });

  try {
    user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ user });
};
