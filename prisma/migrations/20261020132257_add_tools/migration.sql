/*
  Warnings:

  - You are about to drop the `Tool` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tool_units" DROP CONSTRAINT "tool_units_tool_id_fkey";

-- DropTable
DROP TABLE "Tool";

-- CreateTable
CREATE TABLE "tools" (
    "toolID" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "tools_pkey" PRIMARY KEY ("toolID")
);

-- CreateIndex
CREATE UNIQUE INDEX "tools_name_key" ON "tools"("name");

-- AddForeignKey
ALTER TABLE "tool_units" ADD CONSTRAINT "tool_units_tool_id_fkey" FOREIGN KEY ("tool_id") REFERENCES "tools"("toolID") ON DELETE RESTRICT ON UPDATE CASCADE;
