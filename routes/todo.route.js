const express=require('express');
const router =express.Router();
const {create,getAllList, getTodoById, updateById, deleteById}=require('../controller/todo.controller')

router.route('/').post(create)
router.route('/').get(getAllList)
router.route('/:id').get(getTodoById)
router.route('/:id').put(updateById)
router.route('/:id').delete(deleteById)
module.exports =router