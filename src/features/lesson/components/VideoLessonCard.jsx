import { SpinnerGap, WarningCircle } from "@phosphor-icons/react";
import { useEffect, useMemo, useRef } from "react";

export function VideoLessonCard({
  completed,
  error,
  instanceKey,
  isMuted,
  onRetry,
  onVideoEnded,
  onVideoPause,
  onVideoPlay,
  poster,
  playbackRate,
  status,
  videoUrl,
}) {
  const videoRef = useRef(null);
  const ready = Boolean(videoUrl);
  const loading = !ready && (status === "loading" || status === "idle");

  const statusMessage = useMemo(() => {
    if (loading) {
      return {
        icon: <SpinnerGap className="lesson-spin" size={40} weight="bold" />,
        title: "Đang tải video từ máy chủ...",
        detail: "",
      };
    }

    return {
      icon: <WarningCircle size={40} weight="fill" />,
      title: "Chưa tải được video mở đầu",
      detail: error?.message || "Không thể kết nối SmartStepsServer.",
    };
  }, [error, loading]);

  useEffect(() => {
    if (!ready || !videoRef.current) {
      return;
    }

    try {
      videoRef.current.currentTime = 0;
      videoRef.current.load();
      const playPromise = videoRef.current.play();

      if (playPromise?.catch) {
        playPromise.catch(() => {});
      }
    } catch (playbackError) {
      // jsdom does not implement HTMLMediaElement playback APIs.
    }
  }, [instanceKey, ready, videoUrl]);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  return (
    <div className="lesson-video-frame">
      <div className="lesson-video">
        {ready ? (
          <video
            key={instanceKey}
            ref={videoRef}
            muted={isMuted}
            playsInline
            poster={poster}
            preload="metadata"
            src={videoUrl}
            onEnded={onVideoEnded}
            onPause={onVideoPause}
            onPlay={onVideoPlay}
          >
            Trình duyệt của bạn không hỗ trợ phát video.
          </video>
        ) : (
          <img src={poster} alt="Khung cảnh mở đầu bài học Vật tròn lấp lánh" />
        )}

        {!ready ? (
          <span className="lesson-video__overlay lesson-video__overlay--status">
            {statusMessage.icon}
            <strong>{statusMessage.title}</strong>
            {statusMessage.detail ? <span>{statusMessage.detail}</span> : null}
            {!loading ? (
              <button type="button" className="lesson-video__retry" onClick={onRetry}>
                Thử tải lại
              </button>
            ) : null}
          </span>
        ) : null}

      </div>
    </div>
  );
}
