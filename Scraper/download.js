import fs from 'fs';
import cliProgress from "cli-progress";
import colors from "ansi-colors";
import Downloader from "nodejs-file-downloader";

(async () => {
    if (!fs.existsSync('./output/data.json')) {
        console.log(colors.red('Please run the scrape script first!'));
        return;
    }

    const pokemonList = JSON.parse(fs.readFileSync('./output/data.json'));

    let totalCardImages = 0;
    for (const pokemon of pokemonList) {
        totalCardImages += pokemon.cardImages.length;
    }

    console.log("Start downloading " + totalCardImages + " card images.");
    const bar = new cliProgress.SingleBar({
        format: 'Downloading Images |' + colors.cyan('{bar}') + '| {percentage}% | {value}/{total} Pokemon | Duration: {duration_formatted} | ETA: {eta_formatted}',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    });
    bar.start(totalCardImages, 0);

    for (const pokemon of pokemonList) {
        let imageIndex = 1;
        for (const link of pokemon.cardImages) {
            if (fs.existsSync('./output/Images/' + pokemon.id + '_' + pokemon.name + '_' + imageIndex + '.png')) {
                continue;
            }

            await new Downloader({
                url: link,
                directory: "./output/Images",
                onBeforeSave: () => {
                    bar.increment();
                    return pokemon.id + '_' + pokemon.name + '_' + imageIndex + '.png';
                },
            }).download();
            imageIndex++;
        }
    }

    bar.stop();
})();