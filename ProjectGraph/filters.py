common = []

c = [ '*.c', '*.h', 'Makefile' ] + common
py = [ '*.py' ] + common
js = [ '*.js' ] + common
html = [ '*.html', '*.css' ] + js + common

default = c
