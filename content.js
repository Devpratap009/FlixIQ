const title = document.querySelector("title");

const config = { childList: true };

const ratingButton = (rating) => {
  const container = document.querySelector(
    ".previewModal--detailsMetadata-info"
  );
  if (!container) {
    return;
  }

  if (container.querySelector(".flixiq-imdb")) return;

  const badge = document.createElement("div");
  badge.className = "flixiq-imdb";
  badge.textContent = rating ? `IMDb: ${rating}` : "IMDb: N/A";

//   badge.style.cssText = `
//     background: #d2a500ff;
//     color: #000;
//     font-weight: 600;
//     padding: 8px 14px;
//     border-radius: 6px;
//     margin-top: 5px;
//     font-size: 1.3rem;
//     text-align: center;
//     display: inline-block;
//     animation: flixiqFadeIn 0.4s ease-in-out;
//   `;

  container.appendChild(badge);
};

const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      const newTitle = document.title.replace(" - Netflix", "").trim();
      if (newTitle != "Home") {
        console.log(newTitle);

        // pass message to getIMDB function in index.js
        chrome.runtime.sendMessage({ title: newTitle }, (response) => {
          ratingButton(response);
        });
      }
    }
  }
};

if (title) {
  const observer = new MutationObserver(callback);
  observer.observe(title, { childList: true });
}
