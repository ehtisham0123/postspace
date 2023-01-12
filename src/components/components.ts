import express from 'express'
import userComponent from './user';

const router = express.Router()

router.use('/user', userComponent)

export default router
