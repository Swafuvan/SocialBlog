import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

// Configure AWS S3
// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: 'your-region', // e.g., 'us-east-1'
// });

// Function to upload Base64 video to S3
// const uploadBase64ToS3 = async (base64Data: any, fileName: any, fileType: any) => {

    // const buffer = Buffer.from(base64Data, 'base64');

//     const params = {
//         Bucket: process.env.VITE_BUCKET_NAME,
//         Key: fileName, // e.g., 'uploads/myvideo.mp4'
//         Body: buffer,
//         ContentEncoding: 'base64', // Required for base64 files
//         ContentType: fileType, // Dynamic based on video format (e.g., 'video/mp4')
//         ACL: 'public-read', // Optional: public access
//     };

//     try {
//         const data = await s3.upload(params).promise();
//         console.log(`File uploaded successfully at ${data.Location}`);
//         return data.Location; // URL of the uploaded video
//     } catch (err) {
//         console.error('Error uploading file:', err);
//         throw err;
//     }
// };

// Example usage
// const base64String = "your-base64-encoded-video-string";
// const fileName = "your-video.mp4";
// const fileType = "video/mp4"; // Ensure this matches your video format

// uploadBase64ToS3(base64String, fileName, fileType)
//     .then((url) => console.log('Video URL:', url))
//     .catch((err) => console.error(err));



const s3ClientConfig: S3ClientConfig = {
    region: import.meta.env.VITE_S3BUCKET_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_S3BUCKET_ACCESSKEY + '',
        secretAccessKey: import.meta.env.VITE_S3BUCKET_SECRETKEY + '',
    }
};

const s3Client = new S3Client(s3ClientConfig);


export const uploadToS3Bucket = async (data: File, onProgress: any) => {

    try {
// const body = Buffer.from(data)
console.log(data)
        // const name = data.name + "_" + Date.now().toString()
        const params = {
            Bucket: import.meta.env.VITE_BUCKET_NAME,
            Key: Date.now().toString(),
            Body: data,
            // ContentType:fileType
        };

        const upload = new Upload({
            client: s3Client,
            params, queueSize: 3,
            leavePartsOnError: false,
        });

        upload.on('httpUploadProgress', (progress: any) => {
            if (progress.total) {
                const percentage = Math.round((progress.loaded / progress.total) * 100);
                onProgress(percentage);
            }
        });

        await upload.done();

        const objectKey = params.Key;
        const region = import.meta.env.VITE_S3BUCKET_REGION || 'ap-south-1';
        const url = `https://${params.Bucket}.s3.${region}.amazonaws.com/${objectKey}`;
        
        return url

    } catch (err) {
        console.error('Error uploading video to S3:', err);
        throw err;
    }
};