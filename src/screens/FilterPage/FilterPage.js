import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { useProtectedPage } from '../../hooks/UseProtectedPage'
import { BackToTop, PostPageContainer, Loading } from './styles'
import { Button, TextField, Typography, CircularProgress } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { grey, red } from '@material-ui/core/colors'
import Axios from 'axios'
import { BASE_URL } from '../../constants/URLs'
import Post from '../../components/Post/Post'

const FilterPage = () => {
    useProtectedPage()
    const [posts,setPosts] = useState(undefined)
    const [filteredPosts,setFilteredPosts] = useState([])
    const [searchContent,setSearchContent] = useState("")

    const {id} = useParams()

    var dayjs = require('dayjs')
    var advancedFormat = require('dayjs/plugin/advancedFormat')
    dayjs.extend(advancedFormat)

    useEffect(()=>{
        GetPosts()
        topFunction()
    },[id])

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    
    const GetPosts = () => {
        Axios.get(`${BASE_URL}/images/tag/${id}`,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((res)=>{
            setPosts(res.data.result)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const SearchFilter = (e) => {
        const searchArray = posts.filter((post) => {
            const subtitle = post.subtitle.toLowerCase()
            // const title = post.title.toLowerCase()
            // const tags = post.tags
            return (
                subtitle.includes(e.target.value.toLowerCase())
                // || title.includes(e.target.value.toLowerCase())
                // || tags.includes(e.target.value.toLowerCase())
                )
             })
        setFilteredPosts(searchArray)
        setSearchContent(e.target.value)
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
            <Header onChangeSearch={SearchFilter}/>
            <PostPageContainer>
                    {posts===undefined
                        ? 
                        <Loading>
                            <Typography variant="h5" style={{ color: red[500] }}>Carregando...</Typography>
                            <CircularProgress style={{ color: red[500] }}/>
                        </Loading>
                        :
                        posts.length===0
                        ?
                        <p>Álbum vazio</p>
                        :
                        searchContent===""
                            ?
                            posts.sort((a, b) => a.date < b.date ? 1:-1).map(post => {
                                return(
                                    <Post
                                        key={post.id}
                                        id={post.id}
                                        subtitle={post.subtitle}
                                        title={post.title}
                                        tags={post.tags}
                                        nickname={post.nickname}
                                        createdAt={dayjs(post.date).valueOf()}
                                        file={post.file}
                                    />
                                )
                            })
                            :
                            <div>
                                <p><b>Foram encontradas {filteredPosts.length} ocorrências</b></p>
                                {filteredPosts.sort((a, b) => a.date < b.date ? 1:-1).map(post=> {
                                    return(
                                        <Post
                                            key={post.id}
                                            id={post.id}
                                            subtitle={post.subtitle}
                                            nickname={post.nickname}
                                            tags={post.tags}
                                            createdAt={dayjs(post.date).valueOf()}
                                            file={post.file}
                                        />
                                    )
                                })}
                            </div>   
                    }
                {/* <BackToTop onClick={topFunction} id="back-to-top" style={{ backgroundColor: red[500] }}>
                    <KeyboardArrowUp style={{ color: grey[50] }}/>
                </BackToTop> */}
            </PostPageContainer>
        </div>
    )
}

export default FilterPage