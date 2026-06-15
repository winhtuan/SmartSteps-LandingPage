import { useCallback, useEffect, useRef } from "react";

/**
 * Hook quản lý phát âm thanh từ file MP3 local.
 * Hỗ trợ phát ngay một file hoặc phát lần lượt một chuỗi file.
 *
 * @param {boolean} enabled - Cho phép phát âm hay không (false khi isMuted = true)
 */
export function useTextToSpeech(enabled = true) {
  const enabledRef = useRef(enabled);
  const audioRef = useRef(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  // Dọn dẹp khi unmount
  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  /**
   * Phát ngay một file âm thanh (URL hoặc import đã resolve).
   * Huỷ bất kỳ âm thanh nào đang phát.
   * @param {string} src - Đường dẫn file MP3
   */
  const speak = useCallback((src) => {
    if (!enabledRef.current || !src) return;

    // Dừng âm thanh đang phát
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    cancelledRef.current = false;
    const audio = new Audio(src);
    audioRef.current = audio;
    audio.play().catch(() => {
      // Bỏ qua lỗi autoplay policy
    });
  }, []);

  /**
   * Phát lần lượt một mảng file âm thanh với khoảng dừng giữa các file.
   * @param {string[]} srcs  - Mảng đường dẫn file MP3
   * @param {number}   pauseMs - Thời gian dừng giữa hai file (ms)
   * @param {object}   [opts] - Tuỳ chọn bổ sung
   * @param {(index: number) => void} [opts.onItemStart] - Gọi khi bắt đầu phát item thứ index
   * @param {() => void} [opts.onSequenceEnd] - Gọi khi chuỗi phát xong hoàn toàn
   */
  const speakSequence = useCallback((srcs, pauseMs = 600, opts = {}) => {
    const { onItemStart, onSequenceEnd } = opts;
    if (!enabledRef.current || !srcs?.length) return;

    // Dừng âm thanh đang phát
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    cancelledRef.current = false;
    let currentIndex = 0;

    const finish = () => {
      if (!cancelledRef.current && onSequenceEnd) {
        onSequenceEnd();
      }
    };

    const playNext = () => {
      if (cancelledRef.current || currentIndex >= srcs.length) {
        finish();
        return;
      }

      const src = srcs[currentIndex];
      const itemIndex = currentIndex;
      currentIndex++;

      if (!src) {
        // Bỏ qua slot trống, chuyển ngay
        setTimeout(playNext, pauseMs);
        return;
      }

      if (onItemStart) {
        onItemStart(itemIndex);
      }

      const audio = new Audio(src);
      audioRef.current = audio;

      audio.onended = () => {
        if (!cancelledRef.current && currentIndex < srcs.length) {
          setTimeout(playNext, pauseMs);
        } else {
          finish();
        }
      };

      audio.onerror = () => {
        // Nếu file lỗi, tiếp tục với file tiếp theo
        if (!cancelledRef.current && currentIndex < srcs.length) {
          setTimeout(playNext, pauseMs);
        } else {
          finish();
        }
      };

      audio.play().catch(() => {
        // Autoplay bị chặn - thử file tiếp
        if (!cancelledRef.current && currentIndex < srcs.length) {
          setTimeout(playNext, pauseMs);
        } else {
          finish();
        }
      });
    };

    playNext();
  }, []);

  /**
   * Huỷ bất kỳ âm thanh nào đang phát.
   */
  const cancel = useCallback(() => {
    cancelledRef.current = true;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
  }, []);

  return { speak, speakSequence, cancel };
}
