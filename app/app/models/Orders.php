<?php

namespace app\models;

class Orders extends \lithium\data\Model
{
    protected $_meta = [
        'source' => 'Orders',
        'key' => 'OrderId',
    ];

    public $hasMany = [
        'OrdersProducts' => [
            'to' => 'OrdersProducts',
            'key' => 'OrderId',
        ],
    ];
}
