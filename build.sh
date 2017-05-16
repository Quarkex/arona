#!/bin/bash

/usr/bin/env bower --allow-root install

#ensure that our working dir is empty
if [[ ! -d _site ]]; then
    mkdir _site;
else
    if [[ -f _site ]]; then
        mv _site _site.bak;
        mkdir _site;
    fi
    rm -r _site/*;
fi

# compile the navigation tree
/usr/bin/env ruby make.rb

# grabs all releant files in _sass folder and builds a single, minified css
echo "" > _sass/_sass_imports.scss;
if [[ -f _sass/_variables.scss ]]; then echo "@import '_variables.scss';" > _sass/_sass_imports.scss; fi
for folder in _sass/_{'tag','class','id'}; do 
    if [[ -d $folder ]]; then
        for i in $folder/*.scss; do
            if [[ -f $i ]]; then
                echo "@import '${i##_sass/}';" >> _sass/_sass_imports.scss;
            fi
        done;
    fi
done
sass --load-path _sass _sass/index.scss --style compressed > style.min.css;

# grabs all files wich don't start with an underscore or in our blacklist
for i in $(find . -type f | grep -v -e "/_" -e ".sass-cache" -e '.git' -e '.gitignore'); do
    if [[ ${i##./} == ${0##./} ]]; then continue; fi
    item="${i##./}";
    if [[ ! ${item%/*} == ${i##*/} ]]; then
        mkdir -p _site/${item%/*};
    fi
    mime="$(file --mime-type -b $item)";
    case $mime in
        "application/javascript")
            if [[ ${item##*.min.} == "js" ]]; then
                cp "$item" _site/"$item"
            else
                uglifyjs "$item" -o _site/"$item" -c
            fi
            ;;
        "text/css")
            if [[ ${item##*.min.} == "css" ]]; then
                cp "$item" _site/"$item"
            else
                sass "$item" --style compressed > _site/"${item%.css}.min.css"
            fi
            ;;
        "text/html")
            # Usually is not worth adding an HTML compressor tool, but just if necesary, it should be here
            cp "$item" _site/"$item"
            ;;
        *)
            cp "$item" _site/"$item"
            ;;
    esac
done

