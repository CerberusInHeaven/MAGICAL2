'use client'
import { CardArtefato } from "@/components/CardArtefato";
import { InputPesquisa } from "@/components/InputPesquisa";
import { ArtefatoItf } from "@/utils/types/ArtefatoItf";
import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/ClienteContext"

export default function Home() {
  const [artefatos, setArtefatos] = useState<ArtefatoItf[]>([])
  const { logaCliente } = useClienteStore()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/artefatos`)
      const dados = await response.json()
      console.log(dados)
      setArtefatos(dados)
    }
    buscaDados()

    async function buscaCliente(id: string) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${id}`)
      const dados = await response.json()
      logaCliente(dados)
    }
    if (localStorage.getItem("clienteKey")) {
      const idCliente = localStorage.getItem("clienteKey")
      buscaCliente(idCliente as string)
    }
  }, [])

  const listaCarros = artefatos.map( artefato => (
    <CardArtefato data={artefato} key={artefato.id} />
  ))

  return (
    <>
      <InputPesquisa setCarros={setArtefatos} />
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Veículos <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">em destaque</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {listaCarros}
        </div>
      </div>
    </>
  );
}
