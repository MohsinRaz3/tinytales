import React from 'react'
import Image from 'next/image'
import { BiSolidUserCircle } from "react-icons/bi";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between  max-w-[1648px] xl:px-10 my-4 mx-2 md:mx-6 xl:mx-auto">
            <Image src={"/images/tinytaleslogo.svg"} height={89} width={404} className=" h-[50px] md:h-[60px] lg:h-[89px] w-[150px] md:w-[300px] xl:w-[404px]" alt="tinytales logo" />
            <div className="flex items-center justify-center gap-2 md:gap-4">
                <BiSolidUserCircle color='#E2E6E9' className="size-[25px] md:size-[40px]" />
                <p className=" border-l border-white"><span className="text-sm md:text-lg lg:text-xl text-white mx-2 md:mx-3 cursor-pointer hover:text-[#026E78]">Sign Out</span></p>
            </div>
        </nav>
    )
}

export default Navbar