import express from 'express';
import {create,update,getAll,getOne,remove} from "../controllers/candidat-controller"
const router = express.Router();

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getOne);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;