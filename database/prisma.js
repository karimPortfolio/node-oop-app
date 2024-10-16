
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

try
{
    prisma.$connect();
}
catch(err)
{
    console.log(err);
}


export { prisma };