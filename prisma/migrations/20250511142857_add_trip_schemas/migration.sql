-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('PLANNED', 'UPCOMING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "TravelMode" AS ENUM ('FLIGHT', 'TRAIN', 'BUS', 'CAR', 'BIKE', 'WALK');

-- CreateTable
CREATE TABLE "trip" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "status" "TripStatus" NOT NULL DEFAULT 'PLANNED',
    "budget" DOUBLE PRECISION,
    "modeOfTravel" "TravelMode",
    "duration" INTEGER,
    "description" TEXT,
    "rating" DOUBLE PRECISION,
    "review" TEXT,
    "activities" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_search" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentLocation" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "budget" DOUBLE PRECISION,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "modeOfTravel" "TravelMode",
    "numberOfDays" INTEGER,
    "tripId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "saved_search_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itinerary_day" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "activities" TEXT[],
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "itinerary_day_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "trip_userId_idx" ON "trip"("userId");

-- CreateIndex
CREATE INDEX "trip_status_idx" ON "trip"("status");

-- CreateIndex
CREATE INDEX "trip_from_to_idx" ON "trip"("from", "to");

-- CreateIndex
CREATE UNIQUE INDEX "saved_search_tripId_key" ON "saved_search"("tripId");

-- CreateIndex
CREATE INDEX "saved_search_userId_idx" ON "saved_search"("userId");

-- CreateIndex
CREATE INDEX "saved_search_currentLocation_destination_idx" ON "saved_search"("currentLocation", "destination");

-- CreateIndex
CREATE INDEX "itinerary_day_tripId_idx" ON "itinerary_day"("tripId");

-- CreateIndex
CREATE UNIQUE INDEX "itinerary_day_tripId_dayNumber_key" ON "itinerary_day"("tripId", "dayNumber");

-- AddForeignKey
ALTER TABLE "trip" ADD CONSTRAINT "trip_user_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip" ADD CONSTRAINT "trip_user_profile_fkey" FOREIGN KEY ("userId") REFERENCES "user_profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_search" ADD CONSTRAINT "saved_search_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_search" ADD CONSTRAINT "saved_search_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_day" ADD CONSTRAINT "itinerary_day_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
