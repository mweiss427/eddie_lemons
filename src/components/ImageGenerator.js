import { useState } from "react";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleImageGeneration = async () => {
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          num_images: 1,
          size: [256, 256],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      setGeneratedImage(data.data[0].url);
    } catch (error) {
      console.error("Error during image generation request:", error);
    }
  };

  return (
    <>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter image prompt"
      />
      <button onClick={handleImageGeneration}>Generate Image</button>
      {generatedImage && <img src={generatedImage} alt="Generated" />}
    </>
  );
};

export default ImageGenerator;
