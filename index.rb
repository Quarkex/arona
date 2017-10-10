#!/usr/bin/env ruby

require 'tmpdir'
require 'cgi'

$pwd = File.expand_path(File.dirname(__FILE__))
load $pwd + '/config.rb'
config($pwd + '/config.json')

def optional_fragment(path)
    @file = $pwd + '/' + path
    $body = ( File.file? @file ) ? File.read(@file) : ''
end

def write_js_file
    file = $pwd + '/head_scripts.js'
    external_files = []
    FileUtils.remove_entry_secure(file, true)
    @modules_section.each do | path |
        if File.file? $pwd + path
            open(file, "a") {|f| f << ( File.open( $pwd + path, 'r').read + "\n" ) }
        else
            external_files.push path
        end
    end
    open(file, "a") {|f| f << ( @scripts_section.join("\n") + "\n" ) }
    @directives_section.each do | path |
        if File.file? $pwd + path
            open(file, "a") {|f| f << ( File.open( $pwd + path, 'r').read + "\n" ) }
        else
            external_files.push path
        end
    end
    @app_section.each do | path |
        if File.file? $pwd + path
            open(file, "a") {|f| f << ( File.open( $pwd + path, 'r').read + "\n" ) }
        else
            external_files.push path
        end
    end
    external_files.map! { | path | '<script type="text/javascript" src="' + path + '"></script>' }
    external_files = external_files.join("\n") + "\n"
    external_files
end

$css_tmp_dir = "#{$pwd}/_sass/_tmp"
FileUtils.mkdir_p($css_tmp_dir)
def build_javascript()
    @vendor_section = []
    @modules_section = []
    @scripts_section = []
    @directives_section = []
    @app_section = []

    $config["app_modules"].each do | mod |
        if mod.has_key? 'css' then
            lib_file = "#{$css_tmp_dir}/#{File.basename(mod['css'], File.extname(mod['css']))}.scss"
            FileUtils.ln($pwd + mod["css"], lib_file) if not File.file? lib_file
        end

        @vendor_section.push mod['vendor'] if mod.has_key? 'vendor'

        @modules_section.push mod['js'] if mod.has_key? 'js'

        if ( mod.has_key? 'ng-module' ) then
            @scripts_section.push 'window.appDependencies' +
            ( ( mod['ng-module'] == 'angularjs' ) ? ' = [];' : '.push("' + mod['ng-module'] + '");' )
        end
    end
    @scripts_section.push 'window.app = angular.module("mainApp", appDependencies);'

    $config["app_directives"].each do | dir |
        @directives_section.push '/_js/directives/' + dir + '.js'
    end

    [ "appTree", "appValues", "appFilter", "appService", "appConfig", "appCtrl" ].each do | section |
        case section
        when "appService", "appCtrl", "appFilter"
            path = '/_js/' + section + '.main.js'
            @app_section.push path if File.exist? ($pwd + path)
            js_folder = $pwd + '/_js'
            Dir.glob( js_folder + '/' + section + '.d/*.js') do | filename |
                filename.gsub! js_folder + '/', '/_js/'
                @app_section.push filename
            end
        else
            path = '/_js/' + section + '.js'
            @app_section.push path if File.exist? ($pwd + path)
        end
    end

    @external_files = write_js_file() if $compiling

    @vendor_section.map!     { | path | '<script type="text/javascript" src="' + path + '"></script>' }
    @modules_section.map!    { | path | '<script type="text/javascript" src="' + path + '"></script>' }
    @directives_section.map! { | path | '<script type="text/javascript" src="' + path + '"></script>' }
    @app_section.map!        { | path | '<script type="text/javascript" src="' + path + '"></script>' }
    @scripts_section    = '<script type="text/javascript">' + "\n" + @scripts_section.join("\n") + "\n" + '</script>'
    @vendor_section     = @vendor_section.join("\n") + "\n"
    @modules_section    = @modules_section.join("\n") + "\n"
    @directives_section = @directives_section.join("\n") + "\n"
    @app_section        = @app_section.join("\n") + "\n"

    if $compiling then
        @external_files + "\n" + @vendor_section + "\n" + '<script type="text/javascript" src="/head_scripts.js"></script>'
    else
        @vendor_section + "\n" + @modules_section + "\n" + @scripts_section + "\n" + @app_section  + "\n" + @directives_section
    end
end

logo_file = Dir.glob('img/logo.{png,jpg}').first
if logo_file != nil then
    require 'base64'
    mimetype = IO.popen(["file", "--brief", "--mime-type", logo_file], in: :close, err: :close) { |io| io.read.chomp }
    logo_file = 'data:' + mimetype + ';base64,' + Base64.encode64( File.open(logo_file, "rb").read)
end

content = <<-END_HTML
<!DOCTYPE html>
<html lang="{{ lang() == undefined ? '#{$config["page_language"] }' : lang() }}" ng-init="title='#{$config["page_title"]}';" ng-app="mainApp" ng-controller="mainCtrl as ctrl">
    <head>
        <meta charset="#{$config["page_charset"]}">
        <meta name="viewport" content="width=device-width">

        <meta name="fragment" content="!">

        <link rel="icon" href="/favicon.ico" type="image/x-icon">

        <link rel="stylesheet" href="/style.min.css">
        <title>#{$config["page_title"]}</title>

        #{build_javascript().gsub("\n", "\n        ")}

        #{optional_fragment('assets/head.htm')}
    </head>
    <body class="ng-cloak" flex layout="column" ng-init="logo_image = '#{logo_file}'">

        <app-loading-overlay logo="logo_image" show-if="loadingResources() > 0"></app-loading-overlay>
        <div class="angular-animate" ng-show="loadingResources() <= 0" id="app" layout="column" flex>
            <app-gui ng-controller="resourcePaginatorCtrl" layout="column" flex>
                <div bind-html-compile="node.content" layout="column" flex></div>
            </app-gui>
        </div>

        #{optional_fragment('assets/body.htm')}

        <script src="/js/app.js"></script>

    </body>
</html>
END_HTML

def build_sass()
    $sass_imports = ["@import '_variables.scss';"]
    sass_folder = $pwd + '/_sass'
    ["tmp", "lib", "tag", "class", "id"].each do | section |
        Dir.glob(sass_folder + '/_' + section + '/*.scss') do | filename |
            filename.gsub! sass_folder + '/', ''
            $sass_imports.push "@import '#{filename}';"
        end
    end
    $sass_imports = $sass_imports.join "\n"
    open(sass_folder + '/_sass_imports.scss', "w") {|f| f << $sass_imports }
    `sass --load-path '#{sass_folder}' '#{sass_folder}/index.scss' --style compressed > '#{$pwd}/style.min.css';`
    FileUtils.remove_entry_secure($css_tmp_dir, true)
    FileUtils.remove_entry_secure(sass_folder + '/_sass_imports.scss', true)
end

build_sass()

open("#{$pwd}/index.html", "w") {|f| f << content.gsub(/\s+/, " ").strip } if $compiling

cgi = CGI.new
cgi.out(){ content }
