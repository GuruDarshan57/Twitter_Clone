-- CreateTable
CREATE TABLE "Bookmarks" (
    "postId" TEXT NOT NULL,
    "bookmarkedUserId" TEXT NOT NULL,

    CONSTRAINT "Bookmarks_pkey" PRIMARY KEY ("postId","bookmarkedUserId")
);

-- AddForeignKey
ALTER TABLE "Bookmarks" ADD CONSTRAINT "Bookmarks_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmarks" ADD CONSTRAINT "Bookmarks_bookmarkedUserId_fkey" FOREIGN KEY ("bookmarkedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
