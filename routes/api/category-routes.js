const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
}

  // be sure to include its associated Products
);

router.get('/:id', async (req, res) => {
  try {
    const catddata = await Category.findByPk(req.params.id, {
      include:
        [{
          model: Product,
          required: true
        }]
    });
    if (!catddata) {
      res.status(500).json({ message: `No location found with this id!` })
      return;
    }
    res.status(200).json(catddata)
  } catch (err) {
    res.status(500).json(err)

  }
});
// find one category by its `id` value
// be sure to include its associated Products


router.post('/', async (req, res) => {
  try{
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData)

  }catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try{
    const catdata = await Category.update(req.body, {
      where:{
        id:req.params.id,
      },})

      if(!catdata) {
        res.status(500).json({message: "no category found!"})
      }
      res.status(200).json(catdata)

    
    } catch(err){
    res.status(400).json(err)
  }
  // update a category by its `id` value
});

router.delete('/:id', async(req, res) => {
  try{
    const catdata = await Category.destroy({
      where:{
        id:req.params.id,
      }
    });
    if(!catdata){
      res.status(404).json({message:`No category found with an id of ${req.params.id}`})
    }
    console.log(catdata)
    res.status(200).json({message: `The category of ${req.params.category_name} has been deleted`})

    } catch(err){
    res.status(500).json(err)
  }
  // delete a category by its `id` value
});

module.exports = router;
