from pathlib import Path
from rembg import remove
from PIL import Image
src = Path('src/imports/Resume-profile.png')
dst = Path('src/imports/profile-transparent.png')
img = Image.open(src).convert('RGBA')
result = remove(img)
result.save(dst)
print('saved', dst)
