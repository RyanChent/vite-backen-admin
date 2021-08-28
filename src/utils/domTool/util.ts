import { isFunction } from '../types'

export const launchFullscreen = (element: any) => {
  const fullScreen = [
    'requestFullscreen',
    'mozRequestFullScreen',
    'webkitRequestFullScreen',
    'msRequestFullScreen'
  ].find((key) => isFunction(element[key]))
  fullScreen && element[fullScreen]()
}

export const exitFullscreen = (element: any) => {
  const exitFull = ['exitFullscreen', 'mozCancelFullScreen', 'webkitExitFullscreen'].find((key) =>
    isFunction(element[key])
  )
  exitFull && element[exitFull]()
}

export const loadScript = (src: string, asyncScript = true, type = 'text/javascript') => {
  const script = document.createElement('script')
  Object.assign(script, {
    type,
    src,
    async: asyncScript
  })
  document.body.append(script)
  return script
}
