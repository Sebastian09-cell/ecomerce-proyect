import { z } from "zod";

export const checkoutSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  lastname: z.string().min(1, "El apellido es requerido"),
  email: z.email().min(3, "correo necesario"),
  direccion: z.string().min(1, "Direccion incompleta"),
  country: z.enum(
    ["United Kingdom", "Canada", "United States"],
    "Selecciona un país",
  ),
  notes: z.string().optional(),
  tarjetaNombre: z.string().min(1, "El nombre en la tarjeta es requerido"),
  tarjetaNumero: z
    .string()
    .regex(/^\d{16}$/, "Número de tarjeta inválido (16 dígitos)"),
  tarjetaFecha: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato MM/YY"),
  tarjetaCVV: z.string().regex(/^\d{3,4}$/, "CVV inválido"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
