import { nanoid } from "nanoid";
import URL from '../models/url.js'
export async function handleGenerateNewShortURL(req, res) {
   try {
      const body = req.body;
      if (!body.url) return res.status(400).json({ error: "url is required" })
      const shortId = nanoid(8);
      await URL.create({
         shortId: shortId,
         redirectURL: body.url,
         visitHistory: [],
         createdBy: req.user._id,
      })
      // return res.json({ id: shortId })
      return res.render('home', { id: shortId })
   } catch (error) {
      console.log({ error: error });
   }

}

export async function handleUserUrl(req, res) {
   try {
      const shortId = req.params.shortId
      const entry = await URL.findOneAndUpdate({ shortId }, {
         $push: {
            visitHistory: {
               timestamp: Date.now(),
            },
         },
      }
      );
      return res.status(200).redirect(entry.redirectURL)
   } catch (error) {
      console.log({ error: error });
   }

}

export async function handleAnalyticsUrl(req, res) {
   try {
      const shortId = req.params.shortId;
      const result = await URL.findOne({ shortId })
      console.log(result);
      return res.status(200).json({
         visiters: result.visitHistory.length,
         Analytics: result.visitHistory
      })
   } catch (error) {
      console.log({ error: error });
   }
}