import api.resources.parser as parser

import unittest

class TestParser(unittest.TestCase):
    def test_parsing(self):
        test_source = """
0
* 1 {
    2
}
* 3 {
    4
* 5 {
   6
}
}
"""
        parsed = parser.parse(test_source)
        assert parsed == {'text': '0', 'options': [{'option_text': '1', 'rest': {'text': '2', 'options': []}},
        {'option_text': '3', 'rest': {'text': '4', 'options': [{'option_text': '5', 'rest': {'text': '6', 'options': []}}]}}]}


if __name__ == '__main__':
    unittest.main()