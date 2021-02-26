import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import ImageCard from '../../components/ImageCard/ImageCard'
import { useProtectedPage } from '../../hooks/UseProtectedPage'
import { BackToTop, PostPageContainer, Loading } from './styles'
import { Button, TextField, Typography, CircularProgress } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { grey, red } from '@material-ui/core/colors'
import { KeyboardArrowUp } from '@material-ui/icons'
import Axios from 'axios'

const ImagePage = () => {
    useProtectedPage()
    const params = useParams()

    // const GetPostDetails = () => {
    //     Axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${params.id}`,
    //     {
    //         headers: {
    //             Authorization: localStorage.getItem("token")
    //         }
    //     })
    //     .then((res)=>{
    //         setPostDetails(res.data.post)
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })
    // }

    // let mybutton = document.getElementById("back-to-top")
    // window.onscroll = function() {scrollFunction()}
    
    // function scrollFunction() {
    //     if (postDetails.length===undefined) {
    //             if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //                 mybutton.style.display = "block"
    //             } else {
    //                 mybutton.style.display = "none"
    //             }
    //     }
    // }

    // function topFunction() {
    //     document.body.scrollTop = 0;
    //     document.documentElement.scrollTop = 0;
    // }

    return (
        <div>
            <Header />
            <PostPageContainer>
                <ImageCard
                    // key={post.id}
                    // id={post.id}
                    // subtitle={post.subtitle}
                    // author={post.author}
                    // createdAt={dayjs(post.date).valueOf()}
                    // file={post.file}
                    // getPosts={GetPosts}
                />
                {/* <BackToTop onClick={topFunction} id="back-to-top" style={{ backgroundColor: red[500] }}>
                    <KeyboardArrowUp style={{ color: grey[50] }}/>
                </BackToTop> */}
            </PostPageContainer>
        </div>
    )
}

export default ImagePage