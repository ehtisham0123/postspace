import express from 'express';

import authComponent from './auth';

const router = express.Router();

router.use('/auth', authComponent);

router.get("/", (req,res)=>{
    return res.send("Hello World")
  })
  



  

export default router;
