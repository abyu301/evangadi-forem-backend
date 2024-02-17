// db connection
const e = require("express");
const dbConnection = require("../db/dbConfige");

const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codeS");

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;

  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }

  try {
    const [user] = await dbConnection.query(
      "select username, userid from myusers where username = ? or email =? ",
      [username, email]
    );
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user already existed" });
    }
    if (password.length <= 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must be at least 8 characters" });
    }

    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedpasword = await bcrypt.hash(password, salt);

    await dbConnection.query(
      "INSERT INTO myusers (username, firstname, lastname, email, password) VALUES (?,?,?,?,?)",
      [username, firstname, lastname, email, hashedpasword]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "User registerd" });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please enter all required fields" });
  }
  try {
    const [user] = await dbConnection.query(
      "select username, userid, password from myusers where email = ? ",
      [email]
    );
    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential" });
    } else {
      res.json("user existed");
    }
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

async function checkUser(req, res) {
  res.send("checkUser");
}

module.exports = { register, login, checkUser };
