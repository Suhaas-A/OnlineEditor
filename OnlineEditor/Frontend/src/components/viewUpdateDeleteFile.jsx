import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from 'react-router-dom';
import { Button, TextField, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

function ViewUpdateDeleteFile() {
    const [content, setContent] = useState('');
    const [fileName, setFileName] = useState('');
    const [styles, setStyles] = useState({});
    const [goUpdate, setGoUpdate] = useState(0);
    const { id } = useParams();

    async function changeAccessToken() {
        try {
            let response = await axios.post('https://OnlineEditorMaster.pythonanywhere.com/api/login/refresh/', {
                'refresh': `${sessionStorage.refreshToken}`
            });

            let data = await response.data

            sessionStorage.setItem('accessToken', data['access']);

            window.location.reload();
        } catch (error) {
            window.location.href = '/login';
            console.log(error);
        }
    }

    async function view() {
        try {
            const response = await axios.get('https://OnlineEditorMaster.pythonanywhere.com/api/view_update_delete_files/' + String(id), {
                headers: {
                    Authorization: `Bearer ${sessionStorage.accessToken}`
                }
            });
        } catch (error) {
            changeAccessToken();
        }

        return response;
    }

    async function update(newValue) {
        try {
            axios.patch('https://OnlineEditorMaster.pythonanywhere.com/api/view_update_delete_files/' + String(id), {'content': newValue != '' ? newValue : null}, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.accessToken}`
                }
            }).then((response) => {
                console.log(response.data.content);
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            changeAccessToken();
        }
    }

    function changeStyles(attr, value) {
        let x = {};
        x.fontSize = styles.fontSize;
        x.fontStyle = styles.fontStyle;
        x.fontWeight = styles.fontWeight;
        x.height = styles.height;
        x.textDecorationLine = styles.textDecorationLine;
        x.width = styles.width;
        x[attr] = value;

        setStyles(x);

        try {
            axios.patch('https://OnlineEditorMaster.pythonanywhere.com/api/view_update_delete_files/' + String(id), {'styles': x}, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.accessToken}`
                }
            }).then((response) => {
                console.log(response);
                setGoUpdate(response);
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            changeAccessToken();
        }
    }

    async function del() {
        try {
            axios.delete('https://OnlineEditorMaster.pythonanywhere.com/api/view_update_delete_files/' + String(id), {
                headers: {
                    Authorization: `Bearer ${sessionStorage.accessToken}`
                }
            }).then((response) => {
                console.log(response);
                window.location.href = '/create-list-files'
            })
        } catch (error) {
            changeAccessToken();
        }
    }

    useEffect(() => {
        view().then((response) => {
            setContent(response.data.content);
            setFileName(response.data.name);
            setStyles(response.data.styles);
            console.log(response.data.content);
        }).catch((error) => {
            console.log(error);
        })
    }, [goUpdate])

    return (
        <>
            <Typography variant="h3" component="div" textAlign='center'>{fileName}</Typography>

            <TextField sx={{pt: 0.5}} size="small" variant="outlined" type="number" value={styles.fontSize} onChange={function (e) {changeStyles('fontSize', Number(e.target.value))}}></TextField>
            <Button sx={{color: 'black'}} size="large" onClick={function () {changeStyles('fontWeight', styles.fontWeight == 'initial' ? 'bold' : 'initial')}}><b>Bold</b></Button>
            <Button sx={{color: 'black'}} size="large" onClick={function () {changeStyles('fontStyle', styles.fontStyle == 'initial' ? 'italic' : 'initial')}}><i>Italic</i></Button>
            <Button sx={{color: 'black'}} size="large" onClick={function () {changeStyles('textDecorationLine', styles.textDecorationLine == 'initial' ? 'underline' : 'initial')}}><u>Underline</u></Button>
            <IconButton onClick={del} size="large" sx={{ color: 'red' }}>
                <DeleteIcon />
            </IconButton>
            <TextField rows={21} multiline fullWidth value={content != null ? content : ''} onChange={function (e) {setContent(e.target.value); update(e.target.value)}} InputProps={{style: styles}}></TextField>
        </>
    )
}

export default ViewUpdateDeleteFile
