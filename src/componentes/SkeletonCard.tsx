import { Card, Skeleton, SkeletonText } from "@chakra-ui/react";

type Props = {};

function SkeletonCard({}: Props) {
  return (
    <Card.Root>
      <Card.Body>
        <Skeleton height="180px" />
        <SkeletonText noOfLines={3} gap="4" height="4" />
      </Card.Body>
    </Card.Root>
  );
}

export default SkeletonCard;
