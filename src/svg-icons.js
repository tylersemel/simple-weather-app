// In a separate file, e.g., src/svg-icons.js
const reqSvgs = require.context("./assets/SVG", false, /\.svg$/);
const svgIcons = reqSvgs.keys().reduce((images, path) => {
  images[path.replace("./", "").replace(".svg", "")] = reqSvgs(path);
  return images;
}, {});

export default svgIcons;
