class Filter:

    def __init__(self, linklist=[], whitelist=[], blacklist=[]):
        print(linklist)
        self.linklist = linklist
        self.whitelist = whitelist + linklist
        self.blacklist = blacklist

    def __add__(self, other):
        self.linklist += other.linklist
        self.whitelist += other.whitelist
        self.blacklist += other.blacklist
