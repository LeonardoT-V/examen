import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, colors } from '@mui/material';

import Edit from '../components/Edit'

const TablaUsuario = ({actualizar, setActualizar}) => {

  const [clientes, setClientes] = useState([])
  useEffect(() => {
    if( actualizar ){
      fetch(`http://localhost:3000/banco`)
      .then(res => res.json())
      .then(data => {
        const {cuentas} = data
        setClientes(cuentas)
      });
      setActualizar(false)
    }
  }, [actualizar])


  const eliminiarCliente = (id) => {
    fetch(`http://localhost:3000/cliente/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(data => console.log(data))
    setActualizar(true)
  }


  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{backgroundColor: colors.blue[600]}}>
          <TableRow>
            <TableCell sx={{color:'white'}}>Nombre</TableCell>
            <TableCell sx={{color:'white'}} align="right">Saldo</TableCell>
            <TableCell sx={{color:'white'}} align="right">Correo</TableCell>
            <TableCell sx={{color:'white'}} align="right">Direccion</TableCell>
            <TableCell sx={{color:'white'}} align="right"></TableCell>
            <TableCell sx={{color:'white'}} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nombre}
              </TableCell>
              <TableCell align="right">{row.saldo}</TableCell>
              <TableCell align="right">{row.correo}</TableCell>
              <TableCell align="right">{row.direccion}</TableCell>
              <TableCell align="right"><Edit id={row._id} data={row} setActualizar={setActualizar} /> </TableCell>
              <TableCell align="right"><Button variant='outlined' color='error' onClick={() => eliminiarCliente(row._id)}>delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TablaUsuario