import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import ImageCard from '../../components/ImageCard/ImageCard'
import { useProtectedPage } from '../../hooks/UseProtectedPage'
import { NewCollectionContainer, BackToTop, PostPageContainer, Loading } from './styles'
import { Button, TextField, Typography, CircularProgress } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { grey, red } from '@material-ui/core/colors'
import { KeyboardArrowUp } from '@material-ui/icons'
import Axios from 'axios'
import { BASE_URL } from '../../constants/URLs'
import Post from '../../components/Post/Post'
import CollectionCard from '../../components/CollectionCard/CollectionCard'
import { useForm } from '../../hooks/UseForm'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const CollectionsListPage = () => {
    var dayjs = require('dayjs')
    var advancedFormat = require('dayjs/plugin/advancedFormat')
    dayjs.extend(advancedFormat)

    useProtectedPage()
    const [collections, setCollections] = useState([])
    const {form, onChange, resetState} = useForm({ title: "", subtitle: "" })

    const handleInputChange = (event) => {
        const { value, name } = event.target
        onChange(value, name)
    }

    useEffect(()=>{
        GetAllCollections()
        topFunction()
    },[])

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    
    const GetAllCollections = () => {
        Axios.get(`${BASE_URL}/collections/all`,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((res)=>{
            console.log(res)
            setCollections(res.data.result)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const AddCollection = (event) => {
        event.preventDefault()

        const body = {
            "title": form.title,
            "subtitle": form.subtitle,
        }
        Axios.post(`${BASE_URL}/collections/post`, body,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((res)=>{
            Swal.fire(
                'Concluído!',
                'Seu álbum foi criado.',
                'success'
            )
            resetState()
            GetAllCollections()
        })
        .catch((err)=>{
            console.log(err)
            Swal.fire(
                'Problema!',
                'Seu álbum NÃO foi criado.',
                'error'
            )
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
                    <div>
                        <NewCollectionContainer>
                            <TextField
                                name="title"
                                value={form.title}
                                label="Título"
                                variant="outlined"
                                color="primary"
                                style={{ backgroundColor: grey[50] }}
                                required
                                onChange={handleInputChange}
                                placeholder="Escreva o nome do novo álbum"
                            />
                            <TextField
                                name="subtitle"
                                value={form.subtitle}
                                label="Descrição"
                                variant="outlined"
                                color="primary"
                                style={{ backgroundColor: grey[50] }}
                                required
                                onChange={handleInputChange}
                                placeholder="Escreva a descrição do novo álbum"
                            />
                            <Button type="submit" onClick={AddCollection} variant="contained" style={{ color: grey[50], backgroundColor: red[500] }}>Criar Álbum</Button>
                        </NewCollectionContainer>

                        {collections.sort((a, b) => a.date < b.date ? 1:-1).map(collection=> {
                            return(
                                <CollectionCard
                                    key={collection.id}
                                    id={collection.id}
                                    title={collection.title}
                                    subtitle={collection.subtitle}
                                    createdAt={dayjs(collection.date).valueOf()}
                                    getAllCollections={GetAllCollections}
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

export default CollectionsListPage