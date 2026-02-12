const getIMDB = async ({ title }) => {
  try {
    const url = `https://www.omdbapi.com/?t=${title}&apikey=b68e34ef`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.imdbRating);
    return data.imdbRating
  } catch (error) {
    console.log(error);
  }
};

// Listen for message being passed by content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.title) {
    getIMDB({ title: message.title }).then((data) => {
      sendResponse(data);
    });
    return true;
  }
});

// (async () => {
//   await getIMDB({ title: "it's kind of a funny story" });
// })();
