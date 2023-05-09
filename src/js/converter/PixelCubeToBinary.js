export class PixelCubeToBinary {
    constructor(pixelCube) {
        this.pixelCube = pixelCube;
    }

    // Function to map a pixel value to binary format
    mapPixelToBinary(pixelValue) {
        const pixelMap = {
            '#000000': '00',
            '#0000FF': '01',
            '#00FF00': '02',
            '#00FFFF': '03',
            '#FF0000': '04',
            '#FF00FF': '05',
            '#FFFF00': '06',
            '#FFFFFF': '07',
            '#111111': '08',
            '#000055': '09',
            '#005500': '0A',
            '#005555': '0B',
            '#550000': '0C',
            '#550055': '0D',
            '#555500': '0E',
            '#555555': '0F'
        };
        return pixelMap[pixelValue] || '00';
    }

    // Convert each pixel in the cube to binary format
    getBinaryPixels() {
        const binaryPixels = [];
        this.pixelCube.forEach((data) => {
            for (let x = 0; x < 8; x++) {
                for (let y = 0; y < 8; y++) {
                    for (let z = 7; z >= 0; z--) {
                        const pixelValue = data[x][y][z];
                        const binaryPixel = this.mapPixelToBinary(pixelValue.toUpperCase());
                        binaryPixels.push(binaryPixel);
                    }
                }
            }
        })

        return binaryPixels;
    }

    // Save binary pixels to a file
    saveBinaryFile(fileName) {
        const binaryPixels = this.getBinaryPixels();

        // Convert binary pixels to a Uint8Array
        const byteCharacters = binaryPixels.join('');
        const byteNumbers = new Array(byteCharacters.length / 2);
        for (let i = 0; i < byteCharacters.length; i += 2) {
            byteNumbers[i / 2] = parseInt(byteCharacters.substr(i, 2), 16);
        }
        const byteArray = new Uint8Array(byteNumbers);

        // Create a Blob object from the Uint8Array
        const blob = new Blob([byteArray], { type: 'application/octet-stream' });

        // Create a link and click it to download the file
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    }
}
