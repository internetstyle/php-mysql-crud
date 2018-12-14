<?php

namespace app\models;

class OrdersProducts extends \lithium\data\Model
{
    protected $_meta = [
        'source' => 'OrdersProducts',
        'key' => 'ProductId',
    ];

    public $belongsTo = [
        'Orders' => [
            'to' => 'Orders',
            'key' => 'OrderId',
        ],
    ];
}
