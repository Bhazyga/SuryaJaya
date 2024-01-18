<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Material;

class BangunRumahController extends Controller
{
    public function bangunrumah(Request $request, $type)
    {
        // Validate $type or perform any additional checks as needed

        // Fetch materials from the database by type
        $materials = Material::where('type', $type)->get();
        return response()->json(['materials' => $materials], 200);
    }
}
