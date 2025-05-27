import Image from 'next/image'
import React, { Dispatch, SetStateAction } from 'react'
import { IStory } from './utils/Types'
import AudioPlayer from './AudioPlayer'

const StoryPage = ({ story, setStoryStep }: { story: IStory, setStoryStep: Dispatch<SetStateAction<string>> }) => {
    const { story_title, audio_url, story_des_1, story_des_2, story_des_3, flux_images_url } = story;
    const { image_urls } = flux_images_url;
    return (
        <div className="p-3 md:p-10 w-full max-w-[1728px] mx-auto">
            <div className="rounded-xl bg-[#e6e6fa] min-h-screen w-full p-5">
                <h1 className="text-4xl text-center font-extrabold pt-16 pb-8">{story_title}</h1>
                <AudioPlayer audioSource={audio_url} storyTitle={story_title} />
                <div className="grid grid-cols-1 md:grid-cols-2  place-items-center  items-start gap-10">
                    {/* part 1 */}
                    <p className="text-lg font-normal ">
                        {story_des_1}
                    </p>
                    <Image src={image_urls[0]} height={300} width={300} className="h-fit max-h-[500px] max-w-[500px] w-full   bg-contain" alt="story image 1" />
                    {/* part 2 */}
                    <p className="text-lg font-normal ">
                        {story_des_2}
                    </p>
                    <Image src={image_urls[1]} height={300} width={300} className="h-fit max-h-[500px] max-w-[500px] w-full   bg-contain" alt="story image 2" />
                    {/* part 3 */}
                    <p className="text-lg font-normal ">
                        {story_des_3}
                    </p>
                    <Image src={image_urls[2]} height={300} width={300} className="h-fit max-h-[500px] max-w-[500px] w-full   bg-contain" alt="story image 3" />

                </div>
            </div>
            <p className="md:text-[20px] text-white text-center tracking-wide my-6 font-normal">Have another story idea? <button onClick={() => setStoryStep("beginStory")} className="underline hover:opacity-70 cursor-pointer text-[#3aadda]">Generate new tale</button></p>

        </div>
    )
}

export default StoryPage