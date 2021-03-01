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

const PostPage = () => {
    useProtectedPage()
    const history = useHistory()
    const [tags, setTags] = useState([])
    const {form, onChange, resetState} = useForm({ subtitle: "", file: "", collection: "", tags: "" })

    const handleInputChange = (event) => {
        const { value, name } = event.target
        onChange(value, name)
    }

    useEffect(()=>{
        // topFunction()
    },[])

    const inputTags = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault()
            setTags([ ...tags, form.tags ])
            // resetState()
          }
    }
    console.log(tags)
    const SendImage = (event) => {
        event.preventDefault()
        const body = {
                "subtitle": form.subtitle,
                "file": form.file,
                "collection": form.collection,
                "tags": tags
        }
        console.log(body)
        Axios.post(`${BASE_URL}/images/post`, body,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((res)=>{
            alert("Imagem postada com sucesso")
            resetState()
            goToFeedPage(history)
        })
        .catch((err)=>{
            console.log(err)
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
                        name="collection"
                        value={form.collection}
                        label="Álbum"
                        variant="outlined"
                        color="primary"
                        style={{ backgroundColor: grey[50] }}
                        required
                        onChange={handleInputChange}
                        placeholder="Escreva o nome do álbum aqui"
                    />
                    <TextField
                        name="tags"
                        value={form.tags}
                        label="Etiquetas"
                        variant="outlined"
                        color="primary"
                        style={{ backgroundColor: grey[50] }}
                        required
                        onChange={handleInputChange}
                        onKeyDown={inputTags}
                        placeholder="Escreva o nome da etiqueta e aperte Enter para incluí-la"
                    />
                    <Button type="submit" onClick={SendImage} variant="contained" style={{ color: grey[50], backgroundColor: red[500] }}>Postar imagem</Button>
                </NewCommentContainer>
            </PostPageContainer>
        </div>
    )
}

export default PostPage