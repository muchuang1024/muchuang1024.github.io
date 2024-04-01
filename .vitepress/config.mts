import { defineConfig } from 'vitepress'
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar'
import genNav from 'vitepress-auto-navigation'
import AutoNav from 'vite-plugin-vitepress-auto-nav'
const { nav, sidebar } = genNav({
  baseurl: './docs'
})

nav.forEach(item => {
  console.log(item.text) // 打印 text 属性
  console.log(item.items) // 打印 items 属性
})

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  title: '木川的在线文档网站',
  description: '个人知识库',
  srcDir: '.',
  themeConfig: {
    logo: '/logo.png',
    lastUpdatedText: '更新时间',
    outline: 'deep', // 递归显示多层级
    outlineTitle: '大纲',
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'oss', link: '/docs/03 博客/阿里云 oss 教程' },
    //   { text: 'flomo', link: '/docs/00 素材/flomo 使用指南' }
    // ],
    nav: nav, // 注意：这里不需要手动配置了
    sidebar: sidebar, // 注意：这里不需要手动配置了
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
    footer: {
      message: '木川工作室 （微信：mcmc2024)',
      copyright: 'Copyright © 2024-present 木川工作室'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  },
  vite: {
    resolve: {
      preserveSymlinks: true
    },
    plugins: [AutoNav({})] // 实际上是Sidebar插件，相比AutoSidebar样式更好
    // plugins: [
    //   AutoSidebar({
    //     path: '.',
    //     collapsed: false,
    //     ignoreList: ['.obsidian', '.git', 'node_modules']
    //   })
    // ]
  }
})
