-- CreateTable
CREATE TABLE "loan" (
    "loan_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "destination" VARCHAR(100),
    "loan_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(20) DEFAULT 'Entregado',

    CONSTRAINT "loan_pkey" PRIMARY KEY ("loan_id")
);

-- CreateTable
CREATE TABLE "loan_tool" (
    "loan_id" INTEGER NOT NULL,
    "unit_id" INTEGER NOT NULL,

    CONSTRAINT "loan_tool_pkey" PRIMARY KEY ("loan_id","unit_id")
);

-- CreateTable
CREATE TABLE "loan_material" (
    "loan_id" INTEGER NOT NULL,
    "material_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "loan_material_pkey" PRIMARY KEY ("loan_id","material_id")
);

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("employeeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_tool" ADD CONSTRAINT "loan_tool_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "loan"("loan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_tool" ADD CONSTRAINT "loan_tool_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "tool_units"("unit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_material" ADD CONSTRAINT "loan_material_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "loan"("loan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_material" ADD CONSTRAINT "loan_material_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("materialID") ON DELETE RESTRICT ON UPDATE CASCADE;
