-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "debt" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "enterpriseId" INTEGER NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accounts" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "debt" DOUBLE PRECISION NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
