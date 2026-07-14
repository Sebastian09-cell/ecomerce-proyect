import { Card, Button, Image } from "@chakra-ui/react";
import type { Product } from "../types/tipos";
import useCartStore from "../state";

type Props = {
  product: Product;
};

const ProductsCard = ({ product }: Props) => {
  const { addToCart, removeFromCart } = useCartStore();
  return (
    <Card.Root width="320px">
      <Card.Body gap="2">
        <Image src={product.image} alt="Mochila" borderRadius="lg" />
        <Card.Title mt="2">{product.title}</Card.Title>
        <Card.Description>
          {product.description} - ${product.price}
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button onClick={() => addToCart(product)}>+</Button>
        <Button onClick={() => removeFromCart(product.id)}>-</Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductsCard;
