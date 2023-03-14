import numpy as np
from scipy.fft import fft2, fftfreq, fftshift
import matplotlib
import matplotlib.pyplot as plt
import matplotlib.cm as cm
from mpl_toolkits.mplot3d import Axes3D
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
from scipy.io import wavfile
from scipy.ndimage.interpolation import shift
import sounddevice as sd

# Parameters
chunk_size = 16*16  # Number of samples per chunk
window = np.hanning(chunk_size)  # Window function

# Read audio data from WAV file
sample_rate, data = wavfile.read('C:\\Users\\Krišs\\OneDrive\\RTU\\6. semestris\\Rob. vad. izstr. projekts\\Py scripts\\audio.wav')

# If audio data has two channels, take the average to obtain a single-channel signal
if data.ndim == 2:
    data = np.mean(data, axis=1)

# Initialize plot
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

# Initialize sound device
sd.default.samplerate = sample_rate
sd.default.channels = 1
l = 0

# Iterate over audio data in chunks and display 3D FFT plot of current time point
for i in range(0, len(data) - chunk_size, chunk_size):
    # Get current chunk of audio data
    chunk = data[i:i+chunk_size]

    # Apply window function to the chunk of data
    windowed_chunk = window * chunk

    # Perform 2D FFT on the windowed chunk of data
    fft_vals = fft2(windowed_chunk.reshape((16, 16)))
    fft_vals = np.fft.fftshift(fft_vals)
    #fft_vals = shift(fft_vals,4)

    # Calculate frequency axes
    n = fft_vals.shape[0]
    m = fft_vals.shape[1]
    freqs_x = fftfreq(n, d=1/sample_rate)[:n//2]
    freqs_y = fftfreq(m, d=1/sample_rate)[:m//2]

    # Create mesh grid for 3D plot
    X, Y = np.meshgrid(freqs_x, freqs_y)
    l += 1
    

    # Calculate height of each bar in the 3D bar chart
    heights = np.abs(fft_vals[:n//2, :m//2]).ravel()

    heights = np.round(8 * heights / np.max(heights))

    if l == 100:
        #print(fft_vals)
        #print(heights)
        print(heights.shape)

    # Calculate position and size of each bar in the 3D bar chart
    x_pos = X.ravel()
    y_pos = Y.ravel()
    z_pos = np.zeros_like(heights)
    dx = dy = (freqs_x[1] - freqs_x[0]) * np.ones_like(heights)
    dz = heights
    #dz = np.roll(heights,32)

   # cmap = cm.get_cmap('jet')
    cmap = matplotlib.colormaps.get_cmap("jet")
    max_height = np.max(dz)   # get range of colorbars
    min_height = np.min(dz)

    # scale each z to [0,1], and get their rgb values
    rgba = [cmap((k-min_height)/max_height) for k in dz] 

    # Update plot with new FFT values
    ax.clear()
    bars = ax.bar3d(x_pos, y_pos, z_pos, dx, dy, dz, color=rgba, shade=True)
    ax.set_xlabel('Frequency (Hz)')
    ax.set_ylabel('Frequency (Hz)')
    ax.set_zlabel('Magnitude')
    ax.set_zlim(0, 8)
    plt.pause(0.001)

    # Play current chunk of audio
    #sd.play(chunk, blocking=True)

sd.stop()
plt.show()
