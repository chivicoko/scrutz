"use client"

import { ErrorOutlineRounded } from "@mui/icons-material";

const Error = (error) => {
  // console.log(error.error.message);
  return (
    <div id='productsContent' className="flex min-h-fit flex-col items-center justify-between gap-2 p-24">
        <h1 className="text-red-700 text-center"> <ErrorOutlineRounded /> ERROR!</h1>
        <h2 className="text-center">{error?.error?.message || "There has been a glitch in the process. Could not fetch products!"}</h2>
        <button onClick={() => window.location.reload()} className="block border bg-transparent hover:bg-[#aa5600] border-[#aa5600] rounded-md text-[#aa5600] hover:text-white py-[11px] px-[27px] hover:cursor-pointer shadow-md">
          Try again
        </button>
    </div>
  )
}

export default Error;