import { defineConfig } from 'vitepress'

import nav from './nav.mjs'
import sidebar from './sidebar.mjs'

// https://vitepress.dev/reference/site-config

export default defineConfig({
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  title: '木川博客',
  description: '个人知识库',
  srcDir: '.',
  themeConfig: {
    logo: '/favicon.png',
    lastUpdatedText: '更新时间',
    outline: 'deep', // 递归显示多层级
    outlineTitle: '大纲',
    // https://vitepress.dev/reference/default-theme-config
    nav: nav,
    sidebar: sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/muchuang1024' }],
    footer: {
      message: '木川工作室 （微信：mcmc2024)',
      copyright: 'Copyright © 2024-present 木川工作室'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    search: {
      provider: 'local'
    }
  },
  vite: {
    resolve: {
      preserveSymlinks: true
    }
  }
})
