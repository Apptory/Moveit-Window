/** 
 * Moveit Class - Provide easy "window move" functionality 
 */
(function ($) {

    /* Set Data Members */
    var mouse_down = false;
    var options = {};
    
    /* Position Data Members */
    var _startX = 0;
    var _startY = 0;
    var _offsetX = 0;
    var _offsetY = 0;

    /**
     * Move functionality
     */
    $.fn.moveable = function (user_options) {
        /* Overwrites with user options */
        options = user_options;

        /* Overwite start element */
        var startElement = (options["startElement"] ? $(options["startElement"]) : this);

        options["self"] = this;

        /* Bind Mouse Events */
        startElement.bind("mousedown", function (event) {
            _mouseDown.call(this, event);
        });

        this.bind("mousemove", function (event) {
            _mouseMove.call(this, event);
        });

        this.bind("mouseup", function (event) {
            _mouseUp.call(this, event);
        });

        return this; // Chain. 
    };

    /**
     * Set Mouse Down Event Handler
     * @param {jQuery#Event} event
     * @return {void}
     */
    function _mouseDown(event)
    {
        /* Getting Current Numbers */
        _offsetX = _getNumber(this.style.left);
        _offsetY = _getNumber(this.style.top);

        _startX = event.clientX;
        _startY = event.clientY;

        /* Set Mouse Flag */
        mouse_down = true;

        /* Adding Class (By this, before pseudo element been added) */
        $(options["self"]).addClass("popup-drag");

        /* Classing armageddon */
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * Mouse Move Event Handler
     * @param {jQuery#Event} event
     * @return {void}
     */
    function _mouseMove(event)
    {
        /* Abort when mouse isn't down */
        if (!mouse_down) return;

        /* Appending Transforms */
        $(this).css("transform", "translate3d(" + (event.clientX - _startX) + "px, " + (event.clientY - _startY) + "px, 0)");
    }

    /**
     * Mouse up Event Handler
     * @param {jQuery#Event} event
     * @return {void}
     */
    function _mouseUp(event)
    {
        $(this).removeClass("popup-drag");
        mouse_down = false;

        /* Update Potiosion */
        $(options["self"]).css("left", $(options["self"]).position().left);
        $(options["self"]).css("top", $(options["self"]).position().top);
        /* Remove Transform */
        $(options["self"]).css("transform", "translate3d(0px, 0px, 0)");
    }

    /**
     * Return number (int) of any value
     * @param {number} value
     * @return {int}
     */
    function _getNumber(value) {
        var n = parseInt(value);
        return n == null || isNaN(n) ? 0 : n;
    }
}(jQuery));