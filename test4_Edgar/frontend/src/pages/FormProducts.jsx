import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../components/ui";
import { useProducts } from "../context/ProductContext"; // Ajusta la importación según tu estructura de archivos
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default function FormProducts() {
  const { createProduct, getProduct, updateProduct } = useProducts(); // Cambiamos al hook de productos
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateProduct(params.id, {
          ...data,
          price: parseFloat(data.price),
          stock: parseInt(data.stock),
          date: dayjs.utc(data.date).format(),
          });
      } else {
        console.log("al grabar:",data)
        createProduct({
          ...data,
          price: parseFloat(data.price),
          stock: parseInt(data.stock),
          date: dayjs.utc(data.date).format(),
          });
      }

      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(params.id)
    const loadProduct = async () => {
      if (params.id) {
        const product = await getProduct(params.id);
        setValue("description", product.description);
        setValue("price", product.price);
        setValue("stock", product.stock);
      }
    };
    loadProduct();
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="description">Descripción</Label>
        <Input
          type="text"
          name="description"
          placeholder="Ingrese descripción"
          {...register("description", { required: { value: true, message: "Descripción es requerida" } })}
          autoFocus
        />
        {errors.description && (
          <p className="text-red-500 font-semibold">{errors.description.message}</p>
        )}

        <Label htmlFor="price">Precio:</Label>
        <Input
          type="number"
          name="price"
          placeholder="Escriba el precio..."
          {...register("price", { required: { value: true, message: "Precio es requerido" } })}
        />
        {errors.price && (<p className="text-red-500 font-semibold">{errors.price.message}</p>)}

        <Label htmlFor="stock">Stock:</Label>
        <Input
          type="number"
          name="stock"
          placeholder="Escriba el stock..."
          {...register("stock", { required: { value: true, message: "Stock es requerido" } })}
        />
        {errors.stock && (<p className="text-red-500 font-semibold">{errors.stock.message}</p>)}

        <Button>Guardar Registro</Button>
      </form>
    </Card>
  );
}
