-- CreateTable
CREATE TABLE "Lead" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'New',
    "source" TEXT,
    "notes" TEXT,
    "assignedToId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Lead_assignedToId_idx" ON "Lead"("assignedToId");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
