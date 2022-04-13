-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "user_name" VARCHAR(50),
    "age" INTEGER,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL,
    "bio" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
