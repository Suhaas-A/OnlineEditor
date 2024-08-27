import { useEffect, useState } from "react"
import axios from "axios"
import { InputAdornment, Box, Card, List, ListItem, Modal, IconButton, TextField, Divider, Button, Container, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';

function CreateListFiles() {
    const [files, setFiles] = useState([]);
    const [fileName, setFileName] = useState('');
    const [goUpdate, setGoUpdate] = useState('');
    const [open, setOpen] = useState(false);
    const [newName, setNewName] = useState('');
    const [currentFileId, setCurrentFileId] = useState(0);

    async function list() {
        const response = await axios.get('https://OnlineEditorMaster.pythonanywhere.com/api/list_create_files/', {
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            }
        })

        return response
    };

    async function deleteFile(id) {
        axios.delete('https://OnlineEditorMaster.pythonanywhere.com/api/view_update_delete_files/' + String(id), {
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            }
        }).then((response) => {
            console.log(response);
            window.location.href = '/create-list-files'
        })
    }

    async function editFile() {
        axios.patch('https://OnlineEditorMaster.pythonanywhere.com/api/view_update_delete_files/' + String(currentFileId), {'name': newName}, {
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            }
        }).then((response) => {
            console.log(response);
            window.location.href = '/create-list-files'
        })
    }

    useEffect(() => {
        list().then((response) => {
            setFiles(response.data);
            console.log(response.data);
            setFileName('');
        }).catch((error) => {
            alert(error);
        });
    }, [goUpdate])

    function create() {
        axios.post('https://OnlineEditorMaster.pythonanywhere.com/api/list_create_files/', {'name': String(fileName), 'created_by': String(sessionStorage.username)}, {
            headers: {
                Authorization: `Bearer ${sessionStorage.accessToken}`
            }
        }).then((response)=> {
            setGoUpdate(response)
        }).catch((error) => {
            alert(error)
            console.log({'name': String(fileName), 'created_by': String(sessionStorage.username)});            
        });
    }

    return (
        <>
            <Container sx={{textAlign: 'center'}}>
                <Typography variant="h4" component="div">Create a File</Typography>
                <br></br>
                <TextField variant="filled" placeholder="File name" value={fileName} onChange={function (e) { setFileName(e.target.value) }}></TextField>
                <br></br><br></br>
                <Button variant="contained" onClick={create}>Create File</Button>
            </Container>

            <br></br><br></br>

            <Divider></Divider>

            <br></br>

            <Container>
                <Typography variant="h4" component="div" sx={{textAlign: 'center'}}>Existing Files</Typography>

                <br></br>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><b>File Name</b></TableCell>
                                <TableCell align="center"><b>Create Date</b></TableCell>
                                <TableCell align="center"><b>Delete</b></TableCell>
                                <TableCell align="center"><b>Rename</b></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                                {
                                    files.map((file, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center" onClick={function () {window.location.href = '/view-update-delete-file/' + file.id}}>{file.name}</TableCell>
                                            <TableCell align="center">
                                                {
                                                    new Date(file.date_of_creation).toLocaleString('en-GB')
                                                }
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton sx={{ color: 'red' }} onClick={function () {deleteFile(file.id)}}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton onClick={function () {setOpen(true); setCurrentFileId(file.id); setNewName(file.name)}}>
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            <Modal
                open={open}
                onClose={function() { setOpen(false) }}
            >
                <Box width="45%" height="28%" position="fixed" left="27%" top="31%">
                    <Card elevation={6} focused style={{padding: "5%", backgroundColor: "whitesmoke"}}>
                        <List>
                            <ListItem>
                                <TextField
                                    focused
                                    variant="outlined"
                                    required
                                    fullWidth
                                    col
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton>
                                                    <EditIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={newName}
                                    onChange={function (e) {setNewName(e.target.value)}}
                                />
                            </ListItem>
                            <ListItem>
                                <Button variant="contained" color="primary" fullWidth onClick={editFile}>
                                    Edit
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                </Box>
            </Modal>
        </>
    )
}

export default CreateListFiles