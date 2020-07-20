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
var appbase_service_1 = require("../shared/appbase.service");
var JsonEditorComponent = (function () {
    function JsonEditorComponent(appbaseService) {
        this.appbaseService = appbaseService;
        this.streamPopoverInfo = {
            trigger: 'hover',
            placement: 'right',
            content: 'Stream is avtive, waiting for data updates ..'
        };
        this.setProp = new core_1.EventEmitter();
        this.errorShow = new core_1.EventEmitter();
    }
    // Set codemirror instead of normal textarea
    JsonEditorComponent.prototype.ngOnInit = function () {
        var self = this;
        this.editorHookHelp.applyEditor();
        $('#resultModal').modal({
            show: false,
            backdrop: 'static'
        });
        $('#resultModal').on('hide.bs.modal', function () {
            $('#resultTabs a[href="#resultJson"]').tab('show');
            self.responseHookHelp.focus('{"Loading": "please wait......"}');
            var propInfo = {
                name: 'result_time_taken',
                value: null
            };
            self.setProp.emit(propInfo);
        });
    };
    // Validate using checkValidaQuery method
    // if validation success then apply search query and set result in textarea using editorhook
    // else show message
    JsonEditorComponent.prototype.runQuery = function () {
        var self = this;
        this.appbaseService.setAppbase(this.config);
        var validate = this.checkValidQuery();
        if (validate.flag) {
            $('#resultModal').modal('show');
            this.appbaseService.posturl(self.finalUrl, validate.payload).then(function (res) {
                self.result.isWatching = false;
                var propInfo = {
                    name: 'result_time_taken',
                    value: res.json().took
                };
                self.setProp.emit(propInfo);
                var propInfo1 = {
                    name: 'random_token',
                    value: Math.random()
                };
                self.setProp.emit(propInfo1);
                self.result.output = JSON.stringify(res.json(), null, 2);
                if ($('#resultModal').hasClass('in')) {
                    self.responseHookHelp.setValue(self.result.output);
                }
                else {
                    setTimeout(function () {
                        self.responseHookHelp.setValue(self.result.output);
                    }, 300);
                }
            }).catch(function (data) {
                $('#resultModal').modal('hide');
                self.result.isWatching = false;
                self.result.output = JSON.stringify(data, null, 4);
                var obj = {
                    title: 'Response Error',
                    message: self.result.output
                };
                self.errorShow.emit(obj);
            });
            if (this.responseMode === 'stream') {
                this.setStream(validate);
            }
        }
        else {
            var obj = {
                title: 'Json validation',
                message: validate.message
            };
            this.errorShow.emit(obj);
        }
    };
    JsonEditorComponent.prototype.setStream = function (validate) {
        var _this = this;
        var selectedTypes = $('#setType').val();
        var body = validate.payload;
        setTimeout(function () {
            $('.stream-signal').show();
            $('.stream-signal').popover(_this.streamPopoverInfo);
        }, 300);
        this.appbaseService.searchStream(selectedTypes, body)
            .on('data', this.onStreamData.bind(this))
            .on('error', this.onStreamError.bind(this));
    };
    JsonEditorComponent.prototype.onStreamData = function (res) {
        $('.stream-signal').addClass('warning').addClass('success');
        var streamResponse = JSON.stringify(res, null, 2);
        if ($('#resultModal').hasClass('in')) {
            this.responseHookHelp.prepend(streamResponse + "\n");
        }
        else {
            setTimeout(function () {
                this.responseHookHelp.prepend(streamResponse + "\n");
            }, 300);
        }
    };
    JsonEditorComponent.prototype.onStreamError = function (res) {
        setTimeout(function () {
            $('.stream-signal').hide();
        }, 300);
    };
    // get the textarea value using editor hook
    // Checking if all the internal queries have field and query,
    // Query should not contain '*' that we are setting on default
    // If internal query is perfect then check for valid json
    JsonEditorComponent.prototype.checkValidQuery = function () {
        var getQuery = this.editorHookHelp.getValue();
        getQuery = getQuery.trim();
        var returnObj = {
            flag: true,
            payload: null,
            message: null
        };
        this.result.resultQuery.result.forEach(function (result) {
            result.internal.forEach(function (query) {
                if (query.field === '' || query.query === '') {
                    returnObj.flag = false;
                }
            });
        });
        if (returnObj.flag && getQuery && getQuery != "") {
            try {
                returnObj.payload = JSON.parse(getQuery);
            }
            catch (e) {
                returnObj.message = "Json is not valid.";
            }
        }
        else {
            returnObj.flag = false;
            returnObj.message = "  Please complete your query first.";
        }
        return returnObj;
    };
    JsonEditorComponent.prototype.setPropIn = function () {
        var propInfo = {
            name: 'finalUrl',
            value: this.finalUrl
        };
        this.setProp.emit(propInfo);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JsonEditorComponent.prototype, "finalUrl", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JsonEditorComponent.prototype, "mapping", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JsonEditorComponent.prototype, "types", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JsonEditorComponent.prototype, "selectedTypes", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], JsonEditorComponent.prototype, "result", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JsonEditorComponent.prototype, "responseMode", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], JsonEditorComponent.prototype, "setProp", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], JsonEditorComponent.prototype, "errorShow", void 0);
    JsonEditorComponent = __decorate([
        core_1.Component({
            selector: 'query-jsoneditor',
            templateUrl: './app/jsonEditor/jsonEditor.component.html',
            inputs: ['config', 'editorHookHelp', 'responseHookHelp', 'setProp', 'errorShow'],
            providers: [appbase_service_1.AppbaseService]
        }), 
        __metadata('design:paramtypes', [appbase_service_1.AppbaseService])
    ], JsonEditorComponent);
    return JsonEditorComponent;
}());
exports.JsonEditorComponent = JsonEditorComponent;
//# sourceMappingURL=jsonEditor.component.js.map