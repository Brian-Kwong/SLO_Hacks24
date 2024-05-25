import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { userModel } from "../models/user.js";

export function register(req, res){
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send("Bad request: Invalid input data.");
    }
    else {
          create(username, password)
          .then((creds) => generateAccessToken(creds.username))
          .then((token) => {
            res.status(201).send({ token: token });
          });
      }
  }

export function login(req, res){
    const { username, password } = req.body; 

    if (!username || !password) {
      res.status(400).send("Bad request: Invalid input data.");
    } else {
        verify(username, password)
        .then((goodUser) => generateAccessToken(goodUser))
        .then((token) => res.status(200).send({ token: token }))
        .catch((error) => res.status(401).send("Unauthorized"));
    }
  }

// Helper functions to create, encrypt or verify passwords

function create(username, password) {
    return new Promise((resolve, reject) => {
        if (!username || !password) {
        reject("must provide username and password");
        }
        userModel
        .find({ username })
        .then((found) => {
            if (found.length) reject("username exists");
        })
        .then(() =>
            bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(password, salt))
            .then((hashedPassword) => {
                const creds = new userModel({
                username: username,
                password: hashedPassword,
                images: []
                });
                creds.save().then((created) => {
                if (created) resolve(created);
                });
            })
        );
    });
    }

function verify(username, password){
    return new Promise((resolve, reject) => {
        userModel
        .find({ username })
        .then((found) => {
            if (found && found.length === 1) return found[0];
            else reject("Invalid username or password");
        })
        .then((credsOnFile) => {
            if (credsOnFile)
            bcrypt.compare(
                password,
                credsOnFile.password,
                (_, result) => {
                console.log(
                    "Verified",
                    result,
                    credsOnFile.username
                );
                if (result) resolve(credsOnFile.username);
                else reject("Invalid username or password");
                }
            );
            else reject("Invalid username or password");
        });
    });
}

function generateAccessToken(username){
    dotenv.config();
    const TOKEN_SECRET = process.env.JWT || "NOT_A_SECRET";
    return new Promise((resolve, reject) => {
      jwt.sign(
        { username: username },
        TOKEN_SECRET,
        { expiresIn: "1d" },
        (error, token) => {
          if (error) reject(error);
          else resolve(token);
        }
      );
    });
  }