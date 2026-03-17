import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './style.css'

export default {
	enhanceApp({ app: _app, router: _router, siteData: _siteData }) {
		// register global components
	},
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {})
	},
} satisfies Theme
