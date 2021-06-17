import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import { readFileSync, readdirSync, writeFileSync, statSync } from 'fs'
import { resolve } from 'path'

const listFile = (dir: string): any => {
  const list = readdirSync(dir).filter((file) => !file.includes('index'))
  return list
    .map((file) => {
      const fullpath = resolve(dir, file)
      const stats = statSync(fullpath)
      if (stats.isDirectory()) {
        return listFile(fullpath)
      } else {
        return fullpath
      }
    })
    .flat(Infinity)
}

export const vitePluginSitemap = (options: any = {}) => {
  const routePath = options.path || '../src/router'
  const target = options.target || '../public/sitemap.xml'
  let hostname = options.hostname || 'https://jarrychen.xyz'
  if (hostname[hostname.length - 1] === '/') {
    hostname = hostname.slice(0, hostname.length - 1)
  }
  return {
    name: 'vite-plugin-sitemap',
    configureServer: (ctx: any) => {
      const routerDir = resolve(__dirname, routePath)
      const routes = listFile(routerDir)
      const links: object[] = []
      routes.forEach((item: string) => {
        const route: any = readFileSync(item, 'utf8')
        const mode = /path:.*/g
        route.match(mode).forEach((url: string) => {
          const link = url.replace('path:', '').trim().replace(/[',]/g, '')
          links.push({
            url: ['http', '//'].some((str) => link.startsWith(str))
              ? `${link}`
              : `${hostname}${link}`,
            changefreq: 'daily',
            priority: 0.3
          })
        })
      })
      links.push({
        url: `${hostname}/me`,
        changefreq: 'daily',
        priority: 0.2
      })
      links.push({
        url: `${hostname}/404`,
        changefreq: 'daily',
        priority: 0.1
      })
      const stream = new SitemapStream({
        hostname,
        lastmodDateOnly: false,
        xmlns: {
          news: true,
          xhtml: true,
          image: true,
          video: true,
          custom: [
            'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"',
            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"'
          ]
        }
      })
      streamToPromise(Readable.from(links).pipe(stream))
        .then((data) => writeFileSync(resolve(__dirname, target), data.toString()))
        .catch(console.log)
    }
  }
}
