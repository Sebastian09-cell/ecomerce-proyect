import { Grid, GridItem } from "@chakra-ui/react";
import Sidenav from "../componentes/Sidenav";
import Header from "../componentes/Header";
import Maincontend from "../componentes/Maincontend";
import { useProducts } from "../hooks/useProducts";
import { useState } from "react";

function Home() {
  const { data } = useProducts();
  const categories = [
    ...new Set(data?.map((product) => product.category) ?? []),
  ];
  const [filter, setFilter] = useState<string | null>("");
  console.log("infromacion de la api: ", data);
  return (
    <>
      <Header />
      <Grid templateRows="auto 1fr" templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem colSpan={1} bg="gray.100">
          <Sidenav
            categories={categories}
            filterproducts={filter}
            setFilter={setFilter}
          />
        </GridItem>

        <GridItem colSpan={4} bg="gray.200">
          <Maincontend filterproducts={filter} />
        </GridItem>
      </Grid>
    </>
  );
}

export default Home;
