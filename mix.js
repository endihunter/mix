const KNOWN_EDITORS = [
    'TinyMce',
    'Medium',
    'Markdown',
    'Ck'
];

class AdminMix {
    constructor(Mix) {
        this.Mix = Mix || require('laravel-mix');

        this.Mix.babelConfig({
            "presets": [["es2015", {"modules": false}]],
            "plugins": [["component", {"libraryName": "element-ui", "styleLibraryName": "theme-chalk"}]]
        });

        // Default editors list.
        this.editors = [
            'Medium'
        ];

        this.handleAliases();
    }

    static resource(path) {
        return 'resources/assets/administrator/' + path.trim('/');
    }

    static asset(path) {
        return 'public/admin/' + path.trim('/');
    }

    handleFiles() {
        this.Mix.copy(AdminMix.resource('images'), AdminMix.asset('images'));
    };

    handle() {
        this.handleFiles();

        this.handleScripts();

        this.handleStyles();

        this.handleEditors();

        this.Mix.sourceMaps();
    }

    handleStyles() {
        this.Mix.sass(AdminMix.resource('sass/app.scss'), AdminMix.asset('app.css'));
        this.Mix.sass(AdminMix.resource('sass/vendor.scss'), AdminMix.asset('vendor.css'));
        this.Mix.less(AdminMix.resource('less/glyphicons.less'), AdminMix.asset('glyphicons.css'));
    }

    handleScripts() {
        this.Mix.js(AdminMix.resource('js/vendor.js'), AdminMix.asset('vendor.js'));
        this.Mix.js(AdminMix.resource('js/app.js'), AdminMix.asset('app.js'));
        this.Mix.js(AdminMix.resource('js/theme.js'), AdminMix.asset('theme.js'));
    }

    handleAliases() {
        this.Mix.webpackConfig({
            resolve: {
                alias: {
                    // Enable if using jquery-ui/sortable
                    //'jquery-ui/sortable': 'jquery-ui/ui/widgets/sortable',
                },
            },
            /* Do not load MomentJS locales */
            plugins: [
                new (require('webpack')).IgnorePlugin(/^\.\/locale$/, /moment$/),
            ]
        });
    }

    /**
     * Enable editors.
     *
     * @param editors
     * @returns {AdminMix}
     */
    enableEditors(editors) {
        if (!Array.isArray(editors)) {
            editors = Array.from(arguments);
        }

        editors.forEach((editor) => {
            if (KNOWN_EDITORS.indexOf(editor) === -1) {
                throw new Error(`Unknown editor: ${editor}`);
            }
        })

        this.editors = editors;

        return this;
    }

    /**
     * Assemble required editors.
     */
    handleEditors() {
        this.editors.forEach((editor) => {
            const method = `handle${editor}Editor`;

            this[method]();
        });
    }

    /**
     * Assembles TinyMCE editor
     *
     * @requires `tinymce@^4.6.4` package
     * @note npm i tinymce@^4.6.4 --save-dev
     */
    handleTinyMceEditor() {
        this.Mix.copy('node_modules/tinymce/skins', AdminMix.asset('editors/skins'));
        this.Mix.js(AdminMix.resource('js/editors/tinymce.js'), AdminMix.asset('editors/tinymce.js'));
    }

    /**
     * Assembles CK editor
     *
     * @requires `ckeditor@^4.7.0` package
     * @note npm i ckeditor@^4.7.0 --save-dev
     */
    handleCkEditor() {
        this.Mix.copy([
            'node_modules/ckeditor/config.js',
            'node_modules/ckeditor/styles.js',
            'node_modules/ckeditor/contents.css'
        ], AdminMix.asset('editors'));
        this.Mix.copy('node_modules/ckeditor/lang/en.js', AdminMix.asset('editors/lang/en.js'));
        this.Mix.copy('node_modules/ckeditor/skins', AdminMix.asset('editors/skins'));
        this.Mix.copy('node_modules/ckeditor/plugins', AdminMix.asset('editors/plugins'));

        this.Mix.js(AdminMix.resource('js/editors/ckeditor.js'), AdminMix.asset('editors/ckeditor.js'));
    }

    /**
     * Assembles Medium editor.
     *
     * @requires `medium-editor@^5.23.1` package
     * @note npm i medium-editor@^5.23.1 --save-dev
     */
    handleMediumEditor() {
        this.Mix.js(AdminMix.resource('js/editors/medium.js'), AdminMix.asset('editors/medium.js'));
        this.Mix.sass(AdminMix.resource('sass/editors/medium.scss'), AdminMix.asset('editors/medium.css'));
    }

    /**
     * Assembles Markdown editor.
     *
     * @requires `simplemde` package
     * @note npm i simplemde --save-dev
     */
    handleMarkdownEditor() {
        this.Mix.js(AdminMix.resource('js/editors/markdown.js'), AdminMix.asset('editors/markdown.js'));
        this.Mix.sass(AdminMix.resource('sass/editors/markdown.scss'), AdminMix.asset('editors/markdown.css'));
    }
}

module.exports = AdminMix;
