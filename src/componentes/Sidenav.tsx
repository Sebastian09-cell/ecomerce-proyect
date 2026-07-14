import { Container, Heading, Link, VStack } from "@chakra-ui/react";

type Props = {
  categories: string[];
  filterproducts: string | null;
  setFilter: (value: string) => void;
};

const Sidenav = ({ categories, filterproducts, setFilter }: Props) => {
  return (
    <Container position="sticky" top="80px">
      <Heading color="brown.500" fontSize={15} fontWeight="bolder" mb={4}>
        CATEGORIAS
      </Heading>
      <VStack align="stretch">
        {categories.map((c) => (
          <Link
            onClick={() => setFilter(c)}
            px={2}
            py={1}
            borderRadius={10}
            _hover={{ textDecoration: "none" }}
            key={c}
            variant="plain"
            bg={c === filterproducts ? "blue.100" : "transparent"}
          >
            {c}
          </Link>
        ))}
      </VStack>
    </Container>
  );
};

export default Sidenav;
