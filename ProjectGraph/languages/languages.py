from .filters import Filter
from .lexers import Lexer

class Language:
    """Class designing a Language, defined from a 'Filter' and a 'Lexer'"""

    def __init__(self, filter, lexer):
        self.filter = filter
        self.lexer = lexer


from .c.filter import filter
from .c.lexer import lexer
c = Language(Filter(*filter), lexer)

from .cpp.filter import filter
from .cpp.lexer import lexer
cpp = Language(Filter(*filter) + c.filter, lexer)

from .py.filter import filter
from .py.lexer import lexer
py = Language(Filter(*filter), lexer)

from .js.filter import filter
from .js.lexer import lexer
js = Language(Filter(*filter), lexer)

from .html.filter import filter
from .html.lexer import lexer
html = Language(Filter(*filter) + js.filter, lexer)
