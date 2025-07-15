import axios from "axios";

// Upload image and return display_url
export const imageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_BB_API}`,
        formData
    );

    return data.data.display_url;
};
