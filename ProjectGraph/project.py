from .sys import tree
from . import lexer

from .languages import languages

class Project:
    """ Class designing a project manager for a specific language"""

    def __init__(self, root='.', language=languages.py):
        print(language.filter)
        self.root = root
        self.setLanguage(language)

    def rebuild(self):
        """ Rebuild the project tree"""
        self.tree = tree.build(self.root, self.lang.filter)

    def relink(self):
        """ Relink project files"""
        lexer.parse(self.tree)

    def setLanguage(self, language):
        self.lang = self.language = language
