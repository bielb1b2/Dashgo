import { Box, Divider, Flex, Heading, VStack, SimpleGrid, HStack, Button } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/SideBar';

type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }
  
  const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome Obrigatório'),
    email: yup.string().required('E-mail Obrigatório').email('E-mail Inválido'),
    password: yup.string().required('Senha Obrigatória').min(6, 'No mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'As senhas precisam ser iguais')
    
  })
  

export default function CreateUser() {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    })

    const { errors } = formState;

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        await new Promise(resolve => setTimeout(resolve, 2000))

        console.log(values);
    }


    return(
        <Box>
            <Header />
            <Flex
                w="100%"
                my="6"
                maxWidth={1480}
                mx="auto"
                px="6"
            >
                <Sidebar />

                <Box as="form" onSubmit={handleSubmit(handleCreateUser)} flex="1" borderRadius={8} bg="gray.800" p={["6","8"]}>
                    <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                            <Input 
                                name="name"
                                type="text"
                                label="Nome completo" 
                                {...register('name')} 
                                error={errors.name}
                            />
                            <Input 
                                name="email" 
                                type="email" 
                                label="E-mail" 
                                {...register('email')} 
                                error={errors.email}
                            />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                            <Input 
                                name="password" 
                                type="password" 
                                label="Senha" 
                                error={errors.password}  
                                {...register('password')}
                            />
                            <Input 
                                name="password_confirmation" 
                                type="password" 
                                label="Confirmação da Senha"
                                error={errors.password_confirmation} 
                                {...register('password_confirmation')} 
                            />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button 
                                type="submit" 
                                isLoading={formState.isSubmitting} 
                                colorScheme="pink"
                            >
                                Salvar
                            </Button>
                        </HStack>
                    </Flex>

                </Box>
            </Flex>
        </Box>
    )
}