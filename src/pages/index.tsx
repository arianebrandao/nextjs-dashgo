import Head from 'next/head'
import { SubmitHandler, useForm, useFormState } from 'react-hook-form'

import { Flex, Button, Stack, FormLabel } from '@chakra-ui/react'

import { Input } from '../components/Form/Input'

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignIn() {

  const { register, handleSubmit, formState } = useForm()

  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log(data)
  }

  return (
    <>
      <Head>
        <title>dashgo.</title>
      </Head>

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
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input name="email" id="email" type="email" {...register('email')} />

            <FormLabel htmlFor="password">Senha</FormLabel>
            <Input name="password" id="password" type="password" {...register('password')} />
          </Stack>

          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            size="lg"
            isLoading={formState.isSubmitting}
            >
              Entrar
            </Button>

        </Flex>
      </Flex>
    </>
  )
}
