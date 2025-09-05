import express from 'express'
import URL from '../models/url.js'
import { restrictTo } from '../middleware/auth.js';
const router = express.Router();

router.get('/admin/urls', restrictTo(["ADMIN"]),
   async (req, res) => {
      const allUrls = await URL.find({})
      let extractName = req.user.email;
      let user = extractName[0].toUpperCase();

      return res.render('home', { urls: allUrls, user: user });
   }
)

router.get('/', (req, res) => {
   return res.render('landing');
})

router.get('/home', restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
   const allUrls = await URL.find({ createdBy: req.user._id })
   let extractName = req.user.email;
   let user = extractName[0].toUpperCase();
   // console.log(user);

   return res.render('home', { urls: allUrls, user: user });
})

router.get('/signup', (req, res) => {
   return res.render('signup');
})

router.get('/login', (req, res) => {
   return res.render('login');
})

export default router;
