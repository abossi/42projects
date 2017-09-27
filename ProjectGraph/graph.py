from .project import Project

import json

project = Project()

def chroot(root):
    project.root = root

def update():
    project.rebuild()
    project.relink()
    return json.dumps(project.tree)
