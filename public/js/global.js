(function (window, document, $) {

    window.extend = function (Child, Parent) {
        var F = function() { }
        F.prototype = Parent.prototype
        Child.prototype = new F()
        Child.prototype.constructor = Child
        Child.superclass = Parent.prototype
    }

    var $Games = {

        games: {},

        registerGame: function(name, options) {

        }

    }

    window.gogogo = function() {

        var $sudoku = new Sudoku('board', {someOption: 123});
        $sudoku.getName();
    }

})(this, this.document, this.jQuery);
