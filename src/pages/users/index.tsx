import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';

import { Box, Flex, Heading, Button, Icon, Table, Thead, Tbody, Tr, Th, Td, Checkbox, Text, useBreakpointValue, Spinner } from "@chakra-ui/react";

import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination";

import { useUsers } from '../../services/hooks/useUsers';

export default function UserList() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, error, isFetching, refetch } = useUsers(currentPage)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <>
      <Head>
        <title>dashgo. | usuários</title>
      </Head>
      <Box>
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box flex="1" borderRadius={8} bg="gray.800" p="8">
            <Flex mb="8" justifyContent="space-between" alignItems="center">
              <Heading size="lg" fontWeight="normal">
                Usuários
                {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
              </Heading>

              <Link href="/users/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="small"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo usuário
                </Button>
              </Link>

            </Flex>

            {isLoading ? (
              <Flex justifyContent="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justifyContent="center">
                <Text>Falha ao carregar dados dos usuários.</Text>
              </Flex>
            ) : (
              <>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th px={["4", "4", "6"]} color="gray.600" width="8">
                        <Checkbox colorScheme="pink" />
                      </Th>
                      <Th>Usuário</Th>
                      {isWideVersion && <Th>Data de cadastro</Th>}
                      <Th width="8"></Th>
                    </Tr>
                  </Thead>

                  <Tbody overflowX="scroll">
                    {data.users.map(user => (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{user.name}</Text>
                            <Text fontSize="small" color="gray.300">{user.email}</Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}
                        <Td>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="small"
                            colorScheme="purple"
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                          >
                            {isWideVersion ? 'Editar' : ''}
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

                <Pagination
                  totalCountOfRegisters={data.totalCount}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  )
}