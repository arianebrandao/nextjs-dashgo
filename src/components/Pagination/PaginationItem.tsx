import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  pageNumber: number;
  isCurrent?: Boolean;
}

export function PaginationItem({ pageNumber, isCurrent = false }: PaginationItemProps) {
  if (isCurrent == true) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="pink"
        disabled
        _disabled={{
          bgColor: 'pink.500',
          cursor: 'default',
        }}
      >
        {pageNumber}
      </Button>
    )
  } else {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        bgColor="gray.700"
        _hover={{ bg: 'gray.500' }}
      >
        {pageNumber}
      </Button>
    )
  }
}