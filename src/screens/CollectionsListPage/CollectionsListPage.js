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
import Post from '../../components/Post/Post'
import CollectionCard from '../../components/CollectionCard/CollectionCard'

const CollectionsListPage = () => {
    var dayjs = require('dayjs')
    var advancedFormat = require('dayjs/plugin/advancedFormat')
    dayjs.extend(advancedFormat)

    useProtectedPage()
    const [collections, setCollections] = useState([])

    useEffect(()=>{
        GetAllCollections()
        topFunction()
    },[])

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    
    const GetAllCollections = () => {
        Axios.get(`${BASE_URL}/collections/get/all`,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((res)=>{
            setCollections(res.data.result)
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
                {collections.length===0
                    ? 
                    <Loading>
                        <Typography variant="h5" style={{ color: red[500] }}>Carregando...</Typography>
                        <CircularProgress style={{ color: red[500] }}/>
                    </Loading>
                    :
                    collections.sort((a, b) => a.date < b.date ? 1:-1).map(collection=> {
                        return(
                            <CollectionCard
                                key={collection.id}
                                id={collection.id}
                                title={collection.title}
                                subtitle={collection.subtitle}
                                createdAt={dayjs(collection.date).valueOf()}
                            />
                        )
                    })
                }

                {/* <BackToTop onClick={topFunction} id="back-to-top" style={{ backgroundColor: red[500] }}>
                    <KeyboardArrowUp style={{ color: grey[50] }}/>
                </BackToTop> */}
            </PostPageContainer>
        </div>
    )
}

export default CollectionsListPage