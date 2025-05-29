import { Combustiveis, PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'

const prisma = new PrismaClient()
// const prisma = new PrismaClient({
//   log: [
//     {
//       emit: 'event',
//       level: 'query',
//     },
//     {
//       emit: 'stdout',
//       level: 'error',
//     },
//     {
//       emit: 'stdout',
//       level: 'info',
//     },
//     {
//       emit: 'stdout',
//       level: 'warn',
//     },
//   ],
// })

// prisma.$on('query', (e) => {
//   console.log('Query: ' + e.query)
//   console.log('Params: ' + e.params)
//   console.log('Duration: ' + e.duration + 'ms')
// })

const router = Router()

const carroSchema = z.object({
  nome: z.string().min(2,
    { message: "artefato deve possuir, no mínimo, 2 caracteres" }),
  poder: z.number(),
  preco: z.number(),
  
  foto: z.string(),
  encantamentos: z.string().nullable().optional(),
  raridade: z.nativeEnum(Combustiveis).optional(),
  destaque: z.boolean().optional(),
  tipoId: z.number(),
})

router.get("/", async (req, res) => {
  try {
    const carros = await prisma.artefato.findMany({
      include: {
        tipo: true,
      }
    })
    res.status(200).json(carros)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.post("/", async (req, res) => {

  const valida = carroSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { nome, poder, preco, foto, encantamentos = null,
    destaque = true, raridade = 'COMUM', tipoId } = valida.data

  try {
    const carro = await prisma.artefato.create({
      data: {
        nome, poder, preco,  foto, encantamentos, destaque,
        raridade, tipoId
      }
    })
    res.status(201).json(carro)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const carro = await prisma.artefato.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(carro)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params

  const valida = carroSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { nome, poder, preco, foto, encantamentos,
    destaque, raridade, tipoId } = valida.data

  try {
    const carro = await prisma.artefato.update({
      where: { id: Number(id) },
      data: {
        nome, poder, preco, foto, encantamentos,
        destaque, raridade, tipoId
      }
    })
    res.status(200).json(carro)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.get("/pesquisa/:termo", async (req, res) => {
  const { termo } = req.params

  // tenta converter para número
  const termoNumero = Number(termo)

  // is Not a Number, ou seja, se não é um número: filtra por texto
  if (isNaN(termoNumero)) {
    try {
      const carros = await prisma.artefato.findMany({
        include: {
          tipo: true,
        },
        where: {
          OR: [
            // mode: "insensitive" - para pesquisas no PostgreSQL não diferenciarem
            // caracteres maiúsculas de minúsculas (MySQL, não precisa)
            { nome: { contains: termo, mode: "insensitive" } },
            { tipo: { nome: { equals: termo, mode: "insensitive" } } }
          ]
        }
      })
      res.status(200).json(carros)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  } else {
    // Para números "pequenos", pesquisa por ano
    if (termoNumero <= 3000) {
      try {
        const carros = await prisma.artefato.findMany({
          include: {
            tipo: true,
          },
          where: { poder: termoNumero }
        })
        res.status(200).json(carros)
      } catch (error) {
        res.status(500).json({ erro: error })
      } 
      // else: para números "maiores", pesquisa por preço 
    } else {
      try {
        const carros = await prisma.artefato.findMany({
          include: {
            tipo: true,
          },
          where: { preco: { lte: termoNumero } }
        })
        res.status(200).json(carros)
      } catch (error) {
        res.status(500).json({ erro: error })
      }
    }
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const carro = await prisma.artefato.findUnique({
      where: { id: Number(id)},
      include: {
        tipo: true,
        fotos: true
      }
    })
    res.status(200).json(carro)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
