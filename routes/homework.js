const express = require('express');
const router = express.Router();
const {all, homework, add, remove, edit} = require('../controllers/homework');
const {auth} = require('../middleware/auth');


router.get('/', auth, all);
router.get('/:id', auth, homework);
router.post('/add', auth, add);
router.delete('/remove', auth, remove);
router.put('/edit/', auth, edit);

module.exports = router;