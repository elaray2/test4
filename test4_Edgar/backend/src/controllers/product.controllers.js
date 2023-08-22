import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {

  const products = await Product.find({user: req.user.userId}).populate();
  console.log(products)
  res.status(200).json(products)

};


export const createProduct = async (req, res) => {
  try {
    const { description, price, stock } = req.body;

    const existingPro = await Product.findOne({ description });
    if (existingPro) {
      return res.status(400).json({ message: 'Ya existe un producto con la misma descripción' });
    }

    console.log (req.body)
    const product = new Product({
      description,
      price,
      stock,
      user: req.user.userId
    });
    console.log(product)
    const productOk = await product.save();

    res.status(200).json({ "status": 'Producto registrado exitosamente', productOk });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al insertar el producto' });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ha ocurrido un error al eliminar el producto' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, price, stock } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    product.description = description;
    product.price = price;
    product.stock = stock;
    await product.save();

    res.status(200).json({ "status": 'Producto actualizado exitosamente', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al actualizar el producto' });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ha ocurrido un error al obtener el producto' });
  }
};
