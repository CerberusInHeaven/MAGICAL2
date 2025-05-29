/*
  Warnings:

  - Added the required column `nome` to the `artefatos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "artefatos" ADD COLUMN     "nome" VARCHAR(100) NOT NULL;
