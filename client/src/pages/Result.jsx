import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const Result = () => {
  // State for the generated image, initialized with a fallback image
  const [image, setImage] = useState(assets.sample_img_1);
  // State to track if an image has been successfully generated and loaded
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  // State to show a loading indicator during the API call
  const [loading, setLoading] = useState(false);
  // State for the text input from the user
  const [input, setInput] = useState('');

  // Access the generateImage function from the AppContext
  const { generateImage } = useContext(AppContext);

  const resetState = () => {
    setIsImageLoaded(false);
    setImage(assets.sample_img_1);
    setInput('');
  }

  // Function to handle the form submission for image generation
  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevents the default form refresh

    // Check if the input is empty and show an error if it is
    if (!input) {
      toast.error('Please provide a prompt.');
      return;
    }

    setLoading(true); // Start loading state

    try {
      // Call the generateImage function from the context
      const generatedImage = await generateImage(input);

      // Check if an image URL was returned
      if (generatedImage) {
        setIsImageLoaded(true); // Set state to indicate image is ready
        setImage(generatedImage); // Update the image state with the new URL
      } else {
        // If no image was returned, show a generic error
        toast.error('Image generation failed.');
      }
    } catch (error) {
      // Catch any errors during the API call and display a toast message
      toast.error('An error occurred during image generation.');
      console.error('Image Generation Error:', error); // Log the full error object
    } finally {
      // This block runs regardless of success or failure
      setLoading(false); // End loading state
      setInput(''); // Clear the input field
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center min-h-[90vh]'
    >
      <div>
        <div className='relative'>
          <img src={image} alt="Generated" className='max-w-sm rounded' />
          {/* Animated loading bar at the bottom of the image container */}
          <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
        </div>
        {/* Loading text displayed conditionally */}
        <p className={!loading ? 'hidden' : ''}>Loading...</p>
      </div>

      {/* Conditionally render the input form if no image is loaded */}
      {!isImageLoaded && (
        <form
          onSubmit={onSubmitHandler}
          className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'
        >
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder='Describe what you want to generate'
            className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color'
          />
          <button type="submit" className='bg-zinc-900 px-10 py-3 sm:px-16 rounded-full'>
            Generate
          </button>
        </form>
      )}

      {/* Conditionally render the "Generate Another" and "Download" buttons if an image is loaded */}
      {isImageLoaded && (
        <div className='flex gap-2 flex-wrap justify-center text-white p-0.5 text-sm mt-10 rounded-full'>
          <p
            onClick={resetState}
            className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'
          >
            Generate Another
          </p>
          <a
            href={image}
            download
            className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'
          >
            Download
          </a>
        </div>
      )}
    </motion.div>
  );
};

export default Result;
