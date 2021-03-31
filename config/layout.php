<?php

return [

    // Self
    'self' => [
        'layout' => 'default', // blank, default
        'rtl' => false, // true, false
    ],

    // Page loader
    'page-loader' => [
        'type' => '' // default, spinner-message, spinner-logo
    ],

    // Header
    'header' => [
        'self' => [
            'display' => true,
            'width' => 'fluid', // fixed, fluid
            'theme' => 'light', // light, dark
            'fixed' => [
                'desktop' => true,
                'mobile' => true
            ]
        ],

        'menu' => [
            'self' => [
                'display' => true,
                'layout'  => 'default', // tab, default
                'root-arrow' => false, // true, false
            ],

            'desktop' => [
                'arrow' => true,
                'toggle' => 'click',
                'submenu' => [
                    'theme' => 'light',
                    'arrow' => true,
                ]
            ],

            'mobile' => [
                'submenu' => [
                    'theme' => 'dark',
                    'accordion' => true
                ],
            ],
        ]
    ],

    // Subheader
    'subheader' => [
        'display' => false,
        'displayDesc' => true,
        'layout' => 'subheader-v1',
        'fixed' => true,
        'width' => 'fluid', // fixed, fluid
        'clear' => false,
        'layouts' => [
            'subheader-v1' => 'Subheader v1',
            'subheader-v2' => 'Subheader v2',
            'subheader-v3' => 'Subheader v3',
            'subheader-v4' => 'Subheader v4',
        ],
        'style' => 'solid' // transparent, solid. can be transparent only if 'fixed' => false
    ],

    // Content
    'content' => [
        'width' => 'fixed', // fluid, fixed
        'extended' => false, // true, false
    ],

    // Brand
    'brand' => [
        'self' => [
            'theme' => 'dark' // light, dark
        ]
    ],

    // Footer
    'footer' => [
        'width' => 'fluid', // fluid, fixed
        'fixed' => false
    ],

    // Extras
    'extras' => [

        // Search
        'search' => [
            'display' => true,
            'layout' => 'dropdown', // offcanvas, dropdown
            'offcanvas' => [
                'direction' => 'right'
            ],
        ],

        // Notifications
        'notifications' => [
            'display' => true,
            'layout' => 'dropdown', // offcanvas, dropdown
            'dropdown' => [
                'style' => 'dark' // light|dark
            ],
            'offcanvas' => [
                'direction' => 'right'
            ]
        ],

        // Quick Actions
        'quick-actions' => [
            'display' => true,
            'layout' => 'dropdown', // offcanvas, dropdown
            'dropdown' => [
                'style' => 'dark' // light|dark
            ],
            'offcanvas' => [
                'direction' => 'right'
            ]
        ],

        // User
        'user' => [
            'display' => true,
            'layout' => 'offcanvas', // offcanvas, dropdown
            'dropdown' => [
                'style' => 'dark' // light|dark
            ],
            'offcanvas' => [
                'direction' => 'right'
            ]
        ],

        // Languages
        'languages' => [
            'display' => TRUE
        ],

         // Languages
         'chat' => [
            'display' => TRUE
        ],

        // Cart
        'cart' => [
            'display' => TRUE,
            'dropdown' => [
                'style' => 'dark' // light|dark
            ]
        ],

        // Quick Panel
        'quick-panel' => [
            'display' => TRUE,
            'offcanvas' => [
                'direction' => 'right'
            ]
        ],

        // Chat
        'chat' => [
            'display' => false,
        ],

        // Page Toolbar
        'toolbar' => [
            'display' => false
        ],

        // Scrolltop
        'scrolltop' => [
            'display' => true
        ]
    ],

    // Demo Assets
    'resources' => [
        'favicon' => 'media/img/logo/favicon.ico',
        'fonts' => [
            'google' => [
                'families' => [
                    'Poppins:300,400,500,600,700'
                ]
            ]
        ],
        'css' => [
            'plugins/custom/fullcalendar/fullcalendar.bundle.css',
            'plugins/custom/leaflet/leaflet.bundle.css',
            'plugins/global/plugins.bundle.css',
            'plugins/custom/prismjs/prismjs.bundle.css',
            'css/style.bundle.css',
        ],
        'js' => [
            'plugins/global/plugins.bundle.js',
            'plugins/custom/prismjs/prismjs.bundle.js',
            'js/scripts.bundle.js',
            'plugins/custom/leaflet/leaflet.bundle.js',
            'js/pages/widgets.js'
        ],
    ],

    // Aside
    'aside' => [
        'self' => [
            'theme' => 'dark', // light, dark
            'display' => true,
            'fixed' => true,
            'minimize' => [
                'toggle' => true, // allow toggle
                'default' => true // default state
            ]
        ],

        'menu' => [
            'dropdown' => true, // ok
            'scroll' => true, // ok
            'submenu' => [
                'accordion' => true, // true, false
                'dropdown' => [
                    'arrow' => true,
                    'hover-timeout' => 500 // in milliseconds
                ]
            ]
        ]
    ],

];
