// pages/api/auth/[...nextauth].js
import connectDb from "../../../middlewhare/mongoos";
import User from "../../../models/User";
import NextAuth from "next-auth";
var CryptoJS = require("crypto-js");
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default connectDb(
  NextAuth({
    providers: [
      CredentialsProvider({
        // Email/password authentication provider
        credentials: {
          name: { label: "Name", type: "text" },
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
          const { name, email, password } = credentials;

          if (name) {
            // If the name is available, create a new user and log them in
            const existingUser = await User.findOne({ email });
            console.log('Existing User:', existingUser);
            if (existingUser) {
              console.log("User with this email already exists");
              return Promise.resolve(null);
            }

            const privateKey = process.env.PRIVATE_KEY;

            // Create a new user
            const newUser = new User({
              name,
              email,
              password: CryptoJS.AES.encrypt(
                password,
                privateKey
              ).toString(),
              role: 'user',
              permissions: ['read'],
            });

            const savedUser = await newUser.save();

            // Return the new user's _id along with other details to be authenticated
            return Promise.resolve(savedUser);
          } else {
            // If only email and password are available, try to log in
            const existingUser = await User.findOne({ email });
            
            if (!existingUser) {
              return Promise.resolve(null); // User not found
            }

            const privateKey = process.env.PRIVATE_KEY;
            var bytes = CryptoJS.AES.decrypt(existingUser.password, privateKey);
            var isPasswordValid = bytes.toString(CryptoJS.enc.Utf8);

            if (password !== isPasswordValid) {
              console.log("Incorrect password");
              return Promise.resolve(null); // Password is not valid
            }
            console.log('Existing User:', existingUser);
            // Return the user details for authentication
            return Promise.resolve(existingUser);
          }
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      async signIn(user, account, profile) {
        console.log('Sign-in Callback Called');
        console.log('User in sign:', user);
      
        // Ensure user is not undefined
        if (!user) {
          return Promise.resolve(null);
        }
        // If the user signed in with Google, handle this scenario
        if (account && account.provider === "google") {
          const existingUser = await User.findOne({ email: profile.email });
          if (existingUser) {
            return Promise.resolve(existingUser);
          }
          // If the user does not exist, create a new user record
          const newUser = new User({
            name: profile.name,
            email: profile.email,
            // Set other relevant fields
            role: "user",
            permissions: ["read"],
          });
          const savedUser = await newUser.save();
          return Promise.resolve(savedUser);
        }


        console.log('User in signIn:', user);
        // Handle other sign-in scenarios
        return Promise.resolve(user);
      },
     
      async jwt({ token, user, account, profile, isNewUser }) {
      
        if(user){
          token._id=user._id;
          token.role=user.role;
          token.permissions=user.permissions;
        }
        return token
      },
      async session({  session, user, token}) {
        
        session.user = {
          ...session.user,
          id: token._id, // Assuming token.id is the user id
          role: token.role,
          permissions: token.permissions,
        };
        console.log("S",session);
        return session;
        
      },
      
    },
    secret: process.env.NEXTAUTH_SECRET,
  })
);
