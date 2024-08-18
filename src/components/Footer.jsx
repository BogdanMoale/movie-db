import React from "react";
import Image from "next/image"; // Import the Image component from next/image

function Footer() {
  return (
    <div className="flex dark:bg-gray-600 bg-amber-100 p-4 lg:text-lg justify-center gap-6">
      <Image
        src="/movie_db_logo.svg"
        alt="Footer Image"
        width={100}
        height={100}
        className="rounded-full"
      />
    </div>
  );
}

export default Footer;
