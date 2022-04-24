import express from 'express';
const router = express.Router();
import {create,update,getAll,getOne,remove,getByTag,getByTitle} from "../controllers/offre-controller"
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getOne);
router.get('/:tag', getByTag);
router.get('/:title', getByTitle);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;