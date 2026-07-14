import useCartStore from "../state";
import { Button, HStack, Icon, Text } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useCheckout } from "../hooks/useCheckout";
import { useNavigate } from "react-router-dom";

type Props = {};

function Header({}: Props) {
  const navigate = useNavigate();
  const { cart, getTotal } = useCartStore();
  const { isError, error } = useCheckout();
  return (
    <HStack
      justify="space-between"
      position="sticky"
      px={4}
      py={2}
      top={0}
      zIndex={10}
      boxShadow="md"
      bg="white"
    >
      <Text textStyle="xl">Tienda fulamito</Text>
      <HStack justify="flex-end" px={4} py={2}>
        <Icon as={FiShoppingCart} boxSize={5} />
        <Text fontWeight="bold">{cart.length}</Text>
        <Text color="gray.600">${getTotal().toFixed(2)}</Text>
        {cart.length > 0 && (
          <Button onClick={() => navigate("/mi-carrito")}>Pagar</Button>
        )}
        {isError && <Text>{error?.message}</Text>}
      </HStack>
    </HStack>
  );
}

export default Header;
