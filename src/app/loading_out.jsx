import React from "react";
import Image from "next/image";

function loading() {
  return (
    <div className="flex justify-center mt-16">
      <Image
        className="h-52"
        src="spinner.svg"
        alt="loading..."
        width={20}
        height={20}
      />
    </div>
  );
}

export default loading;
