import { defineConfig } from 'vitepress'
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '木川的在线文档网站',
  description: '个人知识库',
  srcDir: '.',
  themeConfig: {
    // logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'oss', link: '/docs/03 博客/阿里云 oss 教程' },
      { text: 'flomo', link: '/docs/00 素材/flomo 使用指南' }
    ],

    sidebar: [
      {
        text: '分类',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
  },
  vite: {
    resolve: {
      preserveSymlinks: true
    },
    plugins: [
      AutoSidebar({
        path: '.',
        collapsed: false,
        ignoreList: ['.obsidian', '.git', 'node_modules']
      })
    ]
  }
})
