<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;
use App\Models\ActivityLog;

class AuthController extends Controller
{
    public function __construct(protected AuthService $authService) {}

    public function login(LoginRequest $request)
    {
        $result = $this->authService->login($request->validated());

        if (!$result['success']) {
            return response()->json($result, $result['status'] ?? 422);
        }

        return response()->json($result);
    }

    public function logout(Request $rq)
    {
        $user = $rq->user();

        // Log the logout action
        ActivityLog::create([
            'user_id' => $user->user_id,
            'action' => 'logout',
            'ip_address' => $rq->ip(),
        ]);

        $user->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Đăng xuất thành công!'
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'success' => true,
            'user' => $request->user(),
        ]);
    }
}
