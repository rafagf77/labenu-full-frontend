import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { useProtectedPage } from '../../hooks/UseProtectedPage'
import { BackToTop, PostPageContainer, Loading } from './styles'
import { Typography, CircularProgress } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { grey, red } from '@material-ui/core/colors'
import { KeyboardArrowUp } from '@material-ui/icons'
import Axios from 'axios'
import { BASE_URL } from '../../constants/URLs'
import Post from '../../components/Post/Post'

const CollectionPage = () => {
    useProtectedPage()
    const [posts,setPosts] = useState(undefined)
    const [filteredPosts,setFilteredPosts] = useState([])
    const [searchContent,setSearchContent] = useState("")
    const [collection, setCollection] = useState([])

    var dayjs = require('dayjs')
    var advancedFormat = require('dayjs/plugin/advancedFormat')
    dayjs.extend(advancedFormat)

    const timeCalculator = () => {
        const timeCalc=Math.round((Date.now()-(dayjs(collection[0].date).valueOf())))
        if (timeCalc<=86400000) {
            return 'hoje'
        } else if((timeCalc/86400000)>1 && (timeCalc/86400000)<2) {
                return 'ontem'
            } else {
                return 'há ' + ((Math.round(timeCalc/86400000)) - 1) + ' dias'
        } 
    }

    const params = useParams()

    useEffect(()=>{
        GetCollectionDetails()
        topFunction()
    },[])

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    
    const GetCollectionDetails = () => {
        Axios.get(`${BASE_URL}/collections/get/${params.id}`,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((res)=>{
            console.log(res.data)
            setPosts(res.data.result[1])
            setCollection(res.data.result[0])
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

    let mybutton = document.getElementById("back-to-top")
    window.onscroll = function() {scrollFunction()}
    
    function scrollFunction() {
        if (posts!==undefined) {
                if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                    mybutton.style.display = "block"
                } else {
                    mybutton.style.display = "none"
                }
        }
    }

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

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
                            collection.length===0 ? "" :
                            <div>
                            <p>{collection[0].title}</p>
                            <p>{collection[0].subtitle}</p>
                            <p>Criado {timeCalculator()}</p>
                            {posts.sort((a, b) => a.date < b.date ? 1:-1).map(post=> {
                                return(
                                    <Post
                                        key={post.id}
                                        id={post.id}
                                        subtitle={post.subtitle}
                                        title={post.title}
                                        tags={post.tags}
                                        createdAt={dayjs(post.date).valueOf()}
                                        file={post.file}
                                    />
                                )
                            })}
                            </div>
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
                <BackToTop onClick={topFunction} id="back-to-top" style={{ backgroundColor: red[500] }}>
                    <KeyboardArrowUp style={{ color: grey[50] }}/>
                </BackToTop>
            </PostPageContainer>
        </div>
    )
}

export default CollectionPage