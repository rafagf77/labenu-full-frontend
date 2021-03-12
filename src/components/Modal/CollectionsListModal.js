import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { grey, red } from '@material-ui/core/colors'
import Axios from "axios";
import { BASE_URL } from "../../constants/URLs";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

export default function CollectionsListModal(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [collections, setCollections] = useState([])
    const [state, setState] = useState([{}]);
    

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked })
    }
    console.log("checkbox",state)
    
    useEffect(()=>{
        GetAllCollections()
        const collectionsId = props.collections === undefined ? [] : props.collections
        for (let i=0;i<collectionsId.length;i++) {
            setState({ ...state, [collectionsId[i].id]: true })
            console.log(state)
        }
        console.log(collectionsId)
    },[])

    const GetAllCollections = () => {
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

    const ManageCollections = () => {
        handleClose()
        // Axios.get(`${BASE_URL}/collections/all`,
        // {
        //     headers: {
        //         Authorization: localStorage.getItem("token")
        //     }
        // })
        // .then((res)=>{
        //     console.log(res)
        //     setCollections(res.data.result)
        // })
        // .catch((err)=>{
        //     console.log(err)
        // })
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" style={{ color: grey[50], backgroundColor: red[500] }} onClick={handleOpen}>
                +/- Álbum
            </Button>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2>Álbuns existentes</h2>
                    <div>
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
                    </div>
                    <Button type="submit" onClick={ManageCollections} variant="contained" style={{ color: grey[50], backgroundColor: red[500] }}>Confirmar</Button>
                    
                </div>
            </Modal>
        </div>
    );
}