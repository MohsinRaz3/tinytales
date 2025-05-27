"use client"
import Button from "@/components/Button";
import StoryPage from "@/components/StoryPage";
import { IStory, IStoryPreferences } from "@/components/utils/Types";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [storyStep, setStoryStep] = useState("beginStory")
  const [story, setStory] = useState<IStory | null>(null)
  const [storyPreferences, setStoryPreferences] = useState<IStoryPreferences>({
    ageGroup: '',
    genre: '',
    characterLength: "",
    storyType: "",
    isLoading: false,
  });
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);


  function handleStoryStepChange(storyStep: string, storyPreferences: IStoryPreferences) {
    switch (storyStep) {
      case "beginStory":
        setStoryStep("selectAgeGroup");
        break;
      case "selectAgeGroup":
        if (storyPreferences.ageGroup.length > 0) {
          setStoryStep("selectGenre");
        } else {
          toast.error('Please select age group to continue');
        }
        break;
      case "selectGenre":
        if (storyPreferences.genre.length > 0) {
          setStoryStep("characterLength");
        } else {
          toast.error("Please select what genre's tale you want to create");
        }
        break;
      case "characterLength":
        if (storyPreferences.characterLength.length > 0) {
          setStoryStep("storyType");
        } else {
          toast.error('Please select how many characters you want in the Tale');
        }
        break;
      case "storyType":
        if (storyPreferences.storyType.length > 0) {
          setStoryStep("success");
        } else {
          toast.error('Please share your idea for the type of tale you wish to create!');
        }
        break;
      case "success":
        setStoryStep("beginStory");
        break;
      default:
        break;
    }
  }

  const { ageGroup, genre, characterLength, storyType, isLoading } = storyPreferences;
  console.log("storystep", storyStep);
  console.log("storyPreferences", storyPreferences);

  const handleStoryGeneration = async () => {
    if (storyType.length <= 0) {
      toast.error('Please share your idea for the type of tale you wish to create!')
      return
    }
    setCurrentMessageIndex(0)
    setStoryPreferences(prevState => ({
      ...prevState,
      isLoading: true
    }))
    const structuredStoryValues = {
      story_idea: storyType,
      age_group: ageGroup,
      genre: genre,
      characters: characterLength
    }

    const generateStoryRes = await fetch(`https://tinytales-backend.onrender.com/story_creation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(structuredStoryValues)
    })
    if (!generateStoryRes.ok) {
      console.log("Error occured while generating story", generateStoryRes);
      setStoryPreferences(prevState => ({
        ...prevState,
        isLoading: false,
      }))
      return "ERROR"
    }
    else {
      const storyData = await generateStoryRes.json();
      setStoryPreferences({
        ageGroup: '',
        genre: '',
        characterLength: "",
        storyType: "",
        isLoading: false,
      })
      setStoryStep("success")
      setStory(storyData.result)
    }
  }

  useEffect(() => {
    if (currentMessageIndex < messages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex((prevIndex) => prevIndex + 1);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex]);

  useEffect(() => {
    async function callAPi() {
      await fetch("https://tinytales-backend.onrender.com/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })
    }
    callAPi()
    callAPi()
  }, [])

  return (
    <div className=" h-screen  relative grid place-items-center w-full">
      <Image src={"/images/bgBubbles.svg"} height={854} width={1073} className="h-full max-h-screen -z-10 w-fit absolute -top-24 p-0 left-0 bg-contain" alt="tinytales logo" />

      {storyStep !== "success" && (
        <div className="w-full  max-w-[980px] min-h-[512px] p-7 rounded-[28px] backdrop-blur-3xl bg-white/[13%] mx-auto shadow-[0px_0px_10px_5px_rgba(255,255,255,0.2)]">
          <div className="grid place-items-center gap-3">
            <Image src={"/images/tinlytalesicon.svg"} height={78} width={78} className="size-[50px] md:size-[78px]" alt=" tinytales logo Icon" />
            <p className="md:text-[40px] text-white text-center tracking-[10px] font-extrabold">TinyTales</p>
          </div>
          <br className="h-8" />

          {/* story steps */}
          {storyStep === "beginStory" && (
            <div className="grid place-items-center gap-4">
              <p className="md:text-lg text-white text-center max-w-[560px] leading-normal">Unleash your imagination! Write your story type below, and watch it come to life!</p>
              <Button handleStoryStepChange={() => handleStoryStepChange(storyStep, storyPreferences)}
                label="• Create Tale" />
            </div>
          )}

          {storyStep === "selectAgeGroup" && (
            <div className="grid place-items-center gap-8">
              <p className="text-white text-lg tracking-wide text-center ">Select an age group to generate a story tailored for that audience.</p>
              <div className="flex justify-center items-center flex-wrap gap-3">

                {["1-13", "14-19", "20-30", "30+"].map((age: string, index) => (
                  <div
                    key={index}
                    onClick={() => setStoryPreferences(prevState => ({
                      ...prevState,
                      ageGroup: age
                    }))}
                    className={`${ageGroup === age ? 'bg-gradient-to-r from-[#3aadda] to-[#0f41a7]' : 'bg-gradient-to-r from-[#3ba9d4a8] to-[#305c9e8a]'}  cursor-pointer text-white  px-12 py-4 rounded-full transition duration-300 hover:bg-gradient-to-r hover:from-[#3aadda] hover:to-[#0f41a7]`}>
                    {age}
                  </div>

                ))}
              </div>
              <Button handleStoryStepChange={() => handleStoryStepChange(storyStep, storyPreferences)}
                label="Contiue" />
            </div >
          )
          }

          {storyStep === "selectGenre" && (
            <div className="grid place-items-center gap-8">
              <p className="text-white text-lg tracking-wide text-center ">Select any Genre to generate a story tailored for that audience.</p>
              <div className="flex justify-center flex-wrap items-center gap-3">

                {["Fantasy", "Comedy", "Horror", "Romance", "Science Fiction"].map((genreText: string, index) => (
                  <div key={index} onClick={() => setStoryPreferences(prevState => ({
                    ...prevState,
                    genre: genreText
                  }))} className={` ${genre === genreText ? 'bg-gradient-to-r from-[#3aadda] to-[#0f41a7]' : 'bg-gradient-to-r from-[#3ba9d4a8] to-[#305c9e8a]'} cursor-pointer text-white px-12 py-4 rounded-full hover:bg-gradient-to-r hover:from-[#3aadda] hover:to-[#0f41a7] `}>{genreText}</div>

                ))}
              </div>
              <Button handleStoryStepChange={() => handleStoryStepChange(storyStep, storyPreferences)}
                label="Contiue" />
            </div >
          )}

          {storyStep === "characterLength" && (
            <div className="grid place-items-center flex-wrap gap-8">
              <p className="text-white text-lg tracking-wide text-center ">Select how many characters you want in your story.</p>
              <div className="flex justify-center items-center gap-3">

                {["One", "Two", "Three", "Four"].map((characterLengthText: string, index) => (
                  <div key={index} onClick={() => setStoryPreferences(prevState => ({
                    ...prevState,
                    characterLength: characterLengthText
                  }))} className={`${characterLength === characterLengthText ? 'bg-gradient-to-r from-[#3aadda] to-[#0f41a7]' : 'bg-gradient-to-r from-[#3ba9d4a8] to-[#305c9e8a]'} cursor-pointer text-white  px-12 py-4 rounded-full hover:bg-gradient-to-r hover:from-[#3aadda] hover:to-[#0f41a7] `}>{characterLengthText}</div>

                ))}
              </div>
              <Button handleStoryStepChange={() => handleStoryStepChange(storyStep, storyPreferences)}
                label="Contiue" />
            </div >
          )}

          {storyStep === "storyType" && (

            isLoading ? (
              <div className={`py-20 md:py-10 leading-6 md:leading-[50px] lg:leading-normal  md:text-[30px] text-white text-center font-bold animate-fade-in-out`}>
                {messages[currentMessageIndex]}
              </div>

            ) : (
              <div className="grid place-items-center gap-4">
                <p className="md:text-lg text-white text-center max-w-[560px] leading-normal font-[family-name:var(--font-baloo-tamma)]">Unleash your imagination! Write your story type below, and watch it come to life!</p>
                <input value={storyType}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleStoryGeneration();
                    }
                  }}
                  onChange={(e) => setStoryPreferences(prevState => ({
                    ...prevState,
                    storyType: e.target.value
                  }))} type="text" placeholder="Enter your story type" className="w-full text-white bg-[#FDFDFF]/30 py-4 px-2 outline-none max-w-96  rounded-md" />
                <button
                  onClick={handleStoryGeneration}
                  className="flex justify-center items-center gap-3 w-full max-w-96 py-4 bg-[#026E78] rounded-md mx-auto cursor-pointer hover:bg-[#028a96] hover:scale-105 transition-transform duration-300 ease-out shadow-lg hover:shadow-xl group"
                >
                  <span className="text-white text-lg font-semibold">Create Tales</span>
                  <Image
                    src="/images/magicStick.svg"
                    height={35}
                    width={35}
                    className="size-[20px] md:size-[35px] transition-transform duration-1000 ease-out group-hover:rotate-[360deg]"
                    alt="magic stick"
                  />
                </button>
              </div>
            ))}
        </div >
      )}

      {storyStep === "success" && story && (
        <StoryPage story={story} setStoryStep={setStoryStep} />
      )}


      {/* story generation componet here*/}
      {/* <div className="p-10 w-full max-w-[1728px] mx-auto">
            <div className="rounded-xl bg-[#e6e6fa] min-h-screen w-full p-5">
              <h1 className="text-4xl text-center font-extrabold pt-16 pb-8">Cricket Above the Clouds</h1>
              <AudioPlayer />
              <div className="grid grid-cols-1 md:grid-cols-2  place-items-center  items-start gap-10">
                <p className="text-lg font-normal ">In the pale moonlight, under a velvet sky dotted with stars, Jack found himself holding a cricket bat. He was perched atop a fluffy cloud, as if in a dream. Wisps of stars danced like fireflies around him, illuminating a hidden cricket pitch in the sky. Jack whispered to himself, “This is... unbelievable.” Suddenly, a gentle voice echoed, “Welcome Jack, to the celestial game!”</p>
                <Image src={"https://fal.media/files/elephant/A95YP0qt42-J-0fNB2KGT.png"} height={300} width={300} className="h-fit max-h-[500px] max-w-[500px] w-full   bg-contain" alt="story image" />


                <p className="text-lg font-normal ">In the pale moonlight, under a velvet sky dotted with stars, Jack found himself holding a cricket bat. He was perched atop a fluffy cloud, as if in a dream. Wisps of stars danced like fireflies around him, illuminating a hidden cricket pitch in the sky. Jack whispered to himself, “This is... unbelievable.” Suddenly, a gentle voice echoed, “Welcome Jack, to the celestial game!”</p>
                <Image src={"https://fal.media/files/elephant/A95YP0qt42-J-0fNB2KGT.png"} height={300} width={300} className="h-fit max-h-[500px] max-w-[500px] w-full   bg-contain" alt="story image" />


                <p className="text-lg font-normal ">In the pale moonlight, under a velvet sky dotted with stars, Jack found himself holding a cricket bat. He was perched atop a fluffy cloud, as if in a dream. Wisps of stars danced like fireflies around him, illuminating a hidden cricket pitch in the sky. Jack whispered to himself, “This is... unbelievable.” Suddenly, a gentle voice echoed, “Welcome Jack, to the celestial game!”</p>
                <Image src={"https://fal.media/files/elephant/A95YP0qt42-J-0fNB2KGT.png"} height={300} width={300} className="h-fit max-h-[500px] max-w-[500px] w-full   bg-contain" alt="story image" />

              </div>
            </div>
          </div> */}


    </div >
  );
}



const messages = [
  "Generating your story, please wait!",
  "Creating an adventure for you, hold on tight!",
  "Almost there, preparing the final touches!"
];
