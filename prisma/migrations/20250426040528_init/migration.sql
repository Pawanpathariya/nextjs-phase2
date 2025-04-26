-- CreateTable
CREATE TABLE "ProductCate" (
    "id" SERIAL NOT NULL,
    "proCategory" TEXT NOT NULL,
    "proName" TEXT NOT NULL,
    "proPrice" TEXT NOT NULL,
    "proDescription" TEXT NOT NULL,
    "sameDay" BOOLEAN,
    "type" TEXT NOT NULL,
    "proImage" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "vendorId" INTEGER NOT NULL,

    CONSTRAINT "ProductCate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "cat" TEXT NOT NULL,
    "Image" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductCate" ADD CONSTRAINT "ProductCate_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
