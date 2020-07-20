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
// Editable component which converts input or dropdown into editable ui
var core_1 = require("@angular/core");
// Markup contains 2 parts
// 1) primary input box: which is 3rd input box in query box, in which user will write value,
//    addOption button is optional if query contains optional paramater then add it
// 2) Optional parameter: It is collection of option rows, each row will contain option property name and value
var MatchQuery = (function () {
    function MatchQuery() {
        // Event which is listen by parent component. we will pass created query format in this event.
        this.getQueryFormat = new core_1.EventEmitter();
        // set current query name
        this.current_query = 'match';
        this.queryName = '*';
        this.fieldName = '*';
        // Add information of query
        this.information = {
            title: 'Match',
            content: "<span class=\"description\">Returns matches by doing a full-text search, is used as the <i>go to</i> query.</span>\n\t\t\t\t\t<a class=\"link\" href=\"https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html#query-dsl-match-query\">Read more</a>"
        };
        // Information about optional parameters which will be shown in popover
        this.informationList = {
            'operator': {
                title: 'operator',
                content: "<span class=\"description\">The operator flag can be set to 'OR' or 'AND' to control the boolean clauses.</span>"
            },
            'zero_terms_query': {
                title: 'zero_terms_query',
                content: "<span class=\"description\">Accepts none (default) and all which corresponds to a match_all query.</span>"
            },
            'cutoff_frequency': {
                title: 'cutoff_frequency',
                content: "<span class=\"description\">cutoff_frequency allows specifying frequency threshold where high frequency terms are moved into an optional subquery.</span>"
            },
            'type': {
                title: 'type',
                content: "<span class=\"description\">There are three types of match query: boolean (default), phrase, and phrase_prefix</span>"
            },
            'analyzer': {
                title: 'analyzer',
                content: "<span class=\"description\">The analyzer used to analyze each term of the query when creating composite queries.</span>"
            },
            'max_expansions': {
                title: 'max_expansions',
                content: "<span class=\"description\">The maximum number of terms that the query will expand to. Defaults to 50.</span>"
            }
        };
        // list of optional parameters
        this.default_options = [
            'operator',
            'zero_terms_query',
            'cutoff_frequency',
            'type',
            'analyzer',
            'max_expansions'
        ];
        this.singleOption = {
            name: '',
            value: ''
        };
        this.optionRows = [];
        // specify inputs placeholder and default value
        this.inputs = {
            input: {
                placeholder: 'Input',
                value: ''
            }
        };
        this.queryFormat = {};
    }
    // Initial hook: 
    // Logic of creating query format when loading saved query or load query from url
    // appliedQuery contains the queries which we will get from parent component
    MatchQuery.prototype.ngOnInit = function () {
        this.options = JSON.parse(JSON.stringify(this.default_options));
        try {
            // check if `match` query exists for selected field
            // set the inputs to show existing values in markup
            // set the optional parameter in `optionRows` if exists in query 
            if (this.appliedQuery[this.current_query][this.selectedField]) {
                if (this.appliedQuery[this.current_query][this.fieldName].hasOwnProperty('query')) {
                    this.inputs.input.value = this.appliedQuery[this.current_query][this.fieldName].query;
                    for (var option in this.appliedQuery[this.current_query][this.fieldName]) {
                        if (option != 'query') {
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
    // onchange hook:
    // Over here we will receive changes from parent and
    // if the selected field or selected query is changes then update the query by calliung `getFormat`.
    MatchQuery.prototype.ngOnChanges = function () {
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
    // This method is responsible to get query format and execute the event which will be listen in parent component
    MatchQuery.prototype.getFormat = function () {
        if (this.queryName === this.current_query) {
            this.queryFormat = this.setFormat();
            this.getQueryFormat.emit(this.queryFormat);
        }
    };
    // Build the query format in this method 
    MatchQuery.prototype.setFormat = function () {
        var queryFormat = {};
        queryFormat[this.queryName] = {};
        if (this.optionRows.length) {
            queryFormat[this.queryName][this.fieldName] = {
                query: this.inputs.input.value
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
    // Now below methods are related to options parameter, 
    //so use it as it is in new query if query contains optional parametes
    // while selecting option
    MatchQuery.prototype.selectOption = function (input) {
        input.selector.parents('.editable-pack').removeClass('on');
        this.optionRows[input.external].name = input.val;
        this.filterOptions();
        setTimeout(function () {
            this.getFormat();
        }.bind(this), 300);
    };
    // Update the option list because duplicate option is not allowed
    MatchQuery.prototype.filterOptions = function () {
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
    // while user click on add option button it will add new option row and update the available options
    MatchQuery.prototype.addOption = function () {
        var singleOption = JSON.parse(JSON.stringify(this.singleOption));
        this.filterOptions();
        this.optionRows.push(singleOption);
    };
    // while user click on remove option button it will remove the row and update the available options
    MatchQuery.prototype.removeOption = function (index) {
        this.optionRows.splice(index, 1);
        this.filterOptions();
        this.getFormat();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MatchQuery.prototype, "queryList", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MatchQuery.prototype, "selectedField", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MatchQuery.prototype, "appliedQuery", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MatchQuery.prototype, "selectedQuery", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MatchQuery.prototype, "getQueryFormat", void 0);
    MatchQuery = __decorate([
        core_1.Component({
            selector: 'match-query',
            template: "<span class=\"col-xs-6 pd-10\">\n\t\t\t\t\t<div class=\"form-group form-element query-primary-input\">\n\t\t\t\t\t\t<span class=\"input_with_option\">\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control col-xs-12\"\n\t\t\t\t\t\t\t\t[(ngModel)]=\"inputs.input.value\"\n\t\t\t\t\t\t\t \tplaceholder=\"{{inputs.input.placeholder}}\"\n\t\t\t\t\t\t\t \t(keyup)=\"getFormat();\" />\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button (click)=\"addOption();\" class=\"btn btn-info btn-xs add-option\"> <i class=\"fa fa-plus\"></i> </button>\n\t\t\t\t</span>\n\t\t\t\t<div class=\"col-xs-12 option-container\" *ngIf=\"optionRows.length\">\n\t\t\t\t\t<div class=\"col-xs-12 single-option\" *ngFor=\"let singleOption of optionRows, let i=index\">\n\t\t\t\t\t\t<div class=\"col-xs-6 pd-l0\">\n\t\t\t\t\t\t\t<editable\n\t\t\t\t\t\t\t\tclass = \"additional-option-select-{{i}}\"\n\t\t\t\t\t\t\t\t[editableField]=\"singleOption.name\"\n\t\t\t\t\t\t\t\t[editPlaceholder]=\"'--choose option--'\"\n\t\t\t\t\t\t\t\t[editableInput]=\"'select2'\"\n\t\t\t\t\t\t\t\t[selectOption]=\"options\"\n\t\t\t\t\t\t\t\t[passWithCallback]=\"i\"\n\t\t\t\t\t\t\t\t[selector]=\"'additional-option-select'\"\n\t\t\t\t\t\t\t\t[querySelector]=\"querySelector\"\n\t\t\t\t\t\t\t\t[informationList]=\"informationList\"\n\t\t\t\t\t\t\t\t[showInfoFlag]=\"true\"\n\t\t\t\t\t\t\t\t[searchOff]=\"true\"\n\t\t\t\t\t\t\t\t(callback)=\"selectOption($event)\">\n\t\t\t\t\t\t\t</editable>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-xs-6 pd-0\">\n\t\t\t\t\t\t\t<div class=\"form-group form-element\">\n\t\t\t\t\t\t\t\t<input class=\"form-control col-xs-12 pd-0\" type=\"text\" [(ngModel)]=\"singleOption.value\" placeholder=\"value\"  (keyup)=\"getFormat();\"/>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<button (click)=\"removeOption(i)\" class=\"btn btn-grey delete-option btn-xs\">\n\t\t\t\t\t\t\t<i class=\"fa fa-times\"></i>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t",
            inputs: ['getQueryFormat', 'querySelector']
        }), 
        __metadata('design:paramtypes', [])
    ], MatchQuery);
    return MatchQuery;
}());
exports.MatchQuery = MatchQuery;
//# sourceMappingURL=match.query.js.map