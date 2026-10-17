php artisan make:model Role -m

public function up(): void
{
    Schema::create('roles', function (Blueprint $table) {
        $table->id();
        $table->string('name')->unique(); // e.g., 'admin', 'editor', 'user'
        $table->timestamps();
    });
}

php artisan make:migration add_role_id_to_users_table --table=users

public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        // Assuming a default user role ID of 2
        $table->foreignId('role_id')->default(2)->constrained()->onDelete('cascade');
    });
}

php artisan migrate

public function users()
{
    return $this->hasMany(User::class);
}

public function role()
{
    return $this->belongsTo(Role::class);
}

// Optional helper method to quickly check a role name
public function hasRole(string $role): bool
{
    return $this->role && $table->role->name === $role;
}

php artisan make:middleware RoleRedirect

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleRedirect
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!auth()->check() || auth()->user()->role->name !== $role) {
            // Abort or redirect if they don't match the specific role
            return redirect('/home')->with('error', 'Unauthorized access.');
        }

        return $next($request);
    }
}

Route::get('/admin/dashboard', [AdminController::class, 'index'])
    ->middleware('role:admin')
    ->name('admin.dashboard');
