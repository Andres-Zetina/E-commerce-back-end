const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try{
  const tags = await Tag.findAll({include:[Product]})
  res.json(tags)
  }catch (err){
    res.send(err)
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try{
    const tags = await Tag.findByPk(req.params.id,{include:[Product]})
    res.json(tags)
  } catch(err){
    res.send(err);
  };
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag)
  }catch(err){
    res.send(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updTag = await Tag.update({tag_name: req.body.tag_name},
      {where:{
        id:req.params.id
      }
    });
    res.status(200).json(updTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const delTag = await Tag.destroy({
      where:{
        id:req.params.id
      }
    });
    res.status(200).json(delTag)
  } catch (err) {
    res.status(400).json(err)
  }
  // delete on tag by its `id` value
});

module.exports = router;
