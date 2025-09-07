import { 
  getCurrentWindow, 
  currentMonitor, 
  LogicalSize, 
  LogicalPosition 
} from "@tauri-apps/api/window"

let originalState = null

function isTauri() {
  return "__TAURI_INTERNALS__" in window // v2 判断方式
}

export async function pinToTopRight() {
  if (!isTauri()) {
    console.warn("pinToTopRight: Not running in Tauri environment")
    return
  }

  const appWindow = getCurrentWindow()
  const monitor = await currentMonitor()
  if (!monitor) {
    console.warn("No monitor found")
    return
  }

  const { width } = monitor.size
  const pos = await appWindow.outerPosition()
  const size = await appWindow.outerSize()

  originalState = { pos, size }

  await appWindow.setSize(new LogicalSize(270, 300))
  await appWindow.setPosition(new LogicalPosition(width - 320, 20))
  await appWindow.setDecorations(false)
  await appWindow.setAlwaysOnTop(true)
}

export async function unpin() {
  if (!isTauri()) {
    console.warn("unpin: Not running in Tauri environment")
    return
  }

  const appWindow = getCurrentWindow()

  await appWindow.setAlwaysOnTop(false)
  await appWindow.setDecorations(true)

  if (originalState) {
    await appWindow.setSize(new LogicalSize(originalState.size.width, originalState.size.height))
    await appWindow.setPosition(new LogicalPosition(originalState.pos.x, originalState.pos.y))
    originalState = null
  }
}
