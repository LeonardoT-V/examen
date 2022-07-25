const restana = require('restana')
const mongoose = require('mongoose')
const cors = require('cors')
const parser = require('body-parser')
const service = restana()
service.use(cors())
service.use(parser.json())

const Cuenta = mongoose.model('Client', { nombre: String, saldo: Number, correo: String,direccion: String });


mongoose.connect('mongodb+srv://root:root@cluster0.jcxnv.mongodb.net/yelp?retryWrites=true&w=majority')
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.log(err))

service.post('/cliente', async(req, res) => {
  console.log(req.body);
  const {nombre, saldo, correo, direccion} = req.body
  const cuenta = new Cuenta({nombre, saldo, correo, direccion })
  await cuenta.save()
  res.send({hola: 'mundo'})
})

service.get('/banco', async(req, res) => {
  const cuentas = await Cuenta.find()
  res.send({cuentas})
})

service.delete('/cliente/:id', async(req, res) => {
  const {id} = req.params

  await Cuenta.deleteOne({_id: id})
})

service.put('/cliente/:id', async(req, res) => {
  console.log(req.params);
  const {id} = req.params
  const {nombre, saldo, correo, direccion} = req.body
  await Cuenta.findOneAndUpdate({_id:id}, {nombre, saldo, correo, direccion })
  return
})

service.start(3000);