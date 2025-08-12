import axios from 'axios';
import userModel from '../models/userModel.js';
import FormData from 'form-data';

export const generateImage = async (req, res) => {
    try {
        const userId = req.userId;
        const { prompt } = req.body;

        // Find the user and validate input
        const user = await userModel.findById(userId);

        if (!user || !prompt) {
            return res.json({ success: false, message: 'Missing Details' });
        }

        // Check if the user has enough credits
        if (user.creditBalance <= 0) {
            return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance });
        }

        // Prepare form data for the API request
        const formData = new FormData();
        formData.append('prompt', prompt);

        // Make the API call to ClipDrop
        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                ...formData.getHeaders(), // Automatically sets 'Content-Type': 'multipart/form-data'
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer', // Corrected: removed the trailing space
        });

        // Convert the binary image data to a base64 string
        // The data returned from axios with responseType: 'arraybuffer' is already a Buffer
        const base64Image = Buffer.from(data).toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        // Atomically decrement the user's credit balance to prevent race conditions
        const updatedUser = await userModel.findByIdAndUpdate(
            user._id,
            { $inc: { creditBalance: -1 } }, // Use $inc to decrement
            { new: true } // Return the updated document
        );

        // Send a success response with the generated image and new credit balance
        res.json({
            success: true,
            message: 'Image Generated',
            creditBalance: updatedUser.creditBalance,
            resultImage
        });

    } catch (error) {
        console.error('Image Generation Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
