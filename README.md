Arona web
=========

A responsive web system based in AngularJS, Foundation and MongoDB.

The web and it's content and structure are encapsulated from one another.
The structure is bulilt from a `_src` folder using kramdown, and the CSS is built using `SASS`.

Installation
------------

Copy `config.json.example` and name it `config.json`, then change the values inside to match your setup.

```shell
bash ./build.sh
```

### Dependencies

The whole system has a few dependencies:

- **Git**
- **Bower**

   Bower and Git are needed to install dependencies and keep the web up-to-date.

- **Uglyfyjs**
- **Sass**

   Uglyfyjs and Sass are used to build `_site` folder with minified content, and to create `style.min.css` wich holds all css rules.

- **Kramdown**

   Kramdown is necessary to process the Markdown files and their YAML headers inside `_src` folder.

- **Ruby**

   Ruby is also necessary for the previous step, and also to be executed as CGI scripts in `API` and `locales` folders.

- **MongoDB**

   Lastly, MongoDB is used to store and retrieve the content of the web, via ruby CGIs.

### Folder structure

- **api**

   Holds the web interface for setting and retrieving information.

- **assets**

   Holds htm templates to be included via AngularJS.

- **bower_components**

   Standard Bower folder holding packaged dependencies.

- **fonts**

   Standard fonts folder to be downloaded and used by CSS.

- **img**

   Standard images folder for files not relating to MongoDB content.

- **js**

   Javascript files relating to the webapp behaviour.

- **locales**

   Dictionaries with key-value pairs and access to MongoDB. One for each language.

- **_sass**

   Sass files with style definitions, modularized.

- **_site**

   Generated folder via `build.sh` holding a “ready to serve” version of the web.

- **_src**

   A tree structure, where each `node.md` file represents a point in the webapp.

