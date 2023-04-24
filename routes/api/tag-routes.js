const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!tagData) {
      res.status(404).json({ message: `No id# ${req.params.id} found` })
    }
    res.status(200).json(tagData)


  } catch (err) {
    res.status(500).json(err)
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body)
    res.status(200).json({ message: ` New "${req.body.tag_name}" tagID created ` })

  } catch (err) {
    res.status(500).json(err)
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const tagByID = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagByID) {
      res.status(404).json({ message: `No tag ID found for ${req.params.id}` })
    }
    res.status(200).json({message: ` Tag # ${req.params.id} was updated to ${req.body.tag_name}`})
  }
 

  catch (err) {
    res.status(500).json(err)
  }
 
});


router.delete('/:id', async(req, res) => {
  try{
    const tagByID = await Tag.destroy({
      where:{
        id: req.params.id
      }
    })
    if(!tagByID){
      res.status(404).json({message:`No tag with ID# ${req.params.id}`})
    }
    res.status(200).json({message:` Tag deleted ${tagByID}`})

  }catch(err){
    res.status(500).json(err)
  }

  // delete on tag by its `id` value
});

module.exports = router;
