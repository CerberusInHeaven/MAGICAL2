import { ArtefatoItf } from "./ArtefatoItf"

export interface PropostaItf {
  id: number
  clienteId: string
  artefatoId: number
  artefato: ArtefatoItf
  encantamentos: string
  resposta: string | null
  createdAt: string
  updatedAt: string | null
}