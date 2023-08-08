 
import {
    Button,
    Box,
    Heading,
    Image,
    Text,
    Divider,
    HStack,
    Tag,
    Wrap,
    WrapItem,
    SpaceProps,
    useColorModeValue,
    Container,
    VStack,
    Flex
  } from '@chakra-ui/react'
  import { useEffect, useState } from 'react'
  import axios from "axios"
import { Link } from 'react-router-dom'
import Popovercoment from './Popupcomment'







  const BlogTags = (props) => {
    const { marginTop = 0, tags } = props
  
    return (
      <HStack spacing={2} marginTop={marginTop}>
        {tags.map((tag) => {
          return (
            <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
              {tag}
            </Tag>
          )
        })}
      </HStack>
    )
  }
  
  // interface BlogAuthorProps {
  //   date: Date
  //   name: string
  // }
  
  const BlogAuthor = (props) => {
    return (
      <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
        <Image
          borderRadius="full"
          boxSize="40px"
          src="https://100k-faces.glitch.me/random-image"
          alt={`Avatar of ${props.name}`}
        />
        <Text fontWeight="medium">{props.name}</Text>
        <Text>—</Text>
        <Text>{props.date.toLocaleDateString()}</Text>
      </HStack>
    )
  }







const Mypost = () => {
    let [{name,data},setData]=useState({name:"",data:null})
    // let [allpost,setAllPost]=useState(null)
    useEffect(()=>{
         axios.get("http://localhost:4500/user/post", {
          headers: {
            Authorization: `${sessionStorage.getItem("token")}`,
          },
        })
        .then((res)=>{
          setData({name:res.data.name,data:res.data.posts})
          // console.log(res.data)
        })
        .catch(err=>console.log(err))
  
        
    },[])

    
    return (
      <Container maxW={'7xl'} p="12">
         
        <Heading as="h2" marginTop="5">
          Latest articles
        </Heading>
        <Divider marginTop="5" />
        <Wrap spacing="30px" marginTop="5">
  
          {data && data.map((el,i)=>{
            return (
              <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }} >
            <Box w="100%"  >
              <Box borderRadius="lg" overflow="hidden">
                <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  <Image
                    transform="scale(1.0)"
                    src={el.url}
                    alt="some text"
                    objectFit="contain"
                    width="100%"
                    transition="0.3s ease-in-out"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                  />
                </Box>
              </Box>
              <BlogTags tags={['Engineering', 'Product']} marginTop={3} />
              <Heading fontSize="xl" marginTop="2">
                <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  {el.title}
                </Text>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2">
               {el.content}
              </Text>
              {/* <BlogAuthor name={name} date={new Date('2021-04-06T19:01:27Z')} /> */}
              <Popovercoment postID={el.id}/>
            </Box>
            

                
           </WrapItem>
            )
          })}
           
        </Wrap>
         
      </Container>
    )
  }
  
  export default Mypost