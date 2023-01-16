import express from 'express'
// import userComponent from './user';
import adminComponent from './admin';


const router = express.Router()

// router.use('/user', userComponent)
router.use('/admin', adminComponent)


export default router
