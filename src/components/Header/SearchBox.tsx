import { Flex, Input, Icon } from '@chakra-ui/react'
import { useState, useRef } from 'react'

import { RiSearchLine } from 'react-icons/ri'

export function SearchBox() {
  //Controlled components
  const [search, setSearch] = useState('')

  //Uncontrolled component
  const searchInputRef = useRef<HTMLInputElement>(null)

  //console.log(searchInputRef.current.value)

  //debounce

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: "gray.400" }}
        //value={search}
        //onChange={event => setSearch(event.target.value)}
        ref={searchInputRef}
      />
      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  )
}