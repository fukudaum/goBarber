import { PrismaClient } from "@prisma/client";

// class PrismaService extends PrismaClient implements OnModuleInit {
//     constructor(){
//         super();
//     }

//     async onModuleInit() {
//         await this.$connect();
//     }
// }

export const prismaClient = new PrismaClient();
