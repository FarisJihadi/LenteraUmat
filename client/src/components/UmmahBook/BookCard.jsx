import React from "react";
import { Link } from "react-router-dom";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import shareIcon from "../../assets/CardDonasi/share.png";

/**
 * Displays a single book card that links to a detail page.
 * @param {object} props
 * @param {object} props.book - The book object.
 */
function BookCard({ book }) {
  return (
    <Link
      to={`/book/${book._id}`}
      className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col no-underline"
    >
      <div className="flex-shrink-0">
        <img
          className="h-56 w-full object-cover"
          src={book.imageUrl}
          alt={book.title}
        />
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {book.fileType || "PDF"}
          </span>
          <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            {book.category || "Umum"}
          </span>

          <div className="p-4 flex items-center justify-between gap-1">
            <div className="flex items-center">
              {book.isBookmarked ? (
                <BsBookmarkFill className="text-yellow-500 w-5 h-5" />
              ) : (
                <BsBookmark className="text-gray-400 w-5 h-5" />
              )}
            </div>
            <img
              src={shareIcon}
              alt="Share"
              className="w-5 h-5 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </div>
        </div>

        <p className="text-sm font-semibold text-gray-800 flex-grow">
          {`${book.title} untuk ${book.grade}`}
        </p>
      </div>
    </Link>
  );
}

export default BookCard;
