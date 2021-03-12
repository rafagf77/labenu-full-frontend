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
import { BASE_URL } from '../../constants/URLs'

const ImagePage = () => {
    useProtectedPage()

    var dayjs = require('dayjs')
    var advancedFormat = require('dayjs/plugin/advancedFormat')
    dayjs.extend(advancedFormat)

    const params = useParams()
    const [postDetails,setPostDetails] = useState([])

    useEffect(()=>{
        GetPostDetails()
        topFunction()
    },[])

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    
    const GetPostDetails = () => {
        Axios.get(`${BASE_URL}/images/get/${params.id}`,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((res)=>{
            setPostDetails(res.data.result)
            console.log(res.data.result.collections)
        })
        .catch((err)=>{
            console.log(err)
        })
    }


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
                    key={postDetails.id}
                    id={postDetails.id}
                    subtitle={postDetails.subtitle}
                    nickname={postDetails.nickname}
                    createdAt={dayjs(postDetails.date).valueOf()}
                    file={postDetails.file}
                    tags={postDetails.tags}
                    collections={postDetails.collections}
                    getPostDetails={GetPostDetails}
                />
                {/* <BackToTop onClick={topFunction} id="back-to-top" style={{ backgroundColor: red[500] }}>
                    <KeyboardArrowUp style={{ color: grey[50] }}/>
                </BackToTop> */}
            </PostPageContainer>
        </div>
    )
}

export default ImagePage