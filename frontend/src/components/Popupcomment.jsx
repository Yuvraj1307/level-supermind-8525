
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Button,
    Portal,
    Input
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from "axios"

function Popovercoment({postID}){

    let [text,setText]=useState("")
    let [coments,setCommets]=useState([])
  function showComments(postID){
    axios.get("http://localhost:4500/user/post",{
        headers:{
            Authorization: `${sessionStorage.getItem("token")}`,
          },

    })
    .then((res)=>{
        let posts=res.data.posts
        let data=posts.filter((el,i)=>{
            return el.id===postID
        })
        setCommets([...data[0].comments])
        // console.log(data[0].comments)

    })
    .catch(err=>console.log(err))
  }

  
    function handleComment(e){
        showComments(postID)
        if(e.target.id==="imp"){
            setText(e.target.value)
        }else{
           let obj={content:text,postID}
            axios.post("http://localhost:4500/user/comment",obj,{
                headers:{
                    Authorization: `${sessionStorage.getItem("token")}`,
                  },

            })
            .then(res=>console.log(res))
            .catch(err=>console.group(err))
            showComments(postID)
            // console.log(text)

        }
    }

return (

    <Popover>
  <PopoverTrigger>
    <Button >Comments</Button>
  </PopoverTrigger>
  <Portal>
    <PopoverContent>
      <PopoverArrow />
      <PopoverHeader>Header</PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
      <Input placeholder='Basic usage'w="70%" onChange={(e)=>handleComment(e)} id="imp" />
        <Button colorScheme='blue'w="20%" marginLeft="6%" onClick={handleComment} id='send'>Button</Button>
      </PopoverBody>
      {
        coments && coments.map((el,i)=>{
            return (

                <PopoverFooter>{el.content}</PopoverFooter>
            )
        })
      }
    </PopoverContent>
  </Portal>
</Popover> 
    )
}


export default Popovercoment