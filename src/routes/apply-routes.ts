import express from 'express';
import {update,apply,getAllApplications,getApplication,remove} from '../controllers/apply-controller'
const router = express.Router();
router.post('/', apply);
router.get('/', getAllApplications);
router.get('/:id', getApplication);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;