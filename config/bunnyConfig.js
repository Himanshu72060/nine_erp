const axios = require("axios");

const BUNNY_STORAGE_ZONE =
    process.env.BUNNY_STORAGE_ZONE;

const BUNNY_API_KEY =
    process.env.BUNNY_ACCESS_KEY;

const BUNNY_REGION =
    process.env.BUNNY_REGION || "";

const getStorageUrl = (fileName) => {

    const baseUrl = BUNNY_REGION
        ? `https://${BUNNY_REGION}.storage.bunnycdn.com`
        : "https://storage.bunnycdn.com";

    return `${baseUrl}/${BUNNY_STORAGE_ZONE}/${fileName}`;
};

const uploadToBunny = async (
    fileBuffer,
    fileName
) => {

    try {

        const uploadUrl =
            getStorageUrl(fileName);

        await axios.put(
            uploadUrl,
            fileBuffer,
            {
                headers: {
                    AccessKey:
                        BUNNY_API_KEY,
                    "Content-Type":
                        "application/octet-stream"
                },
                maxBodyLength:
                    Infinity
            }
        );

        const cdnUrl =
            `${process.env.BUNNY_CDN_URL}/${fileName}`;

        return cdnUrl;

    } catch (error) {

        console.error(
            "Bunny Upload Error:",
            error.response?.data ||
            error.message
        );

        throw new Error(
            "Failed to upload image to Bunny CDN"
        );

    }

};

module.exports = uploadToBunny;