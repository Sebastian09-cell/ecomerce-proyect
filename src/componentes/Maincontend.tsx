import { SimpleGrid, Text } from "@chakra-ui/react";
import ProductsCard from "./ProductsCard";
import { useProducts } from "../hooks/useProducts";
import SkeletonCard from "./SkeletonCard";

type Props = {
  filterproducts: string | null;
};

const Maincontend = ({ filterproducts }: Props) => {
  const { data, isLoading, isError } = useProducts();
  const filteredproduct =
    filterproducts === ""
      ? data
      : data?.filter((f) => f.category === filterproducts);

  if (isLoading)
    return (
      <SimpleGrid columns={[2, null, 3]} gap="20px">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </SimpleGrid>
    );
  if (isError) return <Text>Algo salió mal cargando los productos.</Text>;
  return (
    <SimpleGrid columns={[2, null, 3]} gap="20px">
      {filteredproduct?.map((product) => (
        <ProductsCard key={product.id} product={product} />
      ))}
    </SimpleGrid>
  );
};

export default Maincontend;
