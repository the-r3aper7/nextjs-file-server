import { Skeleton, Card } from "@mantine/core";

function CardSkeleton() {
  return (
    <>
      <Card shadow="sm" p="xl">
        {/* <Skeleton height={50} circle mb="xl" /> */}
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </Card>
    </>
  );
}

export default CardSkeleton;
