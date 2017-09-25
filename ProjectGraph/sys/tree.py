import os
import json

from ProjectGraph import filters

def rebuild(filters=filters.default, project_root='.'):
    file_list=[]
    for root, dirs, files in os.walk(project_root):
        if '.git' in dirs:
            dirs.remove('.git') # don't visit .git directories
        for file in files:
            filename, ext = os.path.splitext(file)
            if ext in filters:
                file_list.append(root + '/' + file + ',');

    return json.dumps({ 'files': file_list })
