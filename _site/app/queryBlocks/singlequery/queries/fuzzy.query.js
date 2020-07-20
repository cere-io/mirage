"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var FuzzyQuery = (function () {
    function FuzzyQuery() {
        this.getQueryFormat = new core_1.EventEmitter();
        this.current_query = 'fuzzy';
        this.queryName = '*';
        this.fieldName = '*';
        this.information = {
            title: 'Fuzzy',
            content: "<span class=\"description\">Returns matches within the edit distance specified by the <strong>fuzziness</strong> parameter.</span>\n\t\t\t\t\t<a class=\"link\" href=\"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-fuzzy-query.html#query-dsl-fuzzy-query\">Read more</a>"
        };
        this.informationList = {
            'boost': {
                title: 'boost',
                content: "<span class=\"description\">Sets the boost value of the query, defaults to <strong>1.0</strong> </span>"
            },
            'fuzziness': {
                title: 'fuzziness',
                content: "<span class=\"description\">The maximum edit distance. Defaults to AUTO.</span>"
            },
            'prefix_length': {
                title: 'prefix_length',
                content: "<span class=\"description\">The number of initial characters which will not be \"fuzzified\". Defaults to 0.</span>"
            },
            'max_expansions': {
                title: 'max_expansions',
                content: "<span class=\"description\">The maximum number of terms that the fuzzy query will expand to. Defaults to 50.</span>"
            }
        };
        this.default_options = [
            'boost',
            'fuzziness',
            'prefix_length',
            'max_expansions'
        ];
        this.singleOption = {
            name: '',
            value: ''
        };
        this.optionRows = [];
        this.inputs = {
            input: {
                placeholder: 'Input',
                value: ''
            }
        };
        this.queryFormat = {};
    }
    FuzzyQuery.prototype.ngOnInit = function () {
        this.options = JSON.parse(JSON.stringify(this.default_options));
        try {
            if (this.appliedQuery[this.current_query][this.fieldName]) {
                if (this.appliedQuery[this.current_query][this.fieldName]) {
                    this.inputs.input.value = this.appliedQuery[this.current_query][this.fieldName].value;
                    for (var option in this.appliedQuery[this.current_query][this.fieldName]) {
                        if (option != 'value') {
                            var obj = {
                                name: option,
                                value: this.appliedQuery[this.current_query][this.fieldName][option]
                            };
                            this.optionRows.push(obj);
                        }
                    }
                }
                else {
                    this.inputs.input.value = this.appliedQuery[this.current_query][this.fieldName];
                }
            }
        }
        catch (e) { }
        this.filterOptions();
        this.getFormat();
    };
    FuzzyQuery.prototype.ngOnChanges = function () {
        if (this.selectedField != '') {
            if (this.selectedField !== this.fieldName) {
                this.fieldName = this.selectedField;
                this.getFormat();
            }
        }
        if (this.selectedQuery != '') {
            if (this.selectedQuery !== this.queryName) {
                this.queryName = this.selectedQuery;
                this.optionRows = [];
                this.getFormat();
            }
        }
    };
    // QUERY FORMAT
    /*
        Query Format for this query is
        @queryName: {
            @fieldName: @value
        }
    */
    FuzzyQuery.prototype.getFormat = function () {
        if (this.queryName === this.current_query) {
            this.queryFormat = this.setFormat();
            this.getQueryFormat.emit(this.queryFormat);
        }
    };
    FuzzyQuery.prototype.setFormat = function () {
        var queryFormat = {};
        queryFormat[this.queryName] = {};
        if (this.optionRows.length) {
            queryFormat[this.queryName][this.fieldName] = {
                value: this.inputs.input.value
            };
            this.optionRows.forEach(function (singleRow) {
                queryFormat[this.queryName][this.fieldName][singleRow.name] = singleRow.value;
            }.bind(this));
        }
        else {
            queryFormat[this.queryName][this.fieldName] = this.inputs.input.value;
        }
        return queryFormat;
    };
    FuzzyQuery.prototype.selectOption = function (input) {
        input.selector.parents('.editable-pack').removeClass('on');
        this.optionRows[input.external].name = input.val;
        this.filterOptions();
        setTimeout(function () {
            this.getFormat();
        }.bind(this), 300);
    };
    FuzzyQuery.prototype.filterOptions = function () {
        this.options = this.default_options.filter(function (opt) {
            var flag = true;
            this.optionRows.forEach(function (row) {
                if (row.name === opt) {
                    flag = false;
                }
            });
            return flag;
        }.bind(this));
    };
    FuzzyQuery.prototype.addOption = function () {
        var singleOption = JSON.parse(JSON.stringify(this.singleOption));
        this.filterOptions();
        this.optionRows.push(singleOption);
    };
    FuzzyQuery.prototype.removeOption = function (index) {
        this.optionRows.splice(index, 1);
        this.filterOptions();
        this.getFormat();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FuzzyQuery.prototype, "queryList", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FuzzyQuery.prototype, "selectedField", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FuzzyQuery.prototype, "appliedQuery", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FuzzyQuery.prototype, "selectedQuery", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FuzzyQuery.prototype, "getQueryFormat", void 0);
    FuzzyQuery = __decorate([
        core_1.Component({
            selector: 'fuzzy-query',
            template: "<span class=\"col-xs-6 pd-l0\">\n\t\t\t\t\t<div class=\"form-group form-element\">\n\t\t\t\t\t\t<input type=\"text\" class=\"form-control col-xs-12\"\n\t\t\t\t\t\t\t[(ngModel)]=\"inputs.input.value\"\n\t\t\t\t\t\t \tplaceholder=\"{{inputs.input.placeholder}}\"\n\t\t\t\t\t\t \t(keyup)=\"getFormat();\" />\n\t\t\t\t\t</div>\n\t\t\t\t\t<button (click)=\"addOption();\" class=\"btn btn-info btn-xs add-option\"> <i class=\"fa fa-plus\"></i> </button>\n\t\t\t\t</span>\n\t\t\t\t<div class=\"col-xs-12 option-container\" *ngIf=\"optionRows.length\">\n\t\t\t\t\t<div class=\"col-xs-12 single-option\" *ngFor=\"let singleOption of optionRows, let i=index\">\n\t\t\t\t\t\t<div class=\"col-xs-6 pd-l0\">\n\t\t\t\t\t\t\t<editable\n\t\t\t\t\t\t\t\tclass = \"additional-option-select-{{i}}\"\n\t\t\t\t\t\t\t\t[editableField]=\"singleOption.name\"\n\t\t\t\t\t\t\t\t[editPlaceholder]=\"'--choose option--'\"\n\t\t\t\t\t\t\t\t[editableInput]=\"'select2'\"\n\t\t\t\t\t\t\t\t[selectOption]=\"options\"\n\t\t\t\t\t\t\t\t[passWithCallback]=\"i\"\n\t\t\t\t\t\t\t\t[selector]=\"'additional-option-select'\"\n\t\t\t\t\t\t\t\t[querySelector]=\"querySelector\"\n\t\t\t\t\t\t\t\t[informationList]=\"informationList\"\n\t\t\t\t\t\t\t\t[showInfoFlag]=\"true\"\n\t\t\t\t\t\t\t\t[searchOff]=\"true\"\n\t\t\t\t\t\t\t\t(callback)=\"selectOption($event)\">\n\t\t\t\t\t\t\t</editable>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-xs-6 pd-0\">\n\t\t\t\t\t\t\t<div class=\"form-group form-element\">\n\t\t\t\t\t\t\t\t<input class=\"form-control col-xs-12 pd-0\" type=\"text\" [(ngModel)]=\"singleOption.value\" placeholder=\"value\"  (keyup)=\"getFormat();\"/>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<button (click)=\"removeOption(i)\" class=\"btn btn-grey delete-option btn-xs\">\n\t\t\t\t\t\t\t<i class=\"fa fa-times\"></i>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>",
            inputs: ['getQueryFormat', 'querySelector', 'querySelector']
        }), 
        __metadata('design:paramtypes', [])
    ], FuzzyQuery);
    return FuzzyQuery;
}());
exports.FuzzyQuery = FuzzyQuery;
//# sourceMappingURL=fuzzy.query.js.map