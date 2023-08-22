import { useProducts } from "../../context/ProductContext"; // Ajusta la importación según tu estructura de archivos
import { Button, ButtonLink, Card } from "../ui";

export function ProductCard({ product }) {
  const { deleteProduct } = useProducts(); // Cambiamos aquí al hook de productos

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{product.description}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteProduct(product._id)}>Delete</Button>
          <ButtonLink to={`/product/${product._id}`}>Edit</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300"><span className="text-blue-400 font-bold">Price:</span> ${product.price}</p>
      <p className="text-slate-300"><span className="text-blue-400 font-bold">Stock:</span> {product.stock} unidades</p>
    </Card>
  );
}


