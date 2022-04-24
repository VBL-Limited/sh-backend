import express from 'express';
const router = express.Router();
import {login} from '../controllers/user-controller';
import {signUp} from '../controllers/user-controller'
router.post('/signup', signUp);
router.post('/login', login);

module.exports = router;