<?php
include('connection.php');

if (!empty($_POST['email']) && !empty($_POST['password']) && !empty($_POST['username']) ){
    $email = $_POST['email'];
    $password = $_POST['password'];
    $userName = $_POST['username'];

    $query = $mysqli->prepare("SELECT * FROM users WHERE email = ?");
    $query->bind_param('s', $email);
    $query->execute();
    $query->store_result();



    if ($query->num_rows > 0) {
        $response['status'] = 'error';
        $response['message'] = 'User already exists.';
    } else {
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);
        $addUser = $mysqli->prepare("INSERT INTO users (email, password,username) VALUES (?, ?, ?)");
        $addUser->bind_param('sss', $email, $hashed_password,$username);
        $addUser->execute();
        $user_id = $mysqli->insert_id;

        $response['status'] = 'success';
        $response['message'] = "User added successfully";
        $response['users'] = [
            'id' => $user_id,
            'email' => $email,
            'username' => $userName
        ];
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Please fill the emmail and the password fields.';
}

echo json_encode($response);
