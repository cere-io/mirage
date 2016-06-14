System.register(["@angular/core"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var TypesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TypesComponent = (function () {
                function TypesComponent() {
                    this.setFinalUrl = new core_1.EventEmitter();
                }
                TypesComponent.prototype.ngOnChanges = function (changes) {
                    if (changes['detectChange'] && this.types.length) {
                        var setType = $('#setType');
                        try {
                            setType.select2('destroy').html('');
                        }
                        catch (e) { }
                        setType.select2({
                            placeholder: "Select types to apply query",
                            tags: false,
                            data: this.createTokenData(this.types)
                        });
                        setType.on("change", function (e) {
                            this.changeType(setType.val());
                        }.bind(this));
                    }
                };
                TypesComponent.prototype.createTokenData = function (types) {
                    var data = [];
                    types.forEach(function (val) {
                        var obj = {
                            id: val,
                            text: val
                        };
                        data.push(obj);
                    });
                    return data;
                };
                TypesComponent.prototype.changeType = function (val) {
                    //this.mapping.resultQuery.result = [];
                    this.selectedTypes = val;
                    var availableFields = [];
                    if (val && val.length) {
                        val.forEach(function (type) {
                            var mapObj = this.mapping[this.config.appname].mappings[type].properties;
                            for (var field in mapObj) {
                                var index = typeof mapObj[field]['index'] != 'undefined' ? mapObj[field]['index'] : null;
                                var obj = {
                                    name: field,
                                    type: mapObj[field]['type'],
                                    index: index
                                };
                                switch (obj.type) {
                                    case 'long':
                                    case 'integer':
                                    case 'short':
                                    case 'byte':
                                    case 'double':
                                    case 'float':
                                        obj.type = 'numeric';
                                        break;
                                }
                                availableFields.push(obj);
                            }
                        }.bind(this));
                        this.setUrl();
                        //set input state
                        this.urlShare.inputs['selectedTypes'] = this.selectedTypes;
                        this.urlShare.createUrl();
                    }
                    console.log(availableFields);
                    this.result.resultQuery.availableFields = availableFields;
                };
                TypesComponent.prototype.setUrl = function () {
                    var selectedTypes = this.selectedTypes;
                    var finalUrl = this.finalUrl.split('/');
                    var lastUrl = '';
                    if (finalUrl.length > 4) {
                        finalUrl[4] = this.selectedTypes.join(',');
                        lastUrl = finalUrl.join('/');
                    }
                    else {
                        lastUrl = this.finalUrl + '/' + this.selectedTypes.join(',') + '/_search';
                    }
                    this.setFinalUrl.emit(lastUrl);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TypesComponent.prototype, "mapping", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TypesComponent.prototype, "config", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TypesComponent.prototype, "types", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TypesComponent.prototype, "selectedTypes", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TypesComponent.prototype, "result", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], TypesComponent.prototype, "finalUrl", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TypesComponent.prototype, "urlShare", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], TypesComponent.prototype, "setFinalUrl", void 0);
                TypesComponent = __decorate([
                    core_1.Component({
                        selector: 'types',
                        templateUrl: './app/build/types/types.component.html',
                        inputs: ['mapping', 'types', 'selectedTypes', 'result', 'config', 'detectChange', 'finalUrl', 'setFinalUrl', 'urlShare']
                    }), 
                    __metadata('design:paramtypes', [])
                ], TypesComponent);
                return TypesComponent;
            }());
            exports_1("TypesComponent", TypesComponent);
        }
    }
});
//# sourceMappingURL=types.component.js.map