export interface IStory {

    story_title: string;
    story_des_1: string;
    story_des_2: string;
    story_des_3: string;
    flux_images_url: {
        image_urls: string[];
    };
    audio_url: string;
};

export interface IStoryPreferences {
    ageGroup: string;
    genre: string;
    characterLength: string;
    storyType: string;
    isLoading: boolean;
}
