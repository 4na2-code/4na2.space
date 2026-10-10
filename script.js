const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const videoDialog = document.querySelector(".video-dialog");
const videoDialogTitle = document.getElementById("video-dialog-title");
const videoPlayer = videoDialog?.querySelector("video");
const closeVideoButton = videoDialog?.querySelector(".video-dialog-close");
const videoSourceLink = videoDialog?.querySelector(".video-dialog-link");

if (videoDialog instanceof HTMLDialogElement && videoPlayer && videoDialogTitle && closeVideoButton && videoSourceLink) {
  document.querySelectorAll(".video-card[data-video-src]").forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();
      const videoSrc = card.dataset.videoSrc;
      const videoTitle = card.dataset.videoTitle;

      if (!videoSrc || !videoTitle) {
        return;
      }

      videoDialogTitle.textContent = videoTitle;
      videoSourceLink.href = videoSrc;
      videoPlayer.src = videoSrc;
      videoPlayer.load();
      videoDialog.showModal();
      videoPlayer.play().catch(() => {});
    });
  });

  closeVideoButton.addEventListener("click", () => videoDialog.close());
  videoDialog.addEventListener("click", (event) => {
    if (event.target === videoDialog) {
      videoDialog.close();
    }
  });
  videoDialog.addEventListener("close", () => {
    videoPlayer.pause();
    videoPlayer.removeAttribute("src");
    videoPlayer.load();
  });
}
