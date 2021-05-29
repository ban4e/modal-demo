const { generateSpritePlaceholder, stringify } = require('svg-sprite-loader/lib/utils');

module.exports = function runtimeGenerator({ symbol, loaderContext }) {
    const publicPath = loaderContext._compiler.options.output.publicPath;
    const spritePlaceholder = generateSpritePlaceholder(symbol.request.file);
    const viewBoxParts = symbol.viewBox.split(' ');
    const width = parseInt(viewBoxParts[2], 10);
    const height = parseInt(viewBoxParts[3], 10);

    const data = {
        width,
        height,
        viewBox: symbol.viewBox,
        url: publicPath + spritePlaceholder
    };

    return `export default ${stringify(data)}`;
};
