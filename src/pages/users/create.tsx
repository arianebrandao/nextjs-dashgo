import Head from 'next/head'
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router';

import { Box, Flex, Heading, Divider, VStack, SimpleGrid, HStack, Button } from "@chakra-ui/react";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';


interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchemaValidation = yup.object().shape({
  name: yup.string().required('Preenchimento obrigatório'),
  email: yup.string().required('Preenchimento obrigatório').email('E-mail inválido'),
  password: yup.string().required('Preenchimento obrigatório').min(6, 'Senha deve ter no mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas devem ser iguais')
})

export default function CreateUser() {

  const router = useRouter()

  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date(),
      }
    })

    return response.data.user
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchemaValidation)
  })

  const { errors } = formState

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    //await new Promise(resolve => setTimeout(resolve, 2000))
    //console.log(values)

    await createUser.mutateAsync(values)

    router.push('/users')
  }

  return (
    <>
      <Head>
        <title>dashgo.</title>
      </Head>
      <Box>
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box
            as="form"
            flex="1"
            borderRadius={8}
            bg="gray.800"
            p={["6", "8"]}
            onSubmit={handleSubmit(handleCreateUser)}
          >
            <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

            <Divider my="6" borderColor="gray.700" />

            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input
                  name="name"
                  id="name"
                  label="Nome completo"
                  {...register('name')}
                  error={errors.name}
                />
                <Input
                  name="email"
                  id="email"
                  label="E-mail"
                  type="email"
                  {...register('email')}
                  error={errors.email}
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input
                  name="password"
                  id="password"
                  type="password"
                  label="Senha"
                  {...register('password')}
                  error={errors.password}
                />
                <Input
                  name="password_confirmation"
                  id="password_confirmation"
                  type="password"
                  label="Confirmação da senha"
                  {...register('password_confirmation')}
                  error={errors.password_confirmation}
                />
              </SimpleGrid>
            </VStack>

            <Flex mt="8" justifyContent="flex-end">
              <HStack spacing="4">
                <Link href="/users" passHref>
                  <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                </Link>
                <Button
                  type="submit"
                  colorScheme="pink"
                  isLoading={formState.isSubmitting}
                  >
                  Salvar
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  )
}