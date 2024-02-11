import axios from "axios";

export function extractURLsFromString(text: string) {
  let urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex);
}

export function convertToYouTubeURL(oldURL: string): string {
  // Extract the video ID from the old URL
  const videoIDMatch = oldURL.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w\-]{11})/,
  );

  if (videoIDMatch && videoIDMatch.length > 1) {
    // Construct the new YouTube URL with the extracted video ID
    const videoID = videoIDMatch[1];
    return `https://www.youtube.com/watch?v=${videoID}`;
  } else {
    return "Invalid YouTube URL";
  }
}

export async function getFullURL(shortURL: string) {
  try {
    const response = await axios.head(shortURL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36",
      },
    });
    if (response.status === 200) {
      return response.request.responseURL;
    } else {
      throw new Error("Failed to fetch full URL");
    }
  } catch (error) {
    console.error("Error:", (error as Error).message);
    return null;
  }
}
