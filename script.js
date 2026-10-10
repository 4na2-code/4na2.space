const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const videoDialog = document.querySelector(".video-dialog");
const videoDialogTitle = document.getElementById("video-dialog-title");
const videoPlayer = videoDialog?.querySelector("video");
const closeVideoButton = videoDialog?.querySelector(".video-dialog-close");
const videoSourceLink = videoDialog?.querySelector(".video-dialog-link");

document.querySelectorAll(".video-card").forEach((card) => {
  const preview = card.querySelector("video");
  const thumbnail = card.querySelector(".project-thumbnail");

  if (!preview || !thumbnail) {
    return;
  }

  preview.addEventListener("loadedmetadata", () => {
    if (Number.isFinite(preview.duration) && preview.duration > 0) {
      preview.currentTime = Math.min(1, preview.duration / 2);
    }
  }, { once: true });

  preview.addEventListener("seeked", () => {
    if (preview.videoWidth === 0 || preview.videoHeight === 0) {
      return;
    }

    const scale = Math.min(1, 800 / preview.videoWidth);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(preview.videoWidth * scale);
    canvas.height = Math.round(preview.videoHeight * scale);
    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    context.drawImage(preview, 0, 0, canvas.width, canvas.height);
    thumbnail.src = canvas.toDataURL("image/jpeg", 0.82);
    thumbnail.classList.add("is-ready");
  }, { once: true });
});

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
