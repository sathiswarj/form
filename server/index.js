const express = require('express');
const mongoose = require('mongoose');
const adminModel = require('./model/adminModel.js');
const cors = require('cors');
const upload = require('./middleware/upload.js');
const app = express();
const PORT = 8001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/admin')
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.log({ message: err.message });
    });

app.post('/addproduct', upload.single('image'), async (req, res) => {

    const { name, description, price, category } = req.body;
    const image = req.file.path;
    try {
        const newProduct = new adminModel({ name, description, price, image, category });
        await newProduct.save();
        res.status(200).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


app.get('/viewproduct', async (req, res) => {
    try {
        const viewproduct = await adminModel.find()
        res.send(viewproduct)
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.get('/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const getProduct = await adminModel.findById(productId)
        if (!getProduct) {
            return res.status(500).send({ message: 'Product not found' })
        }
        res.send(getProduct)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
})

app.delete('/product/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await adminModel.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send('Item not found');
        }
        res.status(200).send('Item deleted');
    } catch (err) {
        res.status(500).send(`Error deleting item: ${err.message}`);
    }
});

app.put('/product/:id', upload.single('image'), async (req, res) => {
    const id = req.params.id
    const { name, description, price, bestseller, category } = req.body
    const updateData = {
        name,
        description,
        price,
        bestseller: bestseller === 'true' || bestseller === true,
        category
    }
    if (req.file) {
        updateData.image = req.file.path
    }
    try {
        const response = await adminModel.findByIdAndUpdate(id, updateData, { new: true })
        if (!response) {
            return res.status(404).send('Item not found');
        }
        res.status(200).send('Item updated');
    } catch (err) {
        res.status(500).send(`Error updating item: ${err.message}`);
    }
});

app.get('/bestseller', async (req, res) => {
    try {
      const bestsellers = await adminModel.find({ bestseller: true });
      res.json(bestsellers);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
  
 


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
