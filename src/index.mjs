import { S3Client, CopyObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client();

export const handler = async (event) => {
    try {
        // Log the event to see the structure
        console.log('Event:', JSON.stringify(event, null, 2));

        // Extract bucket name and object key from the event
        const sourceBucket = event.Records[0].s3.bucket.name;
        const sourceKey = event.Records[0].s3.object.key;

        const destinationBucket = 'images-debugger-demo-bucket-output';
        const destinationKey = `renamed-${sourceKey}`;

        console.log(`New object added to bucket: ${sourceBucket}`);
        console.log(`Object key: ${sourceKey}`);
        console.log(`Copying object from ${sourceBucket}/${sourceKey} to ${destinationBucket}/${destinationKey}`);

        // Copy the object to the new bucket with the new name
        await s3.send(new CopyObjectCommand({
            CopySource: `${sourceBucket}/${sourceKey}`,
            Bucket: destinationBucket,
            Key: destinationKey,
        }));

        console.log(`Successfully copied object to ${destinationBucket}/${destinationKey}`);

       // Return a success response
       return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Successfully moved object to new bucket',
            sourceBucket: sourceBucket,
            sourceKey: sourceKey,
            destinationBucket: destinationBucket,
            destinationKey: destinationKey,
        }),
    };
} catch (error) {
    console.error('Error processing S3 event:', error);

    // Return an error response
    return {
        statusCode: 500,
        body: JSON.stringify({
            message: 'Error processing S3 event',
            error: error.message,
        }),
    };
}
};