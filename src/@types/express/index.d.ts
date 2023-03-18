declare namespace Express {
        export interface Request {
            user?: {
                id: string
            }
        }
}

// declare module "express-serve-static-core" {
//     export interface Request {
//         user?: {
//             id: string
//         }
//     }
//   }
