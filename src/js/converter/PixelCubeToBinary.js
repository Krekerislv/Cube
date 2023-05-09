export class PixelCubeToBinary {
    constructor(pixelCube) {
        this.pixelCube = pixelCube;
    }

    // Function to map a pixel value to binary format
    mapPixelToBinary(pixelValue) {
        const pixelMap = {
            '#000000': '00',
            '#0000FF': '02',
            '#00FF00': '01',
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
            const frame = [];
            for (let x = 0; x < 8; x++) {
                for (let y = 7; y >= 0; y--) {
                    for (let z = 0; z < 8; z++) {
                        const pixelValue = data[y][x][z]; // xyz, zyx, yzx, yxz,| zxy, xzy
                        const binaryPixel = this.mapPixelToBinary(pixelValue.toUpperCase());
                        frame.push(binaryPixel);
                    }
                }
            }
            binaryPixels.push(frame);
        })

        return binaryPixels;
    }

    // Save binary pixels to a file
    saveBinaryFile(fileName) {

        function compareBuffers(a, b) {
            if (a.length !== b.length) {
              return false;
            }
            for (let i = 0; i < a.length; i++) {
              if (a[i] !== b[i]) {
                return false;
              }
            }
            return true;
        }
        
        // Determine how many frames are there in animation
        const frameCount = this.pixelCube.length;

        // Fetch appropiate .gc file template:
        
        let templateName = "../../../assets/frame_templates/blank_" + frameCount + "_frames.gc";
        fetch(templateName)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => {
                const buffer = new Uint8Array(arrayBuffer);
                // Index elements like: buffer[5].toString(16) (returns ff)
            
                // Init buffer of size 512 filled with 00 (empty animation frame)
                const blankAnim = new Uint8Array(512);
                blankAnim.fill(0x00);
                
                // This array will store all indexes of animation frame start
                let matches = [];
            
                for (let i = 0; i < buffer.length; i++) {
                    let temp_buffer = buffer.subarray(i, i+512);
              
                    if (compareBuffers(temp_buffer, blankAnim)) {
                      matches.push(i);
                    }
                  }
              
                console.log(matches);

                const binaryPixels = this.getBinaryPixels();

                // Convert binary pixels to a Uint8Array
                let k = 0; // Matches array index
                binaryPixels.forEach((binaryFrame) => {
                    const byteCharacters = binaryFrame.join('');
                    const byteNumbers = new Array(byteCharacters.length / 2);
                    for (let i = 0; i < byteCharacters.length; i += 2) {
                        byteNumbers[i / 2] = parseInt(byteCharacters.substr(i, 2), 16);
                    }
                    
                    const byteArray = new Uint8Array(byteNumbers);
                
                    // Replace blank animation
                    buffer.set(byteArray, matches[k]);
                    k++;
                });
                
                // Create a Blob object from the Uint8Array
                const blob = new Blob([buffer], { type: 'application/octet-stream' });

                // Create a link and click it to download the file
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();

                  
            })
            .catch(error => console.error(error))

    }
}
