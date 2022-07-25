import { Container, Grid } from '@mui/material'
import { useState } from 'react'
import Formulario from './assets/components/Formulario'
import Generador from './assets/components/Generador'
import Navbar from './assets/components/Navbar'
import TablaUsuario from './assets/components/TablaUsuario'

function App() {
  const [actualizar, setActualizar] = useState(true)

  return (
    <>
    <Navbar />
    <Container sx={{mt:'32px'}}>
      <Grid container spacing={3} >

        <Grid item sm={4}>
          <Formulario setActualizar={setActualizar} />
        </Grid>

        <Grid item sm={8}>
          <TablaUsuario actualizar={actualizar} setActualizar={setActualizar} />
        </Grid>
      </Grid>
      </Container>
    </>
  )
}

export default App
