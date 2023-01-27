// @generated: @expo/next-adapter@2.1.52
// Learn more: https://docs.expo.io/guides/using-nextjs/

const { withExpo } = require("@expo/next-adapter");
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withFonts = require("next-fonts");
const withTM = require("next-transpile-modules")(["react-native-web"]);

const nextConfig = {
  images: {
    disableStaticImages: true,
  },
};

module.exports = withPlugins(
  [withTM, withExpo, withImages, withFonts],
  nextConfig
);
