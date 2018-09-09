require('dotenv').config()

const serveStatic = require('serve-static')
const path = require('path')
const redirectSSL = require('redirect-ssl')
const healthCheckMiddleware = require('./middleware/server/health-check.js')
const sourcemapMiddleware = require('./middleware/server/sourcemaps.js')
const url = require('url');
// const packageVersion = require('./package.json').version;
const gitRevision = require('git-rev-sync');

module.exports = {
  env: { // Will be available client-side
    GOOGLE_CAST_APP_ID: process.env.GOOGLE_CAST_APP_ID,
    CHROME_EXTENSION_ID: process.env.CHROME_EXTENSION_ID,
  },
  head: {
    title: 'Web Captioner',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Real-time captioning for your event, speech, classroom lecture, or church service.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' }, // https://github.com/nuxt/nuxt.js/issues/1204
    ],
  },
  modules: [
    ['nuxt-env'],
    ['bootstrap-vue/nuxt', { css: false }],
    ['@nuxtjs/sentry'],
    ['@nuxtjs/google-analytics', {
      id: 'REMOVED',
      batch: {
        enabled: true,
        amount: 2,
        delay: 400, // ms
      },
    }],
    ['nuxt-fontawesome', {
      component: 'fa', 
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['faFileAlt', 'faFileWord', 'faExclamationTriangle', 'faTimes', 'faMicrophone', 'faDesktop', 'faExternalLinkAlt', 'faSave', 'faTrashAlt', 'faCog', 'faCheckCircle', 'faSpinner', 'faChevronRight', 'faMinusCircle', 'faPlusCircle', 'faArrowLeft', 'faFlask', 'faCaretRight', 'faCaretDown', 'faKeyboard', ],
        },
        {
          set: '@fortawesome/free-regular-svg-icons',
          icons: ['faThumbsUp'],
        },
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['faApple', 'faWindows', 'faAndroid', 'faChrome'],
        },
      ]
    }],
  ],
  plugins: [
    '~/node_modules/vue-contenteditable-directive',
  ],
  css: [
    '@/assets/scss/app.scss',
  ],
  sentry: {
    public_key: 'REMOVED',
    project_id: 'REMOVED',
    config: {
      release: gitRevision.short(),
      environment: process.env.HOSTNAME,
    },
  },
  /*
  ** Customize the progress bar color
  */
  loading: false,
  /*
  ** Build configuration
  */
  build: {
    // analyze: true,
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient, isServer }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      if (isClient) {
        config.devtool = '#source-map';
      }

      if (isServer) {

      }
    }
  },
  hooks(hook) {
    hook ('render:setupMiddleware', (app) => {
      app.use('/health-check', healthCheckMiddleware);

      app.use(redirectSSL.create({
        redirectHost: url.parse(process.env.HOSTNAME).hostname,
      }));

      app.use(sourcemapMiddleware);
    })
  },
  serverMiddleware: [
    { path: '/feedback', handler: '~/middleware/server/feedback.js' },
    { path: '/', handler: serveStatic(path.resolve(__dirname + '/../static-site/public')) },
  ],
}

