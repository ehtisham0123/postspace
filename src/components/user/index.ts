import express from 'express';

import authComponent from './auth';

const router = express.Router();

router.use('/auth', authComponent);

// router.use('/product', productComponent);




export default router;
