import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { grey, red } from '@material-ui/core/colors'
import { TextField } from "@material-ui/core";
import { useForm } from "../../hooks/UseForm";
import Axios from "axios";
import { BASE_URL } from "../../constants/URLs";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function CollectionModal(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const {form, onChange, resetState} = useForm({ title: "", subtitle: "" })

    const handleInputChange = (event) => {
        const { value, name } = event.target
        onChange(value, name)
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
        })
        .catch((err)=>{
            console.log(err)
            Swal.fire(
                'Problema!',
                'Seu álbum NÃO foi criado.',
                'error'
            )
        })

        handleClose()
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        {props.getAllCollections()}
    };

    return (
        <div>
            <Button variant="outlined" style={{ color: red[500], borderColor: red[500], backgroundColor: grey[50] }} onClick={handleOpen}>
                Novo Álbum
            </Button>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2>Novo Álbum</h2>
                    <div>
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
                    </div>
                    <Button type="submit" onClick={AddCollection} variant="contained" style={{ color: grey[50], backgroundColor: red[500] }}>Criar Álbum</Button>
                    
                </div>
            </Modal>
        </div>
    );
}