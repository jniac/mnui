type DragInfo = {
  position: { x: number; y: number}
  positionStart: { x: number; y: number}
  positionOld: { x: number; y: number} 
  positionDelta: { x: number; y: number} 
  shiftKey: boolean
  altKey: boolean
  metaKey: boolean
  ctrlKey: boolean
}

export const onDrag = (
  element: HTMLElement, 
  callback: (info: DragInfo) => void,
  {
    dragThreshold = 10,
  } = {}
) => {
  const info: DragInfo = {
    positionStart: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
    positionOld: { x: 0, y: 0 },
    positionDelta: { x: 0, y: 0 },
    shiftKey: false,
    altKey: false,
    metaKey: false,
    ctrlKey: false,
  }
  let pointerEvent: PointerEvent
  const onDown = (event: PointerEvent) => {
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    info.positionStart.x = event.x
    info.positionStart.y = event.y
    info.position.x = event.x
    info.position.y = event.y
    info.positionOld.x = event.x
    info.positionOld.y = event.y
    pointerEvent = event
    loopId = requestAnimationFrame(loop)
  }
  const onMove = (event: PointerEvent) => {
    pointerEvent = event
  }
  const onUp = () => {
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onUp)
    cancelAnimationFrame(loopId)
  }
  let loopId = -1
  const loop = () => {
    loopId = requestAnimationFrame(loop)
    info.positionOld.x = info.position.x
    info.positionOld.y = info.position.y
    info.position.x = pointerEvent.x
    info.position.y = pointerEvent.y
    info.positionDelta.x = info.position.x - info.positionOld.x
    info.positionDelta.y = info.position.y - info.positionOld.y
    info.shiftKey = pointerEvent.shiftKey
    info.altKey = pointerEvent.altKey
    info.metaKey = pointerEvent.metaKey
    info.ctrlKey = pointerEvent.ctrlKey
    callback(info)
  }
  element.addEventListener('pointerdown', onDown)
  const destroy = () => {
    element.removeEventListener('pointerdown', onDown)
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onUp)
    cancelAnimationFrame(loopId)
  }
  return { destroy }
}
