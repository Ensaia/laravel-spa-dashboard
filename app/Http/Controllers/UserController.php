<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(User::paginate(20));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
        return  response()->json(["message" => "Forbidden"], 403);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $rules = [
            // 'name' => 'required'| 'string'| 'max:255',
            // 'email' => 'required'| 'string'| 'email'| 'max:255'| Rule::unique('users')->ignore($user->id)

            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],

        ];
        $messages = [
            'name.required' => 'يرجى تعبئة الحقل الخاص بالاسم',
            'email.required' => 'يرجى تعبئة الحقل الخاص بالبريد الألكتروني',
            'email.email' => 'يرجى التأكد من كتابة البريد الألكتروني بصيغة صحيحة',
        ];
        $validator = $request->validate($rules,$messages);
//        $validator = Validator::make($request->all(), $rules,$messages);

//        if ($validator->fails()) {
//            return response()->json(['errors' => $validator->errors()],422);
//        } else {
        if($validator['email'] !== $user->email){
// 			$email_exists = User::where('email', $validator['email'])->exists();
// 			if ($email_exists) {
// 				return response()->json(['errors' => ['email' => ['البريد الألكتروني مستخدم من قبل']]], 422);
// 			}

			$user->fill($validator);
			$user->email_verified_at = null; // Reset email verification status
			$user->save();
			$user->sendEmailVerificationNotification(); // Send verification email

        }
            $user->update($validator);
            new UserResource($user);
            return ResponseController::dataUpdated($user);
//        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        return response()->json(["message" => "Success"], 204);
        $user->delete();
        DB::table('role_user')->where('user_id', $user->id)->delete();
        DB::table('permission_user')->where('user_id', $user->id)->delete();
        return response()->noContent();
    }
}
