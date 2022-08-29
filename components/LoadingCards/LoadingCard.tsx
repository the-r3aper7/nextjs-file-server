import CardSkeleton from "./CardSkeleton";
import { Container, SimpleGrid } from "@mantine/core";

function LoadingCard() {
  return (
    <Container p={"lg"}>
      <SimpleGrid cols={3}>
        {[1, 2, 3, 4, 5, 6].map((element: number) => {
          return <CardSkeleton key={element} />;
        })}
      </SimpleGrid>
    </Container>
  );
}

export default LoadingCard;
