import Image from 'next/image'
import React from 'react'

const Button = ({ handleStoryStepChange, label }: { handleStoryStepChange: () => void, label: string }) => {
    return (
        <button
            onClick={handleStoryStepChange}
            className="flex justify-center items-center gap-3 w-full max-w-96 py-4 bg-[#026E78] rounded-md mx-auto cursor-pointer hover:bg-[#028a96] hover:scale-105 transition-transform duration-300 ease-out shadow-lg hover:shadow-xl group"
        >
            <span className="text-white text-lg font-semibold">{label}</span>
            <Image
                src="/images/magicStick.svg"
                height={35}
                width={35}
                className="size-[20px] md:size-[35px] transition-transform duration-1000 ease-out group-hover:rotate-[360deg]"
                alt="magic stick"
            />
        </button>
    )
}

export default Button