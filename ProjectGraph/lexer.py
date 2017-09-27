import os

def test(path, size):
    with open(path) as input_file:
        [print(line) for line in input_file]

def parse(tree):
    [[test(path, size) for path, size in file.items()] for file in tree['files']]
