import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, {useState} from 'react'

const Edit = ({data, setActualizar, id}) => {
  const [open, setOpen] = useState(false);
  const [formulario, setFormulario] = useState({nombre:data.nombre, direccion:data.direccion, saldo:data.saldo, correo:data.correo})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormulario({nombre:data.nombre, direccion:data.direccion, saldo:data.saldo, correo:data.correo})
  };
  const asignarDatos = (e) => {
    setFormulario({
        ...formulario,
        [e.target.name]: e.target.value
      })
    }
  const editarCliente = (e) => {
    e.preventDefault()
    console.log(formulario+ data._id)
    fetch(`http://localhost:3000/cliente/${id}`, {
      method: 'PUT',
      body: JSON.stringify(formulario),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => console.log(data))
    setActualizar(true)
    handleClose()
    window.location.reload()
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editando cliente {data.nombre}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Acontinuacion edite los campos que desee {data._id}
          </DialogContentText>
          <TextField required label="Ingrese su nombre"  value={formulario.nombre} fullWidth variant="outlined"
            margin='dense' name="nombre" onChange={asignarDatos} />
        <TextField required type="email" label="Ingrese su correo"  value={formulario.correo} fullWidth variant="outlined"
            margin='dense' name="correo" onChange={asignarDatos} />
        <TextField required type="number" label="Ingrese su saldo"  value={formulario.saldo} fullWidth variant="outlined"
            margin='dense' name="saldo" onChange={asignarDatos} />
        <TextField required label="Ingrese su direccion"  value={formulario.direccion} fullWidth variant="outlined"
            margin='dense' name="direccion" onChange={asignarDatos} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={editarCliente}>Editar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Edit
