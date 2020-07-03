import chroma from 'chroma-js'

const generatePalette = (palette, numOfLevels) => {
    const newPalette = {
        paletteName : palette.paletteName,
        id          : palette.id,
        emoji       : palette.emoji,
        colors      : {}
    }
    const levels = [100, 200, 300, 400, 500, 600, 700, 800, 900]
    let shades = {};
    for(let level of levels){
        shades[level] = [];
    }
    console.log(palette.colors)
    for(let color of palette.colors){
        const newColors = chroma.scale([
                                chroma(color.color).brighten(1.5),
                                color.color, 
                                chroma(color.color).darken(1.5)])
                            .colors(numOfLevels);
        for(let i in levels){
            shades[levels[i]].push({
                name : `${color.name} ${levels[i]}`,
                hex : newColors[i],
                rgb : `rgb(${chroma(newColors[i]).rgb()})`,
                rgba : `rgba(${chroma(newColors[i]).rgba()})`
            })
        }
    }
    newPalette.colors = shades;
    return newPalette

}
export default generatePalette