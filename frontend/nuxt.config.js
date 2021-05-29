// eslint-disable-next-line nuxt/no-cjs-in-config
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const svgRuntimeGenerator = require.resolve('./utils/svgGenerator.js');

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: '⚡',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '' }],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['@/assets/scss/app.scss'],
    styleResources: {
        scss: ['~/assets/scss/globals/variables.scss', '~/assets/scss/globals/mixins.scss']
    },

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/modalize.js', mode: 'client' }
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: [
        '~/components', // shortcut to { path: '~/components' }
        { path: '~/components/Modal/', prefix: false }
    ],

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ['@nuxtjs/style-resources'],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        babel: {
            plugins: [
                ['@babel/plugin-proposal-private-methods', { loose: true }],
                ['@babel/plugin-proposal-optional-chaining']
            ]
        },
        loaders: {
            sass: {
                implementation: require('sass')
            },
            scss: {
                implementation: require('sass'),
                sassOptions: {
                    precision: 9
                }
            }
        },
        extend(config, ctx) {
            // Excludes /assets/svg from url-loader
            const svgRule = config.module.rules.find(rule => rule.test.test('.svg'));
            svgRule.test = /\.(png|jpe?g|gif|webp)$/;

            config.module.rules.push({
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: ctx.isDev ? 'svg-sprite.svg' : 'svg-sprite.[contenthash].svg',
                            runtimeGenerator: svgRuntimeGenerator
                        }
                    },
                    {
                        loader: 'svgo-loader'
                    }
                ]
            });
            config.plugins.push(
                new SpriteLoaderPlugin({
                    plainSprite: true,
                    spriteAttrs: {
                        id: 'svgSprite'
                    }
                })
            );
        }
    }
};
