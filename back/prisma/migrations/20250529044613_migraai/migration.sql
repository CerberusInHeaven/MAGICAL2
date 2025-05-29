-- CreateEnum
CREATE TYPE "Combustiveis" AS ENUM ('COMUM', 'MAGICO', 'EPICO', 'CAMPEAO');

-- CreateTable
CREATE TABLE "Tipo" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(30) NOT NULL,

    CONSTRAINT "Tipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artefatos" (
    "id" SERIAL NOT NULL,
    "poder" SMALLINT NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "foto" TEXT NOT NULL,
    "encantamentos" TEXT,
    "raridade" "Combustiveis" NOT NULL DEFAULT 'COMUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "destaque" BOOLEAN NOT NULL DEFAULT true,
    "tipoId" INTEGER NOT NULL,

    CONSTRAINT "artefatos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fotos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(40) NOT NULL,
    "url" TEXT NOT NULL,
    "artefatoId" INTEGER NOT NULL,

    CONSTRAINT "fotos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" VARCHAR(36) NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "senha" VARCHAR(60) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "propostas" (
    "id" SERIAL NOT NULL,
    "clienteId" VARCHAR(36) NOT NULL,
    "artefatoId" INTEGER NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "resposta" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "propostas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "artefatos" ADD CONSTRAINT "artefatos_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "Tipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fotos" ADD CONSTRAINT "fotos_artefatoId_fkey" FOREIGN KEY ("artefatoId") REFERENCES "artefatos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propostas" ADD CONSTRAINT "propostas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propostas" ADD CONSTRAINT "propostas_artefatoId_fkey" FOREIGN KEY ("artefatoId") REFERENCES "artefatos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
