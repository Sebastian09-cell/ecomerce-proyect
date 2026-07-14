import { HStack, VStack, Image, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../state";
import { FiShoppingBag } from "react-icons/fi";

type Props = {};

function MIcarrito({}: Props) {
  const { cart } = useCartStore();
  const navigate = useNavigate();
  const { addToCart, removeFromCart, removeItem, getTotal } = useCartStore();
  return (
    <>
      <HStack px={6} py={4} align="center" justifyContent="center">
        <FiShoppingBag size={30} /> |{" "}
        <Text fontSize="2xl">Tienda Fulanito</Text>
      </HStack>
      <VStack>
        {cart.map((c) => (
          <HStack
            bg="gray.200"
            key={c.id}
            boxShadow="lg"
            margin="4"
            gap="10"
            py={2}
            px={8}
            w="80%"
          >
            <Image
              rounded="md"
              borderRadius="full"
              src={c.image}
              alt={c.title}
              boxSize="60px"
              boxShadow="lg"
            />
            <Text fontWeight="semibold" w="350px">
              {" "}
              {c.title}
            </Text>
            <Text> {c.quantity}</Text>{" "}
            <VStack gap={2}>
              <Button
                onClick={() => addToCart(c)}
                borderRadius="full"
                boxSize={8}
                minW={0}
                p={0}
              >
                +
              </Button>
              <Button
                onClick={() => removeFromCart(c.id)}
                borderRadius="full"
                boxSize={8}
                minW={0}
                p={0}
              >
                {" "}
                -{" "}
              </Button>
            </VStack>
            <Text w="50px"> {c.price}</Text>
            <Button
              onClick={() => removeItem(c.id)}
              borderRadius="full"
              boxSize={8}
              minW={0}
              p={0}
            >
              x
            </Button>
            <Text w="150px"> Subtotal: {c.price * c.quantity}</Text>
          </HStack>
        ))}
        <Text color="gray.600">Total$ {getTotal().toFixed(2)}</Text>
        <Button onClick={() => navigate("/checkout")}>Pagar</Button>
      </VStack>
    </>
  );
}

export default MIcarrito;
