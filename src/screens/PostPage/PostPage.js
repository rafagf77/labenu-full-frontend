import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { useForm } from '../../hooks/UseForm'
import { useProtectedPage } from '../../hooks/UseProtectedPage'
import { PostPageContainer, NewPostContainer } from './styles'
import { Button, TextField } from '@material-ui/core'
import { grey, red } from '@material-ui/core/colors'
import Axios from 'axios'
import { BASE_URL } from '../../constants/URLs'
import { goToFeedPage } from '../../router/Coordinator'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CollectionModal from '../../components/Modal/CollectionModal'

const PostPage = () => {

    useProtectedPage()

    useEffect(()=>{
        topFunction()
        getAllCollections()
    },[])

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    const history = useHistory()
    const [collections, setCollections] = useState([])
    const {form, onChange, resetState} = useForm({ subtitle: "", file: "", collections: "", tags: "" })
    const [state, setState] = useState([{}]);

    const handleInputChange = (event) => {
        const { value, name } = event.target
        onChange(value, name)
    }
    
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked })
    }
        
    const getAllCollections = () => {
        Axios.get(`${BASE_URL}/collections/all`,
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

    const SendImage = (event) => {
        event.preventDefault()

        let formTags = form.tags.split(" ")
        let tags = []
        for(let i=0;i<formTags.length;i++) {
            if(formTags[i]!==""){
                formTags[i]=formTags[i].replace("#","")
                tags.push("#"+formTags[i])
            }
        }
        
        let collectionsId = []
        for(let key in state) {
            if (state[key]===true){
                collectionsId = [...collectionsId, key]
            }
        }

        const body = {
                "subtitle": form.subtitle,
                "file": form.file,
                "collections": collectionsId,
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
            console.log(err.response.data)
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
                <NewPostContainer onSubmit={SendImage}>
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

                    {collections && collections.sort((a, b) => a < b ? 1:-1).map(collection => {
                        return(
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={state.checked}
                                        onChange={handleChange}
                                        name={collection.id}
                                        style={{ color: red[500] }}
                                    />
                                    }
                                    label={collection.title}
                                />
                            </FormGroup>
                        )
                    })}

                    <CollectionModal getAllCollections={getAllCollections}/>
                    
                    <Button type="submit" onClick={SendImage} variant="contained" style={{ color: grey[50], backgroundColor: red[500] }}>Postar imagem</Button>
                </NewPostContainer>
            </PostPageContainer>
        </div>
    )
}

export default PostPage