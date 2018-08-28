import imageio
import skimage.transform
import numpy as np
from glob import glob
from PIL import Image
import functools

photos = set(glob("medalPhotos/*.jpg"))
photos_small = set(glob("medalPhotos/*_downsize.jpg"))
offsetIndex = 1
img_size = (320, 426)

for index, photo in enumerate(photos - photos_small):
    photo_index = photo.split('\\')[1].split('.')[0]
    # out_file = "medalPhotos2/" + str(photo_index)
    print(index, photo)

    img = Image.open(photo)
    img.save("medalPhotos2/{}.jpg".format(photo_index))
    # print("medalPhotos2/{}.jpg".format(photo_index))
    img.thumbnail(img_size)
    img.save("medalPhotosDownsize/{}_downsize.jpg".format(photo_index))
    # print("medalPhotosDownsize/{}_downsize.jpg".format(photo_index))
