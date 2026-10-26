
import "dotenv/config";

import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });
async function main() {
  // 1. Empleados
  await prisma.employee.createMany({
    data: [
      {
        name: 'Carlos',
        lastName: 'Paz',
        dni: '70000001',
      },
      {
        name: 'Luis',
        lastName: 'Ramos',
        dni: '70000002',
      },
    ],
    skipDuplicates: true,
  });

  // 2. Herramientas
  const tools = [
    'Hidrolavadora',
    'Escalera telescópica',
    'Aspiradora industrial',
  ];

  for (const name of tools) {
    await prisma.tool.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // 3. Unidades físicas
  const units = [
    { tool: 'Hidrolavadora', serialCode: 'HIDRO-01' },
    { tool: 'Hidrolavadora', serialCode: 'HIDRO-02' },
    { tool: 'Hidrolavadora', serialCode: 'HIDRO-03' },
    { tool: 'Hidrolavadora', serialCode: 'HIDRO-04' },
    { tool: 'Hidrolavadora', serialCode: 'HIDRO-05' },
    { tool: 'Hidrolavadora', serialCode: 'HIDRO-06' },
    { tool: 'Escalera telescópica', serialCode: 'ESC-01' },
    { tool: 'Escalera telescópica', serialCode: 'ESC-02' },
    { tool: 'Escalera telescópica', serialCode: 'ESC-03' },
    { tool: 'Aspiradora industrial', serialCode: 'ASP-01' },
    { tool: 'Aspiradora industrial', serialCode: 'ASP-02' },
  ];

  for (const item of units) {
    const tool = await prisma.tool.findUniqueOrThrow({
      where: { name: item.tool },
    });

    await prisma.toolUnit.upsert({
      where: { serialCode: item.serialCode },
      update: {},
      create: {
        toolId: tool.toolID,
        serialCode: item.serialCode,
      },
    });
  }

  // 4. Materiales
  const materials = [
    {
      name: 'Limpiafrenos',
      description: 'Frasco de 1 litro',
      unit: 'Frasco',
      quantity: 20,
    },
    {
      name: 'Cinta teflón',
      description: 'Rollo de 10 metros',
      unit: 'Metro',
      quantity: 50,
    },
    {
      name: 'Trapos industriales',
      description: 'Paquete de trapos de limpieza',
      unit: 'Unidad',
      quantity: 30,
    },
    {
      name: 'Cinta platina',
      description: 'Cinta para mantenimiento',
      unit: 'Metro',
      quantity: 0,
    },
    {
      name: 'Alkifón',
      description: 'Adhesivo para mantenimiento',
      unit: 'Litro',
      quantity: 0,
    },
    {
      name: 'Brocha',
      description: 'Brocha para aplicación de productos',
      unit: 'Unidad',
      quantity: 0,
    },
    {
      name: 'Cinta de aluminio',
      description: 'Cinta para aislamiento',
      unit: 'Metro',
      quantity: 0,
    },
  ];

  for (const item of materials) {
    const existing = await prisma.material.findFirst({
      where: { name: item.name },
    });

    if (!existing) {
      await prisma.material.create({
        data: item,
      });
    }
  }

  console.log('Datos de prueba registrados correctamente.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
