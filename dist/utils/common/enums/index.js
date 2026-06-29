"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS = exports.Choice = exports.LEVEL = exports.PAID = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["STUDENT"] = "student";
})(Role || (exports.Role = Role = {}));
var PAID;
(function (PAID) {
    PAID["YES"] = "yes";
    PAID["NO"] = "no";
})(PAID || (exports.PAID = PAID = {}));
var LEVEL;
(function (LEVEL) {
    LEVEL["one"] = "one";
    LEVEL["two"] = "two";
    LEVEL["three"] = "three";
    LEVEL["four"] = "four";
    LEVEL["five"] = "five";
    LEVEL["six"] = "six";
    LEVEL["seven"] = "seven";
    LEVEL["eight"] = "eight";
    LEVEL["nine"] = "nine";
    LEVEL["ten"] = "ten";
    LEVEL["eleven"] = "eleven";
    LEVEL["twelve"] = "twelve";
})(LEVEL || (exports.LEVEL = LEVEL = {}));
var Choice;
(function (Choice) {
    Choice["A"] = "A";
    Choice["B"] = "B";
    Choice["C"] = "C";
    Choice["D"] = "D";
})(Choice || (exports.Choice = Choice = {}));
var STATUS;
(function (STATUS) {
    STATUS["IN_PROGRESS"] = "in_progress";
    STATUS["COMPLETED"] = "completed";
})(STATUS || (exports.STATUS = STATUS = {}));
