from os import listdir
from base64 import b64encode
from os.path import isfile, join
import json
import re
def get_number_from_frame(frame):
    exp = re.match("frame(\\d+)\\.bmp", frame)
    return int(exp.group(1))
mypath = "./frames/"
all_files = [f for f in listdir(mypath) if isfile(join(mypath, f))]
all_files = sorted(all_files, key=get_number_from_frame)

base64files = []
for file in all_files:
    with open(mypath + file, 'r') as f:
        base64string = b64encode(f.read())
        base64files.append(base64string)

print(json.dumps(base64files))
