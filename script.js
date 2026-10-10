const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const videoDialog = document.querySelector(".video-dialog");
const videoDialogTitle = document.getElementById("video-dialog-title");
const videoFrame = videoDialog?.querySelector("iframe");
const closeVideoButton = videoDialog?.querySelector(".video-dialog-close");
const watchOnYouTubeLink = videoDialog?.querySelector(".video-dialog-youtube");

if (videoDialog instanceof HTMLDialogElement && videoFrame && videoDialogTitle && closeVideoButton && watchOnYouTubeLink) {
  document.querySelectorAll(".youtube-card[data-video-id]").forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();
      const videoId = card.dataset.videoId;
      const videoTitle = card.dataset.videoTitle;

      if (!videoId || !videoTitle) {
        return;
      }

      videoDialogTitle.textContent = videoTitle;
      watchOnYouTubeLink.href = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
      videoFrame.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?playsinline=1&origin=${encodeURIComponent(window.location.origin)}`;
      videoDialog.showModal();
    });
  });

  closeVideoButton.addEventListener("click", () => videoDialog.close());
  videoDialog.addEventListener("click", (event) => {
    if (event.target === videoDialog) {
      videoDialog.close();
    }
  });
  videoDialog.addEventListener("close", () => {
    videoFrame.removeAttribute("src");
  });
}
