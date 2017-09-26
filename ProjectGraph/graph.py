from .sys import tree
from . import lexer
from . import filters

import json

def update(project_root='.'):
    r = tree.rebuild(filters.py, project_root)
    lexer.parse(r)
    return json.dumps(r)
