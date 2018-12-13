<?php

namespace app\controllers;

use app\models\Products;

class ProductsController extends \lithium\action\Controller {

	public function index() {

        $products = Products::all();

        foreach ($products as $product) {
            $ret[] = [
                'Sku' => $product->Sku,
                'Name' => $product->Name,
                'Description' => $product->Description,
                'Price' => $product->Price,
            ];
        }

        $this->_render['type'] = 'json';

        return json_encode($ret);

    }
}