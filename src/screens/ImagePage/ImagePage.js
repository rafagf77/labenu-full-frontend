import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import ImageCard from '../../components/ImageCard/ImageCard'
import { useProtectedPage } from '../../hooks/UseProtectedPage'
import { PostPageContainer } from './styles'
import { useParams } from 'react-router-dom'
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
            </PostPageContainer>
        </div>
    )
}

export default ImagePage