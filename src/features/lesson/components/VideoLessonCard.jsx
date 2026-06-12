import { PlayCircle, SpinnerGap, WarningCircle } from "@phosphor-icons/react";
import { useEffect, useMemo, useRef, useState } from "react";

export function VideoLessonCard({
  error,
  instanceKey,
  isMuted,
  onRetry,
  onVideoEnded,
  onVideoPause,
  onVideoPlay,
  poster,
  playbackRate,
  playPromptMode = "full",
  requireManualStart = false,
  shouldPause = false,
  status,
  videoUrl,
}) {
  const videoRef = useRef(null);
  const pausedByOverlayRef = useRef(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [hasStarted, setHasStarted] = useState(!requireManualStart);
  const ready = Boolean(videoUrl);
  const loading = !ready && (status === "loading" || status === "idle");
  const resolvedPoster = useMemo(
    () => getVideoPosterUrl(videoUrl) || poster,
    [poster, videoUrl],
  );

  const statusMessage = useMemo(() => {
    if (loading) {
      return {
        icon: <SpinnerGap className="lesson-spin" size={40} weight="bold" />,
        title: "Đang tải video...",
        detail: "Chờ một chút nhé.",
      };
    }

    return {
      icon: <WarningCircle size={40} weight="fill" />,
      title: "Chưa tải được video",
      detail: error?.message || "Không thể kết nối với máy chủ.",
    };
  }, [error, loading]);

  useEffect(() => {
    if (!ready || !videoRef.current) {
      return;
    }

    setAutoplayBlocked(false);
    setHasStarted(!requireManualStart);
    videoRef.current.currentTime = 0;
    videoRef.current.load();

    if (requireManualStart) {
      return;
    }

    try {
      const playPromise = videoRef.current.play();
      playPromise?.catch?.(() => setAutoplayBlocked(true));
    } catch {
      // Some test environments do not implement media playback.
    }
  }, [instanceKey, ready, requireManualStart, videoUrl]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (shouldPause && !video.paused) {
      pausedByOverlayRef.current = true;
      video.pause();
      return;
    }

    if (!shouldPause && pausedByOverlayRef.current) {
      pausedByOverlayRef.current = false;

      try {
        const playPromise = video.play();
        playPromise?.catch?.(() => setAutoplayBlocked(true));
      } catch {
        setAutoplayBlocked(true);
      }
    }
  }, [shouldPause]);

  const handleManualPlay = () => {
    try {
      setHasStarted(true);
      const playPromise = videoRef.current?.play();
      playPromise
        ?.then?.(() => setAutoplayBlocked(false))
        .catch?.(() => {
          setAutoplayBlocked(true);
          setHasStarted(false);
        });
    } catch {
      setAutoplayBlocked(true);
      setHasStarted(false);
    }
  };

  return (
    <div className="lesson-video" data-testid="lesson-video-stage">
      {ready ? (
        <video
          className="lesson-video__media"
          key={instanceKey}
          ref={videoRef}
          muted={isMuted}
          playsInline
          poster={resolvedPoster}
          preload="auto"
          src={videoUrl}
          onEnded={onVideoEnded}
          onPause={onVideoPause}
          onPlay={() => {
            setHasStarted(true);
            onVideoPlay?.();
          }}
        >
          Trình duyệt của bạn không hỗ trợ phát video.
        </video>
      ) : (
        <img
          className="lesson-video__media"
          src={resolvedPoster}
          alt="Khung cảnh mở đầu bài học"
        />
      )}

      {!ready ? (
        <div className="lesson-video__status" role="status">
          {statusMessage.icon}
          <strong>{statusMessage.title}</strong>
          <span>{statusMessage.detail}</span>
          {!loading ? (
            <button type="button" className="lesson-action-button" onClick={onRetry}>
              Thử tải lại
            </button>
          ) : null}
        </div>
      ) : null}

      {ready &&
      playPromptMode !== "hidden" &&
      (requireManualStart ? !hasStarted : autoplayBlocked) ? (
        <button
          type="button"
          aria-label="Phát video"
          className={`lesson-video__play${
            playPromptMode === "icon" ? " lesson-video__play--icon" : ""
          }`}
          onClick={handleManualPlay}
        >
          <PlayCircle size={36} weight="fill" />
          {playPromptMode === "full" ? (
            <span className="lesson-video__play-copy">
              <strong>Bắt đầu xem</strong>
              <small>Xem điều gì xảy ra nhé</small>
            </span>
          ) : null}
        </button>
      ) : null}
    </div>
  );
}

function getVideoPosterUrl(videoUrl) {
  if (!videoUrl || !videoUrl.includes("/video/upload/")) {
    return "";
  }

  return videoUrl
    .replace("/video/upload/", "/video/upload/so_0/")
    .replace(/\.[a-z0-9]+(?:\?.*)?$/i, ".jpg");
}
