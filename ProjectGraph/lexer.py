import os

def parse(tree):
    for file in tree['files']:
        for path, size in file.items():
            with open(path) as input_file:
                for line in input_file:
                    print(line)
