import { isMobile } from '../types'

export const setDomFontSize = (): void => {
  const width = document.documentElement.clientWidth || document.body.clientWidth
  const fontSize = `${Math.max(1200, width) / 100}px`
  const { style } = document.getElementsByTagName('html')[0] as any
  style['font-size'] = fontSize
}

export const setDomTitle = (title: string) =>
  (document.title = isMobile() ? title : `${title} - vite-backen-admin`)
