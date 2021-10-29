import React from 'react';
import { Stack, Box } from "@chakra-ui/react";

import { PaginationItem } from "./PaginationItem";

export function Pagination() {
  return (
    <Stack
      direction="row"
      spacing="6"

      mt="8"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack spacing="2" direction="row">
        <PaginationItem pageNumber={1} isCurrent />
        <PaginationItem pageNumber={2} />
        <PaginationItem pageNumber={3} />
      </Stack>
    </Stack>
  )
}