import React, {useState} from 'react'
import { Button, Paper, TextField, Typography } from '@mui/material'

const Generador = () => {
  const [formulario, setFormulario] = useState({nombre:'', limite: ''})

  const asignarDatos = (e) => {
    setFormulario({
        ...formulario,
        [e.target.name]: e.target.value
    })
  }
  const agregarClientes = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/generar', {
      method: 'POST',
      body: JSON.stringify(formulario),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => console.log(data))
    setActualizar(true)
    setFormulario({nombre:'', limite:''})
  }
  return (
    <Paper sx={{p:'16px'}}>
      <Typography variant='h5' sx={{mb: '10px'}}>Ingreso de clientes</Typography>
      <form onSubmit={agregarClientes}>
        <TextField required label="Ingrese su nombre" value={formulario.nombre} fullWidth variant="outlined"
            margin='dense' name="nombre" onChange={asignarDatos} />
        <TextField required type="number" label="Ingrese cantidad a generar" value={formulario.limite} fullWidth variant="outlined"
            margin='dense' name="limite" onChange={asignarDatos} />
        <Button fullWidth variant="contained" disableElevation type="submit" sx={{mt:'10px'}} >
            Agregar
        </Button>
    </form>
  </Paper>
  )
}

export default Generador