import fnmatch
import json
import os

from ProjectGraph import filters

def rebuild(filters=filters.default, project_root='.'):

    file_list = []
    #cwd = os.getcwd()
    #os.chdir(project_root)

    #for root, dirs, files in os.walk('.'):
    for root, dirs, files in os.walk(project_root):
        if '.git' in dirs:
            dirs.remove('.git') # don't visit .git directories

        for file in files:
            if not file.startswith('.'):
                for ext in filters:
                    if fnmatch.fnmatch(file, ext):
                        path = os.path.join(root, file)
                        file_list.append({ path : os.path.getsize(path) });

    #os.chdir(cwd)

    #return json.dumps({ 'files': file_list })
    return { 'files': file_list }
