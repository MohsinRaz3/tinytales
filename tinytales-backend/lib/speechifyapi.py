import io
import os
import base64
from speechify.core.api_error import ApiError
from speechify import AsyncSpeechify
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("SPEECHIFY_API_KEY")

client = AsyncSpeechify(
    token=api_key,
)


async def audio_generator(story) -> io.BytesIO:
    try:
        response = await client.tts.audio.speech(
            input=f"{story}",
            voice_id="kristy",
        )
        
        # Convert the response to BytesIO
        audio_data = io.BytesIO()
        
        # Extract audio data from the response tuples
        for chunk in response:
            if isinstance(chunk, tuple) and len(chunk) == 2:
                key, value = chunk
                if key == 'audio_data':
                    #print(f"Found audio_data, length: {len(value) if hasattr(value, '__len__') else 'N/A'}")
                    # The audio data is base64 encoded, decode it
                    try:
                        audio_bytes = base64.b64decode(value)
                        audio_data.write(audio_bytes)
                        #print(f"Successfully decoded {len(audio_bytes)} bytes")
                        break  # We found the audio data, no need to continue
                    except Exception as e:
                        print(f"Error decoding base64 audio: {e}")
                        return None
        
        if audio_data.tell() == 0:  # No data was written
            #print("No audio data found in response")
            return None
            
        audio_data.seek(0) 
        #print(f"Successfully created audio data with {audio_data.tell()} bytes")
        return audio_data
        
    except ApiError as e:
        print(e.status_code)
        print(e.body)
        return None

#asyncio.run(audio_generator("Hello, world! this is speechify api working properly for the first time in the world history"))