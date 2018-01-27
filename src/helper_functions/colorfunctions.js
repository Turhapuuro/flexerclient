export const getRandomColor = (brightness = 3) => {
    // Six levels of brightness from 0 to 5, 0 being the darkest
    const rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    const mix = [brightness * 51, brightness * 51, brightness * 51]; // 51 => 255/5
    const mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map((x) => (Math.round(x / 2.0)));
    return "rgb(" + mixedrgb.join(",") + ")";
};
