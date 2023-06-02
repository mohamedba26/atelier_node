const express = require('express');
const router = express.Router();
const Article=require("../models/article")
const auth = require( "../middlewares/auth.js"); 
// afficher la liste des articles.
router.get('/',auth, async (req, res, )=> {
    try {
        const articles = await
        Article.find().populate("scategorieID").exec();
        res.status(200).json(articles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// créer un nouvel article
router.post('/',auth, async (req, res) => {
    const nouvarticle = new Article(req.body)
    try {
        await nouvarticle.save();
        res.status(200).json(nouvarticle );
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// chercher un article
router.get('/:articleId',auth,async(req, res)=>{
    try {
        const art = await Article.findById(req.params.articleId);
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// modifier un article
router.put('/:articleId',auth, async (req, res)=> {
    const { reference,
    designation,prix,marque,qtestock,imageart,scategorieID} = req.body;
    const id = req.params.articleId;
    try {
        const art1 = {
            reference:reference,
            designation:designation,
            prix:prix,
            marque:marque,
            qtestock:qtestock,
            imageart:imageart,
            scategorieID:scategorieID,
            _id:id };
        await Article.findByIdAndUpdate(id, art1);
        res.json(art1);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// Supprimer un article
router.delete('/:articleId',auth, async (req, res)=> {
    const id = req.params.articleId;
    await Article.findByIdAndDelete(id);
    res.json({ message: "article deleted successfully." });
});
module.exports = router;
    