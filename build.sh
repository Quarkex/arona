#!/bin/bash

PATH="${PATH}:/usr/local/rvm/gems/ruby-2.4.0/bin:/usr/local/rvm/gems/ruby-2.4.0@global/bin:/usr/local/rvm/rubies/ruby-2.4.0/bin"; export PATH

for gem in 'nokogiri' 'kramdown' 'mongo'; do
    if [[ "$(gem list "$gem" -i)" == 'false' ]]; then
        sudo gem install "$gem"
    fi
done

/usr/bin/env bower --allow-root install

#ensure that our working dir is empty and user files are preserved
if [[ ! -e img ]]; then
    mkdir img;
fi
if [[ ! -d files ]]; then
    mkdir files;
fi
if [[ ! -d _site ]]; then
    mkdir _site;
else
    if [[ -f _site ]]; then
        mv _site _site.bak;
        mkdir _site;
    fi
    if [[ -d _site/files ]]; then
        rsync -r _site/files/ files/
    fi
    if [[ -d _site/img ]]; then
        rsync -r _site/img/ img/
    fi
    find _site -links 1 -exec rm "{}" \; ;
fi

# compile the navigation tree
/usr/bin/env ruby make.rb

rm head_scripts.rb _site/head_scripts.rb
echo '' | /usr/bin/env ruby -s index.rb -compiling >/dev/null

olf_ifs="$IFS"
# grabs all files wich don't start with an underscore or in our blacklist
IFS=$'\n'; for i in $(find . -type f | grep -v -e "/_" -e "bower.json" -e ".sass-cache" -e '.git' -e '.gitignore' -e 'make.rb' -e 'compile.sh' -e 'config.json.example' -e 'index.rb'); do
    if [[ ${i##./} == ${0##./} ]]; then continue; fi
    if [[ -e _site/${i} ]]; then continue; fi
    item="${i##./}";
    if [[ ! ${item%/*} == ${i##*/} ]]; then
        mkdir -p _site/${item%/*};
    fi
    mime="$(file --mime-type -b $item)";
    case $mime in
        "application/javascript")
            if [[ ${item##*.min.} == "js" ]]; then
                echo ln -L "$item" _site/"$item"
                ln -L "$item" _site/"$item"
            else
                echo uglifyjs "$item" -o _site/"$item" -c
                uglifyjs "$item" -o _site/"$item" -c
            fi
            ;;
        "text/css")
            if [[ ${item##*.min.} == "css" ]]; then
                echo ln -L "$item" _site/"$item"
                ln -L "$item" _site/"$item"
            else
                echo sass "$item" --style compressed '>' _site/"${item%.css}.min.css"
                sass "$item" --style compressed > _site/"${item%.css}.min.css"
            fi
            ;;
        "text/html")
            echo ln -L "$item" _site/"$item"
            # Usually is not worth adding an HTML compressor tool, but just if necesary, it should be here
            ln -L "$item" _site/"$item"
            ;;
        *)
            echo ln -L "$item" _site/"$item"
            ln -L "$item" _site/"$item"
            ;;
    esac;
done;
IFS="${old_ifs}";

find . -type d -not -perm 775 -exec chmod 775 "{}" \; ;
find . -type f -not -perm 664 -exec chmod 664 "{}" \; ;
for i in "api/" "_site/api/" "locales/" "_site/locales/" "admin/" "_site/admin/"; do
    find "$i" -not -perm 774 -type f \( -iname "*.rb" -o -iname "*.json"  -o -iname "*.sh" \) -exec chmod 774 "{}" \; ;
done;
chmod 774 "index.rb"
chmod 774 "$0"
chown -R www-data:www-data .
