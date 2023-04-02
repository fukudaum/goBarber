/*
  Warnings:

  - Added the required column `client_id` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "client_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
