import os
import sys

symbols = {}
externals_symbols = {}
bracket_level = 0

def extract_symbols(line):

    global bracket_level

    # BAD: won't work with multiple brackets
    # { {
    if '{' in line:
        bracket_level += 1

    if bracket_level == 0:
        sys.stdout.write(line)
    else:
        sys.stdout.write('# ' + line)

    # Be careful, what about lines like this:
    # int add(int a, int b) {
    # return add(1, 2) }
    # int add(int a, int b) { return (a + b); }

    if '}' in line:
        bracket_level -= 1


def scan_file(path, size):
    print('== Scanning \'' + path + '\' ==')
    with open(path) as input_file:
        [extract_symbols(line) for line in input_file]
    print('')

def parse(tree):
    """ Project Scanner"""
    # For each field 'files' in the tree,
    # extract fields path & size and pass it to file scanner
    [[scan_file(path, size) for path, size in file.items()] for file in tree['files']]
