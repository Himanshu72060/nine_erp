const axios = require("axios");

const uploadToBunny = async (
    fileBuffer,
    fileName
) => {

    try {

        const storageZone =
            process.env.BUNNY_STORAGE_ZONE;

        const accessKey =
            process.env.BUNNY_ACCESS_KEY;

        const region =
            process.env.BUNNY_REGION || "";

        const cdnUrl =
            process.env.BUNNY_CDN_URL;

        const uploadUrl =
            region
                ? `https://${region}.storage.bunnycdn.com/${storageZone}/${fileName}`
                : `https://storage.bunnycdn.com/${storageZone}/${fileName}`;

        await axios.put(
            uploadUrl,
            fileBuffer,
            {
                headers: {
                    AccessKey: accessKey,
                    "Content-Type":
                        "application/octet-stream"
                },
                maxBodyLength: Infinity
            }
        );

        return `${cdnUrl}/${fileName}`;

    } catch (error) {

        console.error(
            "Bunny Upload Error:",
            error.response?.data ||
            error.message
        );

        console.log("===== BUNNY ERROR =====");

        console.log(error.response?.data);

        console.log(error.response?.status);

        console.log(error.message);

        throw new Error(
            "Failed to upload image to Bunny CDN"
        );

    }

};

module.exports =
    uploadToBunny;