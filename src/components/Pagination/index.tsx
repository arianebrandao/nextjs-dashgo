import { Stack, Box, Button } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

/** Skipping pagination item component due to memory leak, maybe from @chakra-ui (not sure)
 *  Temporary workaround https://github.com/vercel/next.js/issues/30330
 */

export function Pagination() {
  return (
    <Stack
      direction={["column", "row"]}
      spacing="6"
      mt="8"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack spacing="2" direction="row">
        <PaginationItem number={1} isCurrent />
        <PaginationItem number={2} />
        <PaginationItem number={3} />
        <PaginationItem number={4} />
        <PaginationItem number={5} />
        <PaginationItem number={6} />
      </Stack>
    </Stack>
  )
}