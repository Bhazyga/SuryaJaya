<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MaterialResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

     public function toArray(Request $request): array
     {
         return [
             "id"=> $this->id,
             "nama"=> $this->nama,
             "deskripsi"=> $this->deskripsi,
             "kategori"=> $this->kategori,
             "stok"=> $this->stok,
             "harga"=> $this->harga,
             "gambar"=> $this->gambar,
             "created_at"=> $this->created_at->format("Y-m-d H:i:s"),
         ];
    }
}
