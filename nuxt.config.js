const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
			{ hid: "description", name: "description", content: pkg.description },
			{ name: "apple-mobile-web-app-title", content: "Ara" },
			{ name: "application-name", content: "Ara" },
			{ name: "msapplication-TileColor", content: "#2b5797" },
			{ name: "msapplication-TileImage", content: "/mstile-144x144.png" },
			{ name: "theme-color", content: "#3498db" }
		],
		link: [
			{ rel: "apple-touch-icon", type: "image/png", href: "/apple-touch-icon.png", sizes: "180x180" },
			{ rel: "icon", type: "image/png", href: "/favicon-32x32.png", sizes: "32x32" },
			{ rel: "icon", type: "image/png", href: "/android-chrome-192x192.png", sizes: "192x192" },
			{ rel: "icon", type: "image/png", href: "/favicon-16x16.png", sizes: "16x16" },
			{ rel: "manifest", type: "image/png", href: "/site.webmanifest" },
			{ rel: "mask-icon", type: "image/png", href: "/safari-pinned-tab.svg", color: "#3498db" }
		]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  },
  env: {
      firebaseConfig: {
          apiKey: "AIzaSyBKw4Or-zv1OC-K60Ym6jQmMq9vB6Tb1N0",
          authDomain: "cls-innovation-app.firebaseapp.com",
          databaseURL: "https://cls-innovation-app.firebaseio.com",
          projectId: "cls-innovation-app",
          storageBucket: "cls-innovation-app.appspot.com",
          messagingSenderId: "425235510420"
      },
  }
}
