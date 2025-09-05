import { getUser } from "../service/auth.js";


export function checkForAuthentication(req, res, next) {
   const tokenCookie = req.cookies?.token;
   req.user = null;

   if (!tokenCookie) return next();
   
   const token = tokenCookie;
   const user = getUser(token);
   
   req.user = user;
   return next();
}

export function restrictTo(roles = []) {
   return function (req, res, next) {
      if (!req.user) {
         return res.redirect('/login');
      }
      if (!roles.includes(req.user.role)) {
         return res.end('UnAuthorized')
      }
      return next();
   }
}


