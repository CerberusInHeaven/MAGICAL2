import { FotoItf } from "./FotoItf"
import { tipoItf } from "./MarcaItf"

export interface ArtefatoItf {
    id: number
    nome: string
    poder: number
    preco: number
    destaque: boolean
    foto: string
    encantamentos: string
    createdAt: Date
    updatedAt: Date
    raridade: string
    tipoId: number
    tipo: tipoItf
    fotos: FotoItf[]
}