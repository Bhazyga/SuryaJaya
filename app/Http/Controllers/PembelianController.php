<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pembelian;

class PembelianController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'material_id' => 'required|exists:materials,id',
            'nohp' => 'required|string|min:8',
            'namamaterial' => 'required|string',
            'alamat' => 'required|string',
            'status' => 'required|string',
            'namapembeli' => 'required|string|',
            'quantity' => 'required|integer|min:1',
        ]);

        // Create a new instance of Pembelian model and save it to the database
        $pembelian = new Pembelian();
        $pembelian->material_id = $validatedData['material_id'];
        $pembelian->nohp = $validatedData['nohp'];
        $pembelian->namamaterial = $validatedData['namamaterial'];
        $pembelian->alamat = $validatedData['alamat'];
        $pembelian->status = 'Belum Dikonfirmasi';
        $pembelian->namapembeli = $validatedData['namapembeli'];
        $pembelian->quantity = $validatedData['quantity'];
        $pembelian->save();

        // Return a response indicating success
        return response()->json(['message' => 'Pembelian berhasil disimpan'], 201);
    }

    public function index()
    {
        $pembelian = Pembelian::all();
        return response()->json($pembelian);
    }

    public function konfirmasi(Request $request, Pembelian $pembelian)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'material_id' => 'required|exists:materials,id',
            'nohp' => 'required|string|min:8|max:20',
            'namamaterial' => 'required|string',
            'alamat' => 'required|string',
            'status' => 'required|string',
            'namapembeli' => 'required|string',
            'quantity' => 'required|integer|min:1',
        ]);

        // Update the attributes of the pembelian
        $pembelian->update($validatedData);

        return response()->json(['message' => 'Data updated successfully']);
    }

}
