import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Post from '../../components/Post/Post'
import { useProtectedPage } from '../../hooks/UseProtectedPage'
import { BackToTop, FeedContainer, FeedPageContainer, Loading, NewPostContainer } from './styles'
import { Button, TextField, CircularProgress, Typography } from '@material-ui/core'
import { grey, red } from '@material-ui/core/colors'
import { KeyboardArrowUp } from '@material-ui/icons'
import { BASE_URL } from '../../constants/URLs'

const FeedPage = () => {
    var dayjs = require('dayjs')
    var advancedFormat = require('dayjs/plugin/advancedFormat')
    dayjs.extend(advancedFormat)

    useProtectedPage()
    const [posts,setPosts] = useState([])
    const [filteredPosts,setFilteredPosts] = useState([])
    const [searchContent,setSearchContent] = useState("")

    useEffect(()=>{
        setInterval(updatePage, 180000)
        GetPosts()
        topFunction()
    },[])

    const GetPosts = () => {
        Axios.get(`${BASE_URL}/images/all`,
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
            const nickname = post.nickname.toLowerCase()
            const tags = post.tags
            return (
                subtitle.includes(e.target.value.toLowerCase())
                || nickname.includes(e.target.value.toLowerCase())
                || tags.includes(e.target.value.toLowerCase())
                )
             })
        setFilteredPosts(searchArray)
        setSearchContent(e.target.value)
    }
    
    // let mybutton = document.getElementById("back-to-top")
    // window.onscroll = function() {scrollFunction()}
    
    // function scrollFunction() {
    //     if (posts.length>0) {
    //         if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //             mybutton.style.display = "block"
    //         } else {
    //             mybutton.style.display = "none"
    //         }
    //     }
    // }

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    
    function updatePage() {
        GetPosts()
    }
    console.log(posts)
    return (
        <div>
            <Header onChangeSearch={SearchFilter}/>
            <FeedPageContainer>
                <FeedContainer>
                    {posts.length===0
                        ? 
                        <Loading>
                            <Typography variant="h5" style={{ color: red[500] }}>Carregando...</Typography>
                            <CircularProgress style={{ color: red[500] }}/>
                        </Loading>
                        :
                        searchContent===""
                            ?
                            posts.sort((a, b) => a.date < b.date ? 1:-1).map(post=> {
                                return(
                                    <Post
                                        key={post.id}
                                        id={post.id}
                                        subtitle={post.subtitle}
                                        nickname={post.nickname}
                                        tags={post.tags}
                                        createdAt={dayjs(post.date).valueOf()}
                                        file={post.file}
                                        getPosts={GetPosts}
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
                                            getPosts={GetPosts}
                                        />
                                    )
                                })}
                            </div>   
                    }
                </FeedContainer>
                {/* <BackToTop onClick={topFunction} id="back-to-top" style={{ backgroundColor: red[500] }}>
                    <KeyboardArrowUp style={{ color: grey[50] }}/>
                </BackToTop> */}
            </FeedPageContainer>
        </div>
    )
}

export default FeedPage