import { ArrowsClockwise, DeviceMobile } from "@phosphor-icons/react";

export function LessonOrientationPrompt() {
  return (
    <section
      className="lesson-orientation"
      aria-label="Hướng dẫn xoay màn hình"
      aria-live="polite"
    >
      <div className="lesson-orientation__icon" aria-hidden="true">
        <DeviceMobile size={48} weight="duotone" />
        <ArrowsClockwise size={24} weight="bold" />
      </div>
      <h2>Hãy xoay ngang điện thoại để học tốt hơn</h2>
      <p>Màn hình bài học sẽ tự mở lại khi thiết bị được xoay ngang.</p>
    </section>
  );
}
