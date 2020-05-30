from main import app

import unittest

class TestApi(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
    
    def test_main(self):
        rv = self.app.get("api/adventure")
        assert rv.status == "200 OK"

        assert b'[' in rv.data

if __name__ == '__main__':
    unittest.main()