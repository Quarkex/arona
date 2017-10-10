def config(file_path)

    $config = {}

    # Default config values
    $config["mongo_ip"]   = "127.0.0.1"
    $config["mongo_port"] = 27017
    $config["mongo_db"]   = "arona"

    $config["page_title"]    = "Page Title"
    $config["page_charset"]  = "utf-8"
    $config["page_language"] = "en"

    $config["resource_collection"] = "resources"

    $config["date_field"]             = "date"
    $config["id_field"]               = "id"
    $config["resource_id_field"]      = "id"
    $config["resource_field"]         = "resource"
    $config["timestamp_field"]        = "timestamp"
    $config["start_date_field"]       = "start_date"
    $config["end_date_field"]         = "end_date"
    $config["language_field"]         = "language"
    $config["default_resource_limit"] = 4
    $config["text_fields"]            = [ "title", "description" ]

    $config["app_directives"] = []
    app_directives = [
            "translate",
            "paginator-controls",
            "paginator-filters",
            "paginator-browser",
            "breadcrumbs",
            "header",
            "card-standard",
            "default-view",
            "titlebar",
            "footer",
            "language-selector",
            "loading-overlay",
            "off-canvas-nav",
            "off-canvas",
            "gui"
    ]

    $config["app_modules"] = [
        { "js" => "https://use.fontawesome.com/5d9ccb4393.js" }
    ]
    app_modules = [
        { "js" => "/_js/bower/core.js/client/core.min.js"
        },
        { "js" => "/_js/bower/jquery/dist/jquery.min.js"
        },
        { "ng-module" => "angularjs",
            "js" => "/_js/bower/angular/angular.min.js"
        },
        { "ng-module" => "ngRoute",
            "js" => "/_js/bower/angular-route/angular-route.min.js"
        },
        { "ng-module" => "ngResource",
            "js" => "/_js/bower/angular-resource/angular-resource.min.js"
        },
        { "ng-module" => "ngAnimate",
            "js" => "/_js/bower/angular-animate/angular-animate.min.js"
        },
        { "ng-module" => "ngAria",
            "js" => "/_js/bower/angular-aria/angular-aria.min.js"
        },
        { "ng-module" => "ngMessages",
            "js" => "/_js/bower/angular-messages/angular-messages.min.js"
        },
        { "ng-module" => "ngMaterial",
            "js" => "/_js/bower/angular-material/angular-material.min.js",
            "css" => "/_js/bower/angular-material/angular-material.min.css"
        },
        { "ng-module" => "slugifier",
            "js" => "/_js/bower/angular-slugify/angular-slugify.js"
        },
        { "ng-module" => "tmh.dynamicLocale",
            "js" => "/_js/bower/angular-dynamic-locale/dist/tmhDynamicLocale.min.js"
        },
        { "ng-module" => "angular-bind-html-compile",
            "js" => "/_js/bower/angular-bind-html-compile/angular-bind-html-compile.min.js"
        }
    ]

    load file_path if File.file? file_path

    $config["app_modules"] = app_modules + $config["app_modules"]
    $config["app_directives"] = app_directives + $config["app_directives"]

end
