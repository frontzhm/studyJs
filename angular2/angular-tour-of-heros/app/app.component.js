"use strict";
var Hero = (function () {
    function Hero() {
    }
    return Hero;
}());
exports.Hero = Hero;
var HEROES = [
    { id: 11, name: 'abs' },
    { id: 12, name: 'btw' },
    { id: 13, name: 'call' },
    { id: 14, name: 'dell' },
    { id: 15, name: 'ella' },
    { id: 16, name: 'fibs' },
    { id: 17, name: 'gef' },
    { id: 18, name: 'hed' },
    { id: 19, name: 'ie' },
    { id: 20, name: 'jerk' },
    { id: 11, name: 'kewen' },
];
style: ["\n\t.selected {\n\t    background-color: #CFD8DC !important;\n\t    color: white;\n\t  }\n\t  .heroes {\n\t    margin: 0 0 2em 0;\n\t    list-style-type: none;\n\t    padding: 0;\n\t    width: 15em;\n\t  }\n\t  .heroes li {\n\t    cursor: pointer;\n\t    position: relative;\n\t    left: 0;\n\t    background-color: #EEE;\n\t    margin: .5em;\n\t    padding: .3em 0;\n\t    height: 1.6em;\n\t    border-radius: 4px;\n\t  }\n\t  .heroes li.selected:hover {\n\t    background-color: #BBD8DC !important;\n\t    color: white;\n\t  }\n\t  .heroes li:hover {\n\t    color: #607D8B;\n\t    background-color: #DDD;\n\t    left: .1em;\n\t  }\n\t  .heroes .text {\n\t    position: relative;\n\t    top: -3px;\n\t  }\n\t  .heroes .badge {\n\t    display: inline-block;\n\t    font-size: small;\n\t    color: white;\n\t    padding: 0.8em 0.7em 0 0.7em;\n\t    background-color: #607D8B;\n\t    line-height: 1em;\n\t    position: relative;\n\t    left: -1px;\n\t    top: -4px;\n\t    height: 1.8em;\n\t    margin-right: .8em;\n\t    border-radius: 4px 0 0 4px;\n\t  }\n\n"];
var AppComponent = (function () {
    function AppComponent() {
        this.title = "Tour of Heroes";
        this.heroes = HEROES;
    }
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map