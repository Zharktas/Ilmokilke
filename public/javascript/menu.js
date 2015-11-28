(function (window, document) {
    var menu = document.getElementById('menu'),
        WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange':'resize';

    function toggleHorizontal() {
        var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
        if ( orientation ) {
            if (orientation.type === "portrait-secondary" || orientation.type === "portrait-primary") {
                document.getElementById('menu').querySelector('.custom-can-transform').classList.remove('pure-menu-horizontal');
                menu.classList.add('open');
            }
            else {
                document.getElementById('menu').querySelector('.custom-can-transform').classList.add('pure-menu-horizontal');
                menu.classList.remove('open');
            }
        }
    };



    toggleHorizontal()
    window.addEventListener(WINDOW_CHANGE_EVENT, toggleHorizontal);
})(this, this.document);