<?php

return [
    'drawer_entries' => [
        'anagrafiche' => [
            'icon' => 'account-group-outline',
            'text' => __('Anagrafiche')
        ]
    ],
    'api' => [
        'schemas' => [
            \Openstamanager\Anagrafiche\JsonApi\V1\Anagrafiche\AnagraficheSchema::class,
            \Openstamanager\Anagrafiche\JsonApi\V1\AnagrafichePrivati\AnagrafichePrivatiSchema::class,
            \Openstamanager\Anagrafiche\JsonApi\V1\AnagraficheAziende\AnagraficheAziendeSchema::class
        ]
    ]
];
