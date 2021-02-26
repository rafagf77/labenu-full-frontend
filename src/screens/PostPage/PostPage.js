import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { useForm } from '../../hooks/UseForm'
import { useProtectedPage } from '../../hooks/UseProtectedPage'
import { BackToTop, CommentsContainer, NewCommentContainer, PostPageContainer, Loading } from './styles'
import { Button, TextField, Typography, CircularProgress } from '@material-ui/core'
import { grey, red } from '@material-ui/core/colors'
import { KeyboardArrowUp } from '@material-ui/icons'
import Axios from 'axios'

const PostPage = () => {
    useProtectedPage()

    const {form, onChange, resetState} = useForm({ text: "", title: "" })

    const handleInputChange = (event) => {
        const { value, name } = event.target
        onChange(value, name)
    }

    useEffect(()=>{
        // setInterval(updatePage, 180000)
        // GetPostDetails()
        // topFunction()
    },[])

    const GetTags = () => {
        // Axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${params.id}`,
        // {
        //     headers: {
        //         Authorization: localStorage.getItem("token")
        //     }
        // })
        // .then((res)=>{
        //     setPostDetails(res.data.post)
        // })
        // .catch((err)=>{
        //     console.log(err)
        // })
    }

    const SendImage = () => {
        
    }
    
    return (
        <div>
            <Header />
                <PostPageContainer>
                <NewCommentContainer onSubmit={SendImage}>
                    <TextField
                        name='text'
                        value={form.text}
                        label="Novo Comentário"
                        variant="outlined"
                        color="primary"
                        style={{ backgroundColor: grey[50] }}
                        multiline
                        required
                        onChange={handleInputChange}
                        placeholder="Escreva um comentário aqui"
                    />
                    <Button type="submit" type="submit" variant="contained" color="primary">Enviar comentário</Button>
                </NewCommentContainer>
            </PostPageContainer>
        </div>
    )
}

export default PostPage