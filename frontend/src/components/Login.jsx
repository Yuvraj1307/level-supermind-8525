
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
import { useState } from "react"
import { useLocation } from 'react-router-dom';

export default function SimpleCard() {
  let [{email,password},setDetails]=useState({email:"",password:""})
  // const history = useHistory();
  const location=useLocation()
  function handleChange(e){
      console.log(e.target.id)
      if(e.target.id==="email"){
          setDetails({ email:e.target.value,password})
      }else if(e.target.id==="password"){
          setDetails({ email,password:e.target.value})
      }else{
          console.log(email,password)
          let obj={ email,password}
          axios.post("http://localhost:4500/user/login",obj)
          .then((res)=>{

            sessionStorage.setItem("token",res.data.token)
            alert("login successful")
            const { from } = location.state || { from: { pathname: '/' } };
            window.location.replace(from.pathname);
            // console.log(res.data.token)
          })
          .catch(err=>console.log(err))
          
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
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={handleChange}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={handleChange} />
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
                }}
                onClick={handleChange}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

 