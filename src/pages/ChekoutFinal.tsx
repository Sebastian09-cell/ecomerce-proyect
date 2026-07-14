import {
  Fieldset,
  Stack,
  Field,
  Input,
  NativeSelect,
  For,
  Button,
  Textarea,
  HStack,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { checkoutSchema, type CheckoutFormData } from "../schemas/checkout";
import useCartStore from "../state";
import { useNavigate } from "react-router-dom";
import ModalChekout from "../componentes/ModalChekout";
import { useState } from "react";

type Props = {
  onSuccess?: () => void;
};

const ChekoutFinal = ({ onSuccess }: Props) => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.cart);
  const limpiar = useCartStore((state) => state.clearCart);

  const methods = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const [showThanks, setShowThanks] = useState(false);
  const mutation = useMutation({
    mutationFn: (data: CheckoutFormData) =>
      axios.post("https://fakestoreapi.com/carts", {
        userId: 1,
        date: new Date().toISOString(),
        products: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        shippingInfo: {
          nombre: data.nombre,
          lastname: data.lastname,
          email: data.email,
          direccion: data.direccion,
          country: data.country,
        },
      }),
    onSuccess: () => {
      methods.reset();
      limpiar();
      onSuccess?.();
      navigate("/");
    },
  });

  const handleSubmit = (data: CheckoutFormData) => {
    mutation.mutate(data);
  };

  return (
    <>
      <ModalChekout showThanks={showThanks} setShowThanks={setShowThanks} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <HStack
            align="flex-start"
            gap={8}
            bg="gray.50"
            p={8}
            minH="100vh"
            wrap="wrap"
          >
            {/* CONTACT DETAILS */}
            <Fieldset.Root
              size="lg"
              maxW="md"
              bg="white"
              borderRadius="xl"
              boxShadow="lg"
              p={6}
              colorPalette="purple"
            >
              <Stack gap={1} mb={4}>
                <Fieldset.Legend fontSize="xl" fontWeight="bold">
                  Contact details
                </Fieldset.Legend>
                <Fieldset.HelperText color="gray.500">
                  Please provide your contact details below.
                </Fieldset.HelperText>
              </Stack>

              <Fieldset.Content gap={4}>
                <Field.Root invalid={!!methods.formState.errors.nombre}>
                  <Field.Label>Name</Field.Label>
                  <Input
                    {...methods.register("nombre")}
                    borderRadius="md"
                    borderColor="gray.200"
                  />
                  <Field.ErrorText>
                    {methods.formState.errors.nombre?.message}
                  </Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!methods.formState.errors.lastname}>
                  <Field.Label>LastName</Field.Label>
                  <Input
                    {...methods.register("lastname")}
                    borderRadius="md"
                    borderColor="gray.200"
                  />
                  <Field.ErrorText>
                    {methods.formState.errors.lastname?.message}
                  </Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!methods.formState.errors.email}>
                  <Field.Label>Email address</Field.Label>
                  <Input
                    {...methods.register("email")}
                    type="email"
                    borderRadius="md"
                    borderColor="gray.200"
                  />
                  <Field.ErrorText>
                    {methods.formState.errors.email?.message}
                  </Field.ErrorText>
                </Field.Root>
              </Fieldset.Content>
            </Fieldset.Root>

            {/* SHIPPING DETAILS */}
            <Fieldset.Root
              size="lg"
              maxW="md"
              bg="white"
              borderRadius="xl"
              boxShadow="lg"
              p={6}
              colorPalette="purple"
            >
              <Stack gap={1} mb={4}>
                <Fieldset.Legend fontSize="xl" fontWeight="bold">
                  Shipping details
                </Fieldset.Legend>
              </Stack>

              <Fieldset.Content gap={4}>
                <Field.Root invalid={!!methods.formState.errors.direccion}>
                  <Field.Label>Street address</Field.Label>
                  <Input
                    {...methods.register("direccion")}
                    borderRadius="md"
                    borderColor="gray.200"
                  />
                  <Field.ErrorText>
                    {methods.formState.errors.direccion?.message}
                  </Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!methods.formState.errors.country}>
                  <Field.Label>Country</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      {...methods.register("country")}
                      borderRadius="md"
                      borderColor="gray.200"
                    >
                      <For each={["United Kingdom", "Canada", "United States"]}>
                        {(item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        )}
                      </For>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                  <Field.ErrorText>
                    {methods.formState.errors.country?.message}
                  </Field.ErrorText>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Delivery notes</Field.Label>
                  <Textarea
                    {...methods.register("notes")}
                    borderRadius="md"
                    borderColor="gray.200"
                  />
                </Field.Root>
              </Fieldset.Content>
            </Fieldset.Root>

            {/* CARD DETAILS */}
            <Fieldset.Root
              size="lg"
              maxW="md"
              bg="white"
              borderRadius="xl"
              boxShadow="lg"
              p={6}
              colorPalette="purple"
            >
              <Stack gap={1} mb={4}>
                <Fieldset.Legend fontSize="xl" fontWeight="bold">
                  Card details
                </Fieldset.Legend>
              </Stack>

              <Fieldset.Content gap={4}>
                <Field.Root invalid={!!methods.formState.errors.tarjetaNombre}>
                  <Field.Label>Name on card</Field.Label>
                  <Input
                    {...methods.register("tarjetaNombre")}
                    borderRadius="md"
                    borderColor="gray.200"
                  />
                  <Field.ErrorText>
                    {methods.formState.errors.tarjetaNombre?.message}
                  </Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!methods.formState.errors.tarjetaNumero}>
                  <Field.Label>Card number</Field.Label>
                  <Input
                    {...methods.register("tarjetaNumero")}
                    placeholder="1234567812345678"
                    maxLength={16}
                    borderRadius="md"
                    borderColor="gray.200"
                  />
                  <Field.ErrorText>
                    {methods.formState.errors.tarjetaNumero?.message}
                  </Field.ErrorText>
                </Field.Root>

                <HStack>
                  <Field.Root invalid={!!methods.formState.errors.tarjetaFecha}>
                    <Field.Label>Expiry (MM/YY)</Field.Label>
                    <Input
                      {...methods.register("tarjetaFecha")}
                      placeholder="12/29"
                      maxLength={5}
                      borderRadius="md"
                      borderColor="gray.200"
                    />
                    <Field.ErrorText>
                      {methods.formState.errors.tarjetaFecha?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!methods.formState.errors.tarjetaCVV}>
                    <Field.Label>CVV</Field.Label>
                    <Input
                      {...methods.register("tarjetaCVV")}
                      placeholder="123"
                      maxLength={4}
                      borderRadius="md"
                      borderColor="gray.200"
                    />
                    <Field.ErrorText>
                      {methods.formState.errors.tarjetaCVV?.message}
                    </Field.ErrorText>
                  </Field.Root>
                </HStack>
              </Fieldset.Content>

              <Button
                type="submit"
                mt={6}
                alignSelf="flex-start"
                colorPalette="purple"
                borderRadius="md"
                px={6}
                size="lg"
                loading={mutation.isPending}
              >
                {mutation.isPending ? "Enviando..." : "Finalizar compra"}
              </Button>

              {mutation.isError && (
                <Field.ErrorText mt={2}>
                  Algo salió mal enviando tu pedido. Intenta de nuevo.
                </Field.ErrorText>
              )}
            </Fieldset.Root>
          </HStack>
        </form>
      </FormProvider>
    </>
  );
};

export default ChekoutFinal;
