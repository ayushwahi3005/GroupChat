import unittest
import requests

class TestGroupChatAPI(unittest.TestCase):
    BASE_URL = "http://localhost:5000"  # Replace with your actual base URL

    def setUp(self):
        # This method runs before each test, useful for setting up test data
        self.session = requests.Session()
        login_url = f"{self.BASE_URL}/auth/login"
        login_payload = {
            "username": "user",
            "password": "user12345"
        }
        login_response = self.session.post(login_url, json=login_payload)
        
        # Ensure login is successful and token is available
        self.assertEqual(login_response.status_code, 200)
        self.token = login_response.json().get("token")
        self.assertIsNotNone(self.token, "Login failed, token not retrieved")

    def test_register_user(self):
        url = f"{self.BASE_URL}/auth/register"
        payload = {
            "username": "user1",
            "password": "user1",
            "role": "user"
        }
        response = self.session.post(url, json=payload)
        print("register....")
        self.assertEqual(response.status_code, 201)
        self.assertIn("token", response.json())

    def test_login_user(self):
        url = f"{self.BASE_URL}/auth/login"
        payload = {
            "username": "user",
            "password": "user12345"
        }
        response = self.session.post(url, json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json())
        self.token = response.json()['token']

    def test_create_group(self):
        url = f"{self.BASE_URL}/groups/"
        headers = {"Authorization": f"Bearer {self.token}",
                   'Content-Type': 'application/json'}
        print("token--"+headers["Authorization"]+" "+url)
        payload = {
            "name": "Test Group",
            "members": ["id1"]
        }
        response = self.session.post(url, json=payload, headers=headers)
        self.assertEqual(response.status_code, 201)
        self.group_id = response.json()["_id"]

    def test_send_message(self):
        url = f"{self.BASE_URL}/groups/addMessage"
        headers = {"Authorization": f"Bearer {self.token}"}
        payload = {
            "content": "Hello, this is a test message.",
            "groupId": "GroupA",
            "senderId":"id1"

        }
        response = self.session.post(url, json=payload, headers=headers)
        self.assertEqual(response.status_code, 201)

    def test_get_group_messages(self):
        url = f"{self.BASE_URL}/groups/getMessages"
        headers = {"Authorization": f"Bearer {self.token}"}
        payload = {
            "groupId": "1234555"

        }
        response = self.session.post(url, headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.json()) > 0)

    def tearDown(self):
        # This method runs after each test, useful for cleanup
        self.session.close()

if __name__ == "__main__":
    unittest.main()
