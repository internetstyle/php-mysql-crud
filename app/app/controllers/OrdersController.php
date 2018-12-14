<?php

namespace app\controllers;

use app\models\Orders;
use app\models\OrdersProducts;
use app\models\Products;

class OrdersController extends \lithium\action\Controller
{

    public function index()
    {
        $this->_render['type'] = 'json';

        $orders = Orders::all();

        if (count($orders) > 0) {
            foreach ($orders as $order) {
                $ret[] = [
                    'OrderId' => $order->OrderId,
                    'Total' => $order->Total,
                    'Date' => $order->Date,
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

        if (isset($this->request->body['Products'])) {

            $data = [
                'Date' => date('Y-m-d H:i:s'),
                'Total' => 0.00,
            ];

            $order = Orders::create($data);
            $order->save();

            foreach ($this->request->body['Products'] as $prod) {
                $to_check[] = $prod['ProductId'];
            }

            $prods_order = Products::all([
                'conditions' => [
                    'ProductId' => $to_check,
                ],
                'order' => ['ProductId'],
                'fields' => [
                    'ProductId',
                    'Price',
                ],
            ]);

            $total = 0;

            foreach ($this->request->body['Products'] as $prod) {

                $data = [
                    'OrderId' => $order->OrderId,
                    'ProductId' => $prod['ProductId'],
                    'Quantity' => $prod['Quantity'],
                    'Price' => $prods_order[$prod['ProductId']]->Price,
                ];

                $ordersProducts = OrdersProducts::create($data);
                $ordersProducts->save();

                $total = $total + ($prods_order[$prod['ProductId']]->Price * $prod['Quantity']);
            }

            $order->save(['Total' => $total]);

            return json_encode([
                'Status' => 'OK',
            ]);
        }
    }

    public function update($id = null)
    {
        $this->_render['type'] = 'json';

        $order = Orders::first($id);

        if ($order) {

            $data = [
                'Total' => 0.00,
            ];

            if (isset($this->request->body['Products'])) {
                foreach ($this->request->body['Products'] as $prod) {
                    $to_check[] = $prod['ProductId'];
                }

                $prods_order = Products::all([
                    'conditions' => [
                        'ProductId' => $to_check,
                    ],
                    'order' => ['ProductId'],
                    'fields' => [
                        'ProductId',
                        'Price',
                    ],
                ]);
            }

            OrdersProducts::remove([
                'OrderId' => $id,
            ]);

            $total = 0;

            foreach ($this->request->body['Products'] as $prod) {

                $data = [
                    'OrderId' => $order->OrderId,
                    'ProductId' => $prod['ProductId'],
                    'Quantity' => $prod['Quantity'],
                    'Price' => $prods_order[$prod['ProductId']]->Price,
                ];

                $ordersProducts = OrdersProducts::create($data);
                $ordersProducts->save();

                $total = $total + ($prods_order[$prod['ProductId']]->Price * $prod['Quantity']);
            }

            $order->save(['Total' => $total]);

            return json_encode([
                'Status' => 'OK',
            ]);
        }
    }

    public function view($id = null)
    {
        $this->_render['type'] = 'json';

        $order = Orders::find('first', [
            'conditions' => [
                'OrderId' => $id,
            ],
            'with' => ['OrdersProducts'],
            'fields' => [
                'Orders.OrderId',
                'Orders.Total',
                'Orders.Date',
                'OrdersProducts.ProductId',
                'OrdersProducts.Price',
                'OrdersProducts.Quantity',
            ],
        ]);

        if ($order) {
            return json_encode($order->to('array'));
        } else {
            return json_encode([
                'Status' => 'Order not found',
            ]);
        }
    }

    public function delete($id = null)
    {
        $this->_render['type'] = 'json';

        if (isset($this->request->body)) {

            if (Orders::remove([
                'OrderId' => $id,
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
