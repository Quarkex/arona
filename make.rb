#!/usr/bin/env ruby

require 'kramdown'
require 'yaml'
require 'json'

$root_folder = File.expand_path(File.dirname(File.dirname(__FILE__))) + '/_src'
$tree = []

def build_node ( folder, parent_href )
    current_node = YAML.load_file( folder + '/node.md')
    html = ''
    File.open( folder + '/node.md', "r") do |f|
        content = f.read.sub(/^---$.*^---$/m, '')
        html = Kramdown::Document.new(content).to_html
    end

    current_node['id'] = '' if current_node['id'] == nil
    current_node['href'] =\
        parent_href == '/' ? '' :\
        parent_href == '' ? current_node['id'] :\
        parent_href + '/' + current_node['id']\
    unless current_node['href'] != nil

    current_node['nodes'] = []
    dirs = Dir.glob(folder + '/*').select {|f|
        File.directory? f
    }
    dirs.sort!
    dirs.each do | dir |
        current_node['nodes'].push build_node(dir, current_node["href"])
    end

    current_node['content'] = html

    current_node

end

$tree.push(build_node $root_folder, '/') if File.file?($root_folder + '/node.md')

File.open(File.expand_path(File.dirname(File.dirname(__FILE__))) + '/_js/appTree.js', 'w') { |file|
    file.write('app.value( "tree", { "nodes": ' + $tree.to_json.gsub(/\s+/, " ").strip + '});')
}
