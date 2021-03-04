import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { useForm } from '../../hooks/UseForm'
import { useProtectedPage } from '../../hooks/UseProtectedPage'
import { BackToTop, CommentsContainer, NewCommentContainer, PostPageContainer, Loading } from './styles'
import { Button, TextField, Typography, CircularProgress } from '@material-ui/core'
import { grey, red } from '@material-ui/core/colors'
import { KeyboardArrowUp } from '@material-ui/icons'
import Axios from 'axios'
import { BASE_URL } from '../../constants/URLs'
import { goToFeedPage } from '../../router/Coordinator'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const PostPage = () => {
    useProtectedPage()
    const history = useHistory()
    const {form, onChange, resetState} = useForm({ subtitle: "", file: "", collections: "", tags: "" })

    const handleInputChange = (event) => {
        const { value, name } = event.target
        onChange(value, name)
    }

    useEffect(()=>{
        topFunction()
    },[])

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    const SendImage = (event) => {
        event.preventDefault()

        let tags = form.tags.split(" ")
        let i
        for(i=0;i<tags.length;i++) {
            tags[i]=tags[i].replace("#","")
            tags[i]="#"+tags[i]
        }

        const body = {
                "subtitle": form.subtitle,
                "file": form.file,
                "collections": form.newCollection,
                "tags": tags
        }
        Axios.post(`${BASE_URL}/images/post`, body,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((res)=>{
            Swal.fire(
                'Concluído!',
                'Sua imagem foi postada.',
                'success'
            )
            resetState()
            goToFeedPage(history)
        })
        .catch((err)=>{
            console.log(err)
            Swal.fire(
                'Problema!',
                'Sua imagem NÃO foi postada.',
                'error'
            )
        })
    }
    
    return (
        <div>
            <Header />
                <PostPageContainer>
                <NewCommentContainer onSubmit={SendImage}>
                    <TextField
                        name="subtitle"
                        value={form.subtitle}
                        label="Título"
                        variant="outlined"
                        color="primary"
                        style={{ backgroundColor: grey[50] }}
                        multiline
                        required
                        onChange={handleInputChange}
                        placeholder="Escreva um título aqui"
                    />
                    <TextField
                        name="file"
                        value={form.file}
                        label="Foto"
                        variant="outlined"
                        color="primary"
                        style={{ backgroundColor: grey[50] }}
                        required
                        onChange={handleInputChange}
                        placeholder="Cole o caminho da foto aqui"
                    />
                    <TextField
                        name="tags"
                        value={form.tags}
                        label="Etiquetas"
                        variant="outlined"
                        color="primary"
                        style={{ backgroundColor: grey[50] }}
                        multiline
                        required
                        onChange={handleInputChange}
                        placeholder="Escreva os nomes das etiquetas separados com espaço"
                    />
                    <p>Álbuns existentes</p>
                    <TextField
                        name="collections"
                        value={form.newCollection}
                        label="Novo Álbum"
                        variant="outlined"
                        color="primary"
                        style={{ backgroundColor: grey[50] }}
                        required
                        onChange={handleInputChange}
                        placeholder="Escreva o nome do novo álbum"
                    />
                    <Button type="submit" onClick={SendImage} variant="contained" style={{ color: grey[50], backgroundColor: red[500] }}>Postar imagem</Button>
                </NewCommentContainer>
            </PostPageContainer>
        </div>
    )
}

export default PostPage