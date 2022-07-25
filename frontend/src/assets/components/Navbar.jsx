import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

const Navbar = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h5'>App Banco</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar