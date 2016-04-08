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

    var _css = '.moveit-item{position: absolute;}.moveit-item::before{content: " ";position: absolute;z-index: -1;top: -500%;left: -500%;width: 1000%;height: 1000%;background: none;}';

    var style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(_css));
    document.head.appendChild(style);

    /**
     * Move functionality
     */
    $.fn.moveable = function (user_options) {
        /* Overwrites with user options */
        options = (user_options ? user_options : {});
        options["elements"] = this;

        return this.each(function (index, element) {

            /* Overwite start element */
            var startElement = (options["startElement"] ? $(this).find(options["startElement"]) : this);

            if(!startElement.bind) startElement = $(startElement);

            /* Bind Mouse Events */
            startElement.bind("mousedown", function (event) {
                _mouseDown.call(this, event);
            });

            $(element).bind("mousemove", function (event) {
                _mouseMove.call(this, event);
            });

            $(element).bind("mouseup", function (event) {
                _mouseUp.call(this, event);
            });

            $(element).attr("data-index", index);
            startElement.attr("data-index", index);
        });
    };

    /**
     * Set Mouse Down Event Handler
     * @param {jQuery#Event} event
     * @return {void}
     */
    function _mouseDown(event)
    {
        $(this).addClass("moveit-item");

        _startX = event.clientX;
        _startY = event.clientY;

        /* Set Mouse Flag */
        mouse_down = true;

        var element_index = parseInt($(this).attr("data-index"));

        /* Adding Class (By this, before pseudo element been added) */
        $(options["elements"][element_index]).addClass("popup-drag");

        /* Classing armageddon */
        event.preventDefault();
        event.stopPropagation();

        $(this).trigger("moveit:start");
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

        $(this).trigger("moveit:move");
    }

    /**
     * Mouse up Event Handler
     * @param {jQuery#Event} event
     * @return {void}
     */
    function _mouseUp(event)
    {
        $(this).removeClass("popup-drag");
        $(this).removeClass("moveit-item");
        mouse_down = false;

        var panel = options["elements"][parseInt($(this).attr("data-index"))];

        /* Update Potiosion */
        $(panel).css("left", $(panel).position().left);
        $(panel).css("top", $(panel).position().top);
        /* Remove Transform */
        $(panel).css("transform", "translate3d(0px, 0px, 0)");

        $(this).trigger("moveit:stop");
    }
}(jQuery));