import { ArtefatoItf } from "./ArtefatoItf"

export interface FotoItf {
    id: number
    encantamentos: string
    artefatoId: number
    url: string
    artefato: ArtefatoItf
}