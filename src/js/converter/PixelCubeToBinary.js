export class PixelCubeToBinary {
    constructor(pixelCube) {
        this.pixelCube = pixelCube;
    }

    // Function to map a pixel value to binary format
    mapPixelToBinary(pixelValue) {
        const pixelMap = {
            '#000000': '00',
            '#00FF00': '01',
            '#0000FF': '02',
            '#00FFFF': '03',
            '#FF0000': '04',
            '#FFFF00': '05',
            '#FF00FF': '06',
            '#FFFFFF': '07',
            '#111111': '08',
            '#005500': '09',
            '#000055': '0A',
            '#005555': '0B',
            '#550000': '0C',
            '#555500': '0D',
            '#550055': '0E',
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
    saveBinaryFile(fileName, timeout) {

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
                // Get animation binary array and get frame count
                const binaryPixels = this.getBinaryPixels();
                const frameCount = binaryPixels.length;

                const buffer = new Uint8Array(arrayBuffer);
                // Index elements like: buffer[5].toString(16) (returns ff)
            
                // Init buffer of size 512 filled with 00 (empty animation frame)
                const blankAnim = new Uint8Array(512);
                blankAnim.fill(0x00);

                // Init buffer of size 2 that contains default timeout value (200)
                const defaultTimeoutBuf = new Uint8Array(2);

                defaultTimeoutBuf[0] = 0xC8;   // Set the lower byte in the buffer
                defaultTimeoutBuf[1] = 0x00;  // Set the higher byte in the buffer

                // This array will store all indexes of animation frame start
                let frame_matches = [];
                let timeout_matches = [];
            
                for (let i = 0; i < buffer.length; i++) {
                    let temp_buffer_frames = buffer.subarray(i, i+512);
                    let temp_buffer_timeout = buffer.subarray(i, i+2);
              
                    if (compareBuffers(temp_buffer_frames, blankAnim)) {
                      frame_matches.push(i);
                    }

                    if (compareBuffers(temp_buffer_timeout, defaultTimeoutBuf)) {
                        if (timeout_matches.length < frameCount) {
                            timeout_matches.push(i);
                        } else {
                            console.log("How did this happen?");
                        }
                        
                    }
                }


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
                    buffer.set(byteArray, frame_matches[k]);
                    k++;
                });

                // Create a buffer from user set timeout (seperate uint16 value into 2 uint8)
                const userTimeoutBuf = new Uint8Array(2)
                const highByte = (timeout >> 8) & 0xFF;
                const lowByte = timeout & 0xFF;
                userTimeoutBuf[0] = lowByte;
                userTimeoutBuf[1] = highByte;
                

                // Set timeout values
                buffer.set(userTimeoutBuf, timeout_matches[timeout_matches.length-1]);
                
                
                
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
