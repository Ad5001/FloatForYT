#!/usr/bin/gjs
const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const Gtk = imports.gi.Gtk;
const Lang = imports.lang;
const Webkit = imports.gi.WebKit;


const FloatForYoutube = new Lang.Class ({
    Name: 'Float for youtube',
    GoToYT: false,
    // Create the application itself
    _init: function () {
        this.application = new Gtk.Application ();

        // Connect 'activate' and 'startup' signals to the callback functions
        this.application.connect('activate', Lang.bind(this, this._onActivate));
        this.application.connect('startup', Lang.bind(this, this._onStartup));
    },

    // Callback function for 'activate' signal presents windows when active
    _onActivate: function () {
        this._window.present ();
    },

    // Callback function for 'startup' signal builds the UI
    _onStartup: function () {
        this._buildUI ();
    },
    // Build the application's UI
    _buildUI: function () {

        // Create the application window
        this._window = new Gtk.ApplicationWindow  ({
            application: this.application,
            title: "Floating For Youtube",
            default_height: 200,
            default_width: 400,
            icon: imports.gi.GdkPixbuf.Pixbuf.new_from_file_at_size(GLib.get_current_dir() + "/images/icon.png", 50, 50),
            window_position: Gtk.WindowPosition.CENTER 
        });
        this._window.set_resizable(false);
        
        // Create a webview to show the web app
        this._webView = new Webkit.WebView ();
        this._webView.set_size_request(400, 200);

        // Put the web app into the webview
        this._webView.load_uri (GLib.filename_to_uri ("usr/share/floatforyt/html/index.html", null));        // Put the webview into the window
        this._window.add (this._webView);
        this._webView.connect("title_changed", Lang.bind(this, this.communicate))
        this._webView.set_size_request(400, 200);

        // Show the window and all child widgets
        this._window.show_all();
    },

    // Communicating from webkit to the main application window
    communicate: function(webview, params) {
        if(webview.get_title()) {
            // REdirect preprocesses
            if(this.GoToYT) {
                this.log(webview.get_title());
                this._window.set_keep_above(true);
                this._webView.execute_script('window.addEventListener("load", function() { \
    var btn = document.createElement("button"); \
    var img = document.createElement("img"); \
    img.src = "data:image\png;base64,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"; \
    btn.classList.add("ytp-button"); \
    btn.appendChild(img); \
    btn.setAttribute("title", "Exit video"); \
    btn.addEventListener("click", function() { \
        document.title = JSON.stringify({exitVideo: "true"});\
    }); \
    document.getElementsByClassName("ytp-right-controls")[0].appendChild(btn); \
})');
                this._window.show_all();
                this._window.set_resizable(true);
                this.GoToYT = false;
            }
            // Data passing process
            var data = JSON.parse(webview.get_title()); // DATA is passed by the window title.
            if(!data) return;
            if(data["height"]) {
                this._window.resize(this._window.get_size()[0], parseInt(data["height"]));
            }
            if(data["width"]) {
                this._window.resize(parseInt(data["width"]), this._window.get_size()[1]);
            }
            if(data["switch"]) {
                this.GoToYT = true;
            }
            if(data["exitVideo"] == "true") {
                this._window.get_size()
                this._window.remove(this._webView);
                this._webView.load_uri("about:blank");
                delete this._webView
                this._window.resize(400, 200);
                // Recreating webkit window
                this._webView = new Webkit.WebView ();
                this._webView.set_size_request(400, 200);
                this._webView.load_uri (GLib.filename_to_uri ("usr/share/floatforyt/html/index.html", null));        // Put the webview into the window
                this._webView.connect("title_changed", Lang.bind(this, this.communicate));
                // Re adding Webview
                this._window.add (this._webView);
                this._window.show_all();
                this._window.set_keep_above(false);
                this._window.set_resizable(false);
            }
        }
    },


    log: function(toLog) {
        this._webView.execute_script("console.log('" + toLog + "');");
    }

});
// Run the application
const FFYT = new FloatForYoutube ();
FFYT.application.run (ARGV);