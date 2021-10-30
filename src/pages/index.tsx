import { Flex, Button, Stack, FormLabel } from '@chakra-ui/react'

import { Input } from '../components/Form/Input'

export default function SignIn() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        as="form"

        w="100%"
        maxWidth={360}
        bg="gray.800"
        padding="8"
        borderRadius={8}
        flexDirection="column"
      >
        <Stack spacing="4">
          <FormLabel htmlFor="email" >E-mail</FormLabel>
          <Input name="email" id="email" type="email" />

          <FormLabel htmlFor="password">Senha</FormLabel>
          <Input name="password" id="password" type="password" />
        </Stack>

        <Button type="submit" mt="6" colorScheme="pink" size="lg" >Entrar</Button>

      </Flex>
    </Flex>
  )
}
