const colorToRGB = (color, includeAlpha = false) => {
    const {r, g, b, a} = color;

    if (includeAlpha) {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    return `rgb(${r}, ${g}, ${b})`;
};

const colorToHex = color => {
    const {r, g, b} = color.toHex();
    return `#${r}${g}${b}`;
}

const formatColor = (option, color) => {
    let outputColor;

    switch (option) {
        case "rgb":
            outputColor = colorToRGB(color);
            break;
        case "rgba":
            outputColor = colorToRGB(color, true);
            break;
        case "hex":
        default:
            outputColor = colorToHex(color);
            break;
    }

    return outputColor;
}

const buildColorJSON = (context, colors) => {
    const output = {};

    const colorOption = context.getOption('color-format');
    const formatColorWithOption = formatColor.bind(this, colorOption);

    colors.forEach((color) => {
        output[color.name] = formatColorWithOption(color);
    });

    return output;
}

const buildTextStyleJSON = (context, textStyles) => {
    const output = {};

    const fontFamilyOption = context.getOption('include-font-family');
    const fontSizeOption = context.getOption('include-font-size');
    const fontWeightOption = context.getOption('include-font-weight');
    const fontColorOption = context.getOption('include-font-color');

    const colorOption = context.getOption('color-format');
    const formatColorWithOption = formatColor.bind(this, colorOption);

    if (!(fontFamilyOption || fontSizeOption || fontWeightOption || fontColorOption)) {
        // no point in looping
        return output;
    }

    textStyles.forEach(({ name, fontFamily, fontSize, fontWeight, color }) => {
        output[name] = {};

        if (fontFamilyOption) output[name].fontFamily = fontFamily;
        if (fontSizeOption) output[name].fontSize = fontSize;
        if (fontWeightOption) output[name].weight = fontWeight;
        if (fontColorOption) output[name].color = formatColorWithOption(color);
    });

    return output;
};

function layer(context, selectedLayer) {

}

function styleguideColors(context, colors) {
    const output = buildColorJSON(context, colors);

    return {
        code: JSON.stringify(output, null, 2),
        language: 'json',
    };
}

function styleguideTextStyles(context, textStyles) {
    const output = buildTextStyleJSON(context, textStyles);

    return {
        code: JSON.stringify(output, null, 2),
        language: 'json',
    };
}

function exportStyleguideColors(context, colors) {
    const output = buildColorJSON(context, colors);

    return {
        code: JSON.stringify(output, null, 2),
        language: 'json',
        filename: 'colors.json',
    };
}

function exportStyleguideTextStyles(context, textStyles) {
    const output = buildTextStyleJSON(context, textStyles);

    return {
        code: JSON.stringify(output, null, 2),
        language: 'json',
        filename: 'fonts.json',
    };
}

function comment(context, text) {

}

export default {
    layer,
    styleguideColors,
    styleguideTextStyles,
    exportStyleguideColors,
    exportStyleguideTextStyles,
    comment
};