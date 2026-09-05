import rembg
from PIL import Image

for name in ['mo_mat.jpg', 'nham_mat.jpg']:
    input_p = f'd:/WebsiteDemo/TunaWebsite/assets/{name}'
    output_p = f'd:/WebsiteDemo/TunaWebsite/assets/{name[:-4]}.png'
    inp = Image.open(input_p)
    out = rembg.remove(inp)
    out.save(output_p)
    print(f'Done rembg for {name} -> {output_p}')
