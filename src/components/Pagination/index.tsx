import { Stack, Box, Text, Button } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

/** Skipping pagination item component due to memory leak, maybe from @chakra-ui (not sure)
 *  Temporary workaround https://github.com/vercel/next.js/issues/30330
 */

interface PaginationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)] //novo array(tamanho ou indices)
    .map((_, index) => (from + index + 1))
    .filter(page => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  currentPage = 1,
  onPageChange,
  registerPerPage = 10,
}: PaginationProps) {

  const lastPage = Math.floor(totalCountOfRegisters / registerPerPage)

  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : []

  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []

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

        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem number={1} onPageChange={onPageChange} />
            {currentPage > (2 + siblingsCount) && (
              <Text color="gray.300" width="8" textAlign="center">...</Text>
            )}
          </>
        )}

        {previousPages.length > 0 && previousPages.map(page =>
          <PaginationItem number={page} key={page} onPageChange={onPageChange} />)}

        <PaginationItem number={currentPage} onPageChange={onPageChange} isCurrent />

        {nextPages.length > 0 && nextPages.map(page =>
          <PaginationItem number={page} key={page} onPageChange={onPageChange} />)}

        {currentPage + siblingsCount < lastPage && (
          <>
            {(currentPage + 1 + siblingsCount) < lastPage && (
              <Text color="gray.300" width="8" textAlign="center">...</Text>
            )}
            <PaginationItem number={lastPage} onPageChange={onPageChange} />
          </>
        )}

      </Stack>
    </Stack>
  )
}