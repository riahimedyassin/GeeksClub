const { getAllArticles, getSingleArticle, addNewArticle } = require('../controllers/article.controller')

const router = require('express').Router()





router.get("/",getAllArticles)
router.get('/:id',getSingleArticle)
router.post("/",addNewArticle)



module.exports=router