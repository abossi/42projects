from ProjectGraph.sys import tree
from ProjectGraph import filters

def update(project_root='.'):
    return tree.rebuild(filters.c, project_root)
