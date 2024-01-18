<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Material; // Import the Material model or adjust the namespace

class CalculatorController extends Controller
{
    public function bangunrumah()
    {
        // Fetch materials from the database
        $materials = Material::all(); // Adjust the query based on your needs

        // You can pass the $materials variable to the view
        return view('calculator.bangunrumah', ['materials' => $materials]);
    }
}
