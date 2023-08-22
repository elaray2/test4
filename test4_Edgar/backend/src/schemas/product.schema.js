import { z } from "zod";

export const createProductSchema = z.object({

  description: z.string({ required_error: "Description is required" }),

  price: z.number({ required_error: "Price is required" })
    .min(1,{message:"El precio debe ser mayor 1 $",}),

    
  stock: z.number({ required_error: "Stock is required" })
    .min(3,{message:"El stock debe ser como minimo 3",})
   
});

