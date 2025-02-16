import prisma from "../prismaClient";

const createAdminRole = async () => { // JS Promise & Async/Await & Event Loop(important) non-blocking I/O
  await prisma.role.create({
    data: {
      name: "admin",
      permissions: {
        connect: [
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
      },
    },
  });

  console.log("Admin role created successfully");
};

createAdminRole();
