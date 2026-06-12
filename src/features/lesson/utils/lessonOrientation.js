function getFullscreenElement() {
  if (typeof document === "undefined") {
    return null;
  }

  return document.fullscreenElement || document.webkitFullscreenElement || null;
}

async function requestLessonFullscreen(rootElement) {
  if (!rootElement || getFullscreenElement()) {
    return Boolean(getFullscreenElement());
  }

  const requestFullscreen =
    rootElement.requestFullscreen || rootElement.webkitRequestFullscreen;

  if (typeof requestFullscreen !== "function") {
    return false;
  }

  try {
    await requestFullscreen.call(rootElement, { navigationUI: "hide" });
    return true;
  } catch {
    return false;
  }
}

async function lockOrientation(orientation) {
  const orientationApi =
    typeof window !== "undefined" ? window.screen?.orientation : undefined;

  if (typeof orientationApi?.lock !== "function") {
    return false;
  }

  try {
    await orientationApi.lock(orientation);
    return true;
  } catch {
    return false;
  }
}

export async function enterLessonLandscape(rootElement) {
  const fullscreen = await requestLessonFullscreen(rootElement);
  const landscapeLocked = await lockOrientation("landscape");

  return { fullscreen, landscapeLocked };
}

export async function exitLessonLandscape({ restorePortrait = true } = {}) {
  const orientationApi =
    typeof window !== "undefined" ? window.screen?.orientation : undefined;
  let portraitLocked = false;

  if (restorePortrait && getFullscreenElement()) {
    portraitLocked = await lockOrientation("portrait");
  }

  try {
    orientationApi?.unlock?.();
  } catch {
    // Orientation APIs are optional and may reject outside fullscreen.
  }

  if (typeof document !== "undefined" && getFullscreenElement()) {
    const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen;

    if (typeof exitFullscreen === "function") {
      try {
        await exitFullscreen.call(document);
      } catch {
        // Leaving the page must continue even when fullscreen cleanup is denied.
      }
    }
  }

  if (restorePortrait && !portraitLocked) {
    await lockOrientation("portrait");
  }
}

export function isSmallLessonViewport() {
  if (typeof window === "undefined") {
    return false;
  }

  if (typeof window.matchMedia === "function") {
    return window.matchMedia("(max-width: 1024px)").matches;
  }

  return window.innerWidth <= 1024;
}

export function isSmallPortraitViewport() {
  if (!isSmallLessonViewport()) {
    return false;
  }

  if (typeof window.matchMedia === "function") {
    return window.matchMedia("(orientation: portrait)").matches;
  }

  return window.innerHeight >= window.innerWidth;
}
