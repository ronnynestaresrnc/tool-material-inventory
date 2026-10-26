-- CreateTable
CREATE TABLE "employees" (
    "employeeID" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "dni" VARCHAR(8) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("employeeID")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_dni_key" ON "employees"("dni");
