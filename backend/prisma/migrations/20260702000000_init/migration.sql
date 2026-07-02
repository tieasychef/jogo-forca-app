
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "ResultadoPartida" AS ENUM ('VITORIA', 'DERROTA');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "pontuacao" INTEGER NOT NULL DEFAULT 0,
    "partidas" INTEGER NOT NULL DEFAULT 0,
    "vitorias" INTEGER NOT NULL DEFAULT 0,
    "derrotas" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partidas" (
    "id" UUID NOT NULL,
    "usuario_id" UUID NOT NULL,
    "palavra" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "resultado" "ResultadoPartida" NOT NULL,
    "tentativas" INTEGER NOT NULL,
    "erros" INTEGER NOT NULL,
    "tempo_partida" INTEGER NOT NULL,
    "pontos_ganhos" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "partidas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "usuarios_pontuacao_idx" ON "usuarios"("pontuacao");

-- CreateIndex
CREATE INDEX "partidas_usuario_id_idx" ON "partidas"("usuario_id");

-- CreateIndex
CREATE INDEX "partidas_categoria_idx" ON "partidas"("categoria");

-- CreateIndex
CREATE INDEX "partidas_created_at_idx" ON "partidas"("created_at");

-- AddForeignKey
ALTER TABLE "partidas" ADD CONSTRAINT "partidas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

