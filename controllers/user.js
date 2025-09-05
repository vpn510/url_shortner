import User from '../models/user.js';
// import { v4 as uuidv4 } from 'uuid'
import { setUser } from '../service/auth.js';

export async function handleSignUp(req, res) {
   const { name, password, email } = req.body
   if (!name || !password || !email) return res.status(400).end({ error: "All field are required" })
   await User.create({
      name,
      password,
      email,
   })

   return res.status(201).redirect('/login');
}

export async function handleLogin(req, res) {
   const { password, email } = req.body
   const user = await User.findOne({ email, password });
   if (!user) {
      return res.render('login', {
         error: "Invalid Username or Password"
      });
   }

   const token = setUser(user);
   res.cookie("token", token);
   // console.log({ token });
   return res.redirect('/home');
   // return res.json({token})

   // return res.status(201).redirect('/')
}

export async function handleLogout(req, res) {
   res.clearCookie("token");
   return res.redirect('/login')
}
