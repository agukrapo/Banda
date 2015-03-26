#!/bin/bash

JS_SRC="./js"
CSS_SRC="./css"
JS_DIST="./dist/js"
CSS_DIST="./dist/css"
JS_MOVE_DEST="../paginabanda/static/js"
CSS_MOVE_DEST="../paginabanda/static/css"

clean() {
    echo "Cleaning..."

    rm -r $JS_DIST/*
    rm -r $CSS_DIST/*

    rm -r $JS_MOVE_DEST/*
    rm -r $CSS_MOVE_DEST/*
}

compile() {
    echo "Compiling..."

    r.js -o cssIn=$CSS_SRC/main.css out=$CSS_DIST/main.css
    r.js -o require.build.js
}

move() {
    echo "Moving..."

    mkdir $CSS_MOVE_DEST
    cp $CSS_DIST/main.css $CSS_MOVE_DEST/main.css

    mkdir $JS_MOVE_DEST
    cp $JS_DIST/banda.js $JS_MOVE_DEST/banda.js
    cp $JS_DIST/entrypoint.js $JS_MOVE_DEST/entrypoint.js

    mkdir $JS_MOVE_DEST/views/
    cp $JS_DIST/views/contactoview.js $JS_MOVE_DEST/views/contactoview.js
    cp $JS_DIST/views/fotosview.js $JS_MOVE_DEST/views/fotosview.js
    cp $JS_DIST/views/inicioview.js $JS_MOVE_DEST/views/inicioview.js
    cp $JS_DIST/views/muroview.js $JS_MOVE_DEST/views/muroview.js
    cp $JS_DIST/views/musicaview.js $JS_MOVE_DEST/views/musicaview.js
    cp $JS_DIST/views/nosotrosview.js $JS_MOVE_DEST/views/nosotrosview.js
    cp $JS_DIST/views/presentacionesview.js $JS_MOVE_DEST/views/presentacionesview.js
    cp $JS_DIST/views/videosview.js $JS_MOVE_DEST/views/videosview.js

    mkdir $JS_MOVE_DEST/lib/
    cp $JS_SRC/lib/echo-1.6.0.min.js $JS_MOVE_DEST/lib/echo-1.6.0.min.js
    cp $JS_SRC/lib/bootstrap-modal-3.3.4.min.js $JS_MOVE_DEST/lib/bootstrap-modal-3.3.4.min.js
}

if [ "$1" ]; then
    $1
    exit $?
fi

clean
compile
move

