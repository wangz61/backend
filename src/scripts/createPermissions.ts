import prisma from "../prismaClient";

const createPermissions = async () => {
  await prisma.permission.createMany({
    data: [
      { name: "users:view" },
      { name: "users:edit" },
      { name: "users:create" },
      { name: "users:delete" },
      { name: "roles:view" },
      { name: "roles:edit" },
      { name: "roles:create" },
      { name: "roles:delete" },
      { name: "products:view" },
      { name: "products:edit" },
      { name: "products:create" },
      { name: "products:delete" },
      { name: "orders:view" },
      { name: "orders:edit" },
      { name: "orders:create" },
      { name: "orders:delete" },
    ],
    skipDuplicates: true,
  });

  console.log("Permissions created successfully");
};

createPermissions();
