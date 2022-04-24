import express from "express"
import {create,getAll,update,remove,getOne} from "../controllers/selection-controller"
const router = express.Router();

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getOne);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;