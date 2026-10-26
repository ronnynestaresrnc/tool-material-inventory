-- CreateTable
CREATE TABLE "Tool" (
    "toolID" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("toolID")
);

-- CreateTable
CREATE TABLE "tool_units" (
    "unit_id" SERIAL NOT NULL,
    "tool_id" INTEGER NOT NULL,
    "serial_code" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'Disponible',

    CONSTRAINT "tool_units_pkey" PRIMARY KEY ("unit_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tool_name_key" ON "Tool"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tool_units_serial_code_key" ON "tool_units"("serial_code");

-- AddForeignKey
ALTER TABLE "tool_units" ADD CONSTRAINT "tool_units_tool_id_fkey" FOREIGN KEY ("tool_id") REFERENCES "Tool"("toolID") ON DELETE RESTRICT ON UPDATE CASCADE;
