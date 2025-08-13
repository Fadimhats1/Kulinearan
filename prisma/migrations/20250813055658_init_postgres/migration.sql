-- CreateTable
CREATE TABLE "Restaurants" (
    "restaurantId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "avgPrice" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "openTime" TEXT NOT NULL,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "contact" TEXT NOT NULL,
    "website" TEXT,

    CONSTRAINT "Restaurants_pkey" PRIMARY KEY ("restaurantId")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "reviewId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" VARCHAR(1000) NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "restaurantId" INTEGER,
    "authorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "Users" (
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "occupation" TEXT NOT NULL DEFAULT 'Food Reviewer',
    "totalReviews" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Category" (
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryName")
);

-- CreateTable
CREATE TABLE "RestaurantCategory" (
    "restaurantId" INTEGER NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "RestaurantCategory_pkey" PRIMARY KEY ("restaurantId","categoryName")
);

-- CreateTable
CREATE TABLE "_likedBy" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_likedBy_AB_unique" ON "_likedBy"("A", "B");

-- CreateIndex
CREATE INDEX "_likedBy_B_index" ON "_likedBy"("B");

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurants"("restaurantId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestaurantCategory" ADD CONSTRAINT "RestaurantCategory_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurants"("restaurantId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestaurantCategory" ADD CONSTRAINT "RestaurantCategory_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("categoryName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedBy" ADD CONSTRAINT "_likedBy_A_fkey" FOREIGN KEY ("A") REFERENCES "Reviews"("reviewId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedBy" ADD CONSTRAINT "_likedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
