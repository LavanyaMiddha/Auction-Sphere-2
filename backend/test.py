from unittest import mock
from unittest.mock import patch, MagicMock, Mock
import pytest

import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_hello_world():
    assert (app.hello_world() == "<p>Hello, World!</p>")


@patch('app.create_connection')
def test_get_product_image(mock_create_call):
    mock_create_call = MagicMock()
    connection = Mock()
    cursor = connection.cursor()
    mock_create_call.return_value = connection
    m = mock.MagicMock()
    m.values = {"productID": "1"}
    with mock.patch("app.request", m):
        result = app.get_product_image()
        # print("result=", result)
    assert m.values.keys().__contains__("productID")


@patch('app.create_connection')
def test_get_product_details(mock_create_call):
    mock_create_call = MagicMock()
    connection = Mock()
    cursor = connection.cursor()
    mock_create_call.return_value = connection
    m = mock.MagicMock()
    m.values = {"productID": "1"}
    with mock.patch("app.request", m):
        result = app.get_product_details()
        # print("result=", result)
    assert m.values.keys().__contains__("productID")


@patch('app.create_connection')
def test_get_all_products(mock_create_call):
    mock_create_call = MagicMock()
    connection = Mock()
    cursor = connection.cursor()
    mock_create_call.return_value = connection
    result = app.get_all_products()


@patch('app.create_connection')
def test_get_all_products(mock_create_call):
    mock_create_call = MagicMock()
    connection = Mock()
    cursor = connection.cursor()
    mock_create_call.return_value = connection
    result = app.get_all_products()

# Test Signup Endpoint
@patch('app.create_connection')
def test_signup_existing_user(mock_create_connection):
    # Mock database connection and cursor
    connection = Mock()
    cursor = connection.cursor()
    mock_create_connection.return_value = connection

    # Mock the cursor's fetchall result for existing email
    cursor.execute.return_value = None
    cursor.fetchall.return_value = [(1,)]  # Simulate existing email

    # Mock request data
    mock_request_data = {
        "firstName": "John",
        "lastName": "Doe",
        "contact": "1234567890",
        "email": "existinguser@example.com",
        "password": "Test@123"
    }

    response = client.post('/signup', json=mock_request_data)
    assert response["message"] == "An account with this email already exists"

# Test Login Endpoint
@patch('app.create_connection')
def test_login_successful(mock_create_connection):
    connection = Mock()
    cursor = connection.cursor()
    mock_create_connection.return_value = connection

    # Mock the cursor's fetchall result for successful login
    cursor.execute.return_value = None
    cursor.fetchall.return_value = [(1,)]  # Simulate user exists with correct password

    mock_request_data = {
        "email": "existinguser@example.com",
        "password": "Test@123"
    }

    response = client.post('/login', json=mock_request_data)
    assert response.json["message"] == "Logged in successfully"


# Test Forgot Password Endpoint
@patch('app.create_connection')
def test_forgot_password_existing_email(mock_create_connection):
    connection = Mock()
    cursor = connection.cursor()
    mock_create_connection.return_value = connection

    cursor.execute.return_value = None
    cursor.fetchone.return_value = ("existinguser@example.com",)  # Simulate email exists

    mock_request_data = {"email": "existinguser@example.com"}

    with patch("app.request.get_json", return_value=mock_request_data):
        response = app.forgot_password()
        assert response.json["message"] == "Reset token sent to your email"

# Test Reset Password Endpoint
@patch('app.create_connection')
def test_reset_password_successful(mock_create_connection):
    connection = Mock()
    cursor = connection.cursor()
    mock_create_connection.return_value = connection

    # Mock the token validation query result
    cursor.execute.return_value = None
    cursor.fetchone.return_value = ("existinguser@example.com", "validtoken")

    mock_request_data = {
        "token": "validtoken",
        "password": "NewPassword@123"
    }

    with patch("app.request.get_json", return_value=mock_request_data):
        response = app.reset_password()
        assert response.json["message"] == "Password reset successful"

# Additional signup test cases
@patch('app.create_connection')
def test_signup_with_invalid_data(mock_create_connection):
    connection = Mock()
    mock_create_connection.return_value = connection

    # Mock request data with missing fields
    mock_request_data = {
        "firstName": "John",
        # Missing lastName, email, contact, and password
    }

    with patch("app.request.get_json", return_value=mock_request_data):
        response = app.signup()
        assert response.get("message") == "Invalid data"

@patch('app.create_connection')
def test_signup_with_weak_password(mock_create_connection):
    connection = Mock()
    mock_create_connection.return_value = connection

    mock_request_data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "weakpass@example.com",
        "contact": "1234567890",
        "password": "123"  # Weak password
    }

    with patch("app.request.get_json", return_value=mock_request_data):
        response = app.signup()
        assert response.get("message") == "Password does not meet criteria"

# Additional login test cases
@patch('app.create_connection')
def test_login_with_unregistered_email(mock_create_connection):
    connection = Mock()
    cursor = connection.cursor()
    mock_create_connection.return_value = connection

    cursor.execute.return_value = None
    cursor.fetchall.return_value = []  # Simulate email does not exist

    mock_request_data = {
        "email": "unregistered@example.com",
        "password": "Test@123"
    }

    with patch("app.request.get_json", return_value=mock_request_data):
        response = app.login()
        assert response.json["message"] == "Please create an account!"

# Test forgot password endpoint
@patch('app.create_connection')
def test_forgot_password_existing_email(mock_create_connection):
    connection = Mock()
    cursor = connection.cursor()
    mock_create_connection.return_value = connection

    cursor.execute.return_value = None
    cursor.fetchone.return_value = ("existinguser@example.com",)  # Simulate email exists

    mock_request_data = {"email": "existinguser@example.com"}

    with patch("app.request.get_json", return_value=mock_request_data):
        response = app.forgot_password()
        assert response.json["message"] == "Reset token sent to your email"

# Additional forgot password test cases
@patch('app.create_connection')
def test_forgot_password_multiple_requests(mock_create_connection):
    connection = Mock()
    cursor = connection.cursor()
    mock_create_connection.return_value = connection

    mock_request_data = {"email": "existinguser@example.com"}

    with patch("app.request.get_json", return_value=mock_request_data):
        for _ in range(5):
            response = app.forgot_password()
            assert response.status_code == 200  # Assuming 200 for multiple requests

@patch('app.create_connection')
def test_forgot_password_invalid_email_format(mock_create_connection):
    connection = Mock()
    mock_create_connection.return_value = connection

    mock_request_data = {"email": "invalid-email"}

    with patch("app.request.get_json", return_value=mock_request_data):
        response = app.forgot_password()
        assert response.status_code == 400
        assert response.json["message"] == "Invalid email format"

# Additional reset password test cases
@patch('app.create_connection')
def test_reset_password_mismatched_passwords(mock_create_connection):
    connection = Mock()
    mock_create_connection.return_value = connection

    mock_request_data = {
        "token": "validtoken",
        "password": "NewPassword@123",
        "confirm_password": "MismatchPassword@123"
    }

    with patch("app.request.get_json", return_value=mock_request_data):
        response = app.reset_password()
        assert response.status_code == 400
        assert response.json["message"] == "Passwords do not match"

@patch('app.create_connection')
def test_reset_password_with_expired_token(mock_create_connection):
    connection = Mock()
    cursor = connection.cursor()
    mock_create_connection.return_value = connection

    cursor.execute.return_value = None
    cursor.fetchone.return_value = None  # Simulate expired or invalid token

    mock_request_data = {
        "token": "expiredtoken",
        "password": "NewPassword@123"
    }

    with patch("app.request.get_json", return_value=mock_request_data):
        response = app.reset_password()
        assert response.status_code == 400
        assert response.json["message"] == "Invalid or expired token"