<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;

class AuthService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function login(array $data)
    {
        $user = $this->userRepository->findById($data['username']);

        if (!$user) {
            return [
                'success' => false,
                'message' => 'User not found'
            ];
        }

        if (!Hash::check($data['password'], $user->password)) {
            return [
                'success' => false,
                'message' => 'Password incorrect'
            ];
        }

        // tạo token
        $token = $user->createToken('auth_token')->plainTextToken;

        // 🔑 Laravel session + remember me
        $remember = $data['remember_token'] ?? false; // frontend gửi remember checkbox
        Auth::login($user, $remember); // tự set session + cookie remember_token nếu $remember = true
        // RateLimiter::clear($key); // đúng → reset

        return [
            'success' => true,
            'user' => $user,
            'token' => $token
        ];
    }
}
