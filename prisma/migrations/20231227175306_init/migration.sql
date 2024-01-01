-- CreateTable
CREATE TABLE "TreeCategory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "TreeCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TreeCategory" ADD CONSTRAINT "TreeCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "TreeCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
