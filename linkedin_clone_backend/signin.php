<?php
include('connection.php');

if (!empty($_POST['email']) && !empty($_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $query = $mysqli->prepare("SELECT  user_id,email, password FROM users WHERE email = ?");
    $query->bind_param('s', $email);
    $query->execute();
    $query->store_result();
    if ($query->num_rows > 0) {
        $query->bind_result( $id,$email, $hashed_password);
        $query->fetch();
        if (password_verify($password, $hashed_password)) {
            $response['status'] = 'success';
            $response['message'] = 'User logged in successfully.';
            $response['users'] = [
                'id' => $id,
                'email' => $email
            ];
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Invalid password.';
        }
    } else {
        $response['status'] = 'error';
        $response['message'] = 'User does not exist.';
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Please fill in both email and password fields.';
}
echo json_encode($response);
