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
    let [{title,content,url},setDetails]=useState({title:"",content:"",url:""})

    function handleChange(e){
        console.log(e.target.id)
        if(e.target.id==="title"){
            setDetails({title:e.target.value,content,url})
        }else if(e.target.id==="content"){
            setDetails({title,content:e.target.value,url})
        }else if(e.target.id==="url"){
            setDetails({title,content,url:e.target.value})
        }else{
            console.log(title,content,url)
            let obj={title,content,url}
            axios.post("http://localhost:4500/user/post",obj,{
                headers:{
                    Authorization: `${sessionStorage.getItem("token")}`,
                }
            })
            .then(res=>console.log(res))
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
            <Heading fontSize={'4xl'}>Create a Post</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              and enjoy  ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="title">
                <FormLabel>title</FormLabel>
                <Input type="text" onChange={(e)=>handleChange(e)}/>
              </FormControl>
              <FormControl id="email">
                <FormLabel>content</FormLabel>
                <Input type="text" onChange={(e)=>handleChange(e)}/>
              </FormControl>
              <FormControl id="url">
                <FormLabel>url</FormLabel>
                <Input type="text" onChange={(e)=>handleChange(e)}/>
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
                    Create Post
                 </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
  }
  
   