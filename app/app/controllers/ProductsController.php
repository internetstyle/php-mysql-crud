<?php

namespace app\controllers;

use app\models\Products;

class ProductsController extends \lithium\action\Controller
{

    public function index()
    {
        $this->_render['type'] = 'json';

        $products = Products::all();

        if (count($products) > 0) {
            foreach ($products as $product) {
                $ret[] = [
                    'ProductId' => $product->ProductId,
                    'Sku' => $product->Sku,
                    'Name' => $product->Name,
                    'Description' => $product->Description,
                    'Price' => $product->Price,
                ];
            }
        } else {
            $ret = [];
        }

        return json_encode($ret);
    }

    public function create()
    {
        $this->_render['type'] = 'json';

        if (isset($this->request->body)) {

            $product = Products::create($this->request->body);

            if ($product->save()) {
                return json_encode([
                    'Status' => 'OK',
                ]);
            } else {
                return json_encode([
                    'Status' => 'Error',
                ]);
            };
        }
    }

    public function update($id)
    {
        $this->_render['type'] = 'json';

        if (isset($this->request->body)) {

            $product = Products::first($id);

            if ($product && $product->save($this->request->body)) {
                return json_encode([
                    'Status' => 'OK',
                ]);
            } else {
                return json_encode([
                    'Status' => 'Error',
                ]);
            };
        }
    }

    public function view($id = null)
    {
        $product = Products::first($id);

        if ($product) {
            $ret = [
                'ProductId' => $product->ProductId,
                'Sku' => $product->Sku,
                'Name' => $product->Name,
                'Description' => $product->Description,
                'Price' => $product->Price,
            ];
        } else {
            $ret = [
                'Error' => 'Product not found',
            ];
        }

        $this->_render['type'] = 'json';

        return json_encode($ret);
    }

    public function delete($id)
    {
        $this->_render['type'] = 'json';

        if (isset($this->request->body)) {

            if (Products::remove([
                'ProductId' => $id,
            ])) {
                return json_encode([
                    'Status' => 'OK',
                ]);
            } else {
                return json_encode([
                    'Status' => 'Error',
                ]);
            };
        }
    }
}
