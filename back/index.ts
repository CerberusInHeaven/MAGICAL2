import express from 'express'
import cors from 'cors'
import routesCarros from './routes/artefatos'
import routesFotos from './routes/fotos'
import routesClientes from './routes/clientes'
import routesLogin from './routes/login'
import routesPropostas from './routes/propostas'
import routeTipo from'./routes/tipos'
const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

app.use("/artefatos", routesCarros)
app.use("/fotos", routesFotos)
app.use("/clientes", routesClientes)
app.use("/clientes/login", routesLogin)
app.use("/propostas", routesPropostas)
app.use("/tipos", routeTipo)

app.get('/', (req, res) => {
  res.send('WORLD OF ARTIFACTS OF POWER')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})