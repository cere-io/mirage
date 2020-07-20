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
var AppselectComponent = (function () {
    function AppselectComponent() {
        this.onAppSelectChange = new core_1.EventEmitter();
        this.setConfig = new core_1.EventEmitter();
        this.filteredApps = [];
        this.appFocus = false;
    }
    AppselectComponent.prototype.ngOnInit = function () {
        // this.handleInput();
        this.onAppSelectChange.emit(this.config.appname);
    };
    AppselectComponent.prototype.ngOnChanges = function () {
        this.onAppSelectChange.emit(this.config.appname);
    };
    AppselectComponent.prototype.handleInput = function () {
        this.filteredApps = this.getFilterApp();
        if (this.filteredApps.length) {
            this.appFocus = true;
        }
        else {
            this.appFocus = false;
        }
        this.onAppSelectChange.emit(this.config.appname);
    };
    AppselectComponent.prototype.getFilterApp = function () {
        return this.appsList.filter(function (app, index) {
            return this.config.appname === '' || (this.config.appname !== '' && app.appname.toUpperCase().indexOf(this.config.appname.toUpperCase()) !== -1);
        }.bind(this));
    };
    AppselectComponent.prototype.focusInput = function () {
        this.filteredApps = this.getFilterApp();
        if (this.filteredApps.length) {
            this.appFocus = true;
        }
        this.onAppSelectChange.emit(this.config.appname);
    };
    AppselectComponent.prototype.blurInput = function () {
        setTimeout(function () {
            this.appFocus = false;
        }.bind(this), 500);
        this.onAppSelectChange.emit(this.config.appname);
    };
    AppselectComponent.prototype.setApp = function (app) {
        this.setConfig.emit(app);
        this.onAppSelectChange.emit(app.appname);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AppselectComponent.prototype, "appsList", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AppselectComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AppselectComponent.prototype, "connected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AppselectComponent.prototype, "onAppSelectChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AppselectComponent.prototype, "setConfig", void 0);
    AppselectComponent = __decorate([
        core_1.Component({
            selector: 'appselect',
            templateUrl: './app/features/appselect/appselect.component.html',
            inputs: ['setConfig', 'onAppSelectChange']
        }), 
        __metadata('design:paramtypes', [])
    ], AppselectComponent);
    return AppselectComponent;
}());
exports.AppselectComponent = AppselectComponent;
//# sourceMappingURL=appselect.component.js.map