
 import axios from "axios"
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react'
import { useState } from 'react'
  
  export default function SimpleCard() {
    let [{name,email,password},setDetails]=useState({name:"",email:"",password:""})

    function handleChange(e){
        console.log(e.target.id)
        if(e.target.id==="name"){
            setDetails({name:e.target.value,email,password})
        }else if(e.target.id==="email"){
            setDetails({name,email:e.target.value,password})
        }else if(e.target.id==="password"){
            setDetails({name,email,password:e.target.value})
        }else{
            console.log(name,email,password)
            let obj={name,email,password}
            axios.post("http://localhost:4500/user/register",obj)
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            // fetch("http://localhost:4500/user/register",{
            //     method:"POST",
            //     headers:{
            //         "Content-type":"aplication/json"
            //     },
            //     body:JSON.stringify(obj)

            // }).then(res=>console.log(res))
            // .catch(err=>console.log(err))
        }
    }

    
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input type="text" onChange={(e)=>handleChange(e)}/>
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={(e)=>handleChange(e)}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={(e)=>handleChange(e)}/>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Text color={'blue.400'}>Forgot password?</Text>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }} onClick={handleChange}>
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
  }
  
   