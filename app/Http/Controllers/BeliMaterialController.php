<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Material;


class BeliMaterialController extends Controller
{
    public function index ()
    {
        return;
    }


    public function belimaterial (Request $request, $data)
    {
        $data = $request->validated();
        $beli = Material::create($data);
        return response()->json($beli);
    }

}
