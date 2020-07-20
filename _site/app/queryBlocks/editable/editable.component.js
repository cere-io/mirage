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
var EditableComponent = (function () {
    function EditableComponent() {
        this.callback = new core_1.EventEmitter();
        this.setDocSample = new core_1.EventEmitter();
    }
    EditableComponent.prototype.ngOnInit = function () {
    };
    EditableComponent.prototype.ngOnChanges = function () {
    };
    EditableComponent.prototype.ngAfterViewInit = function () {
    };
    // allow user to select field, or query
    // toggle between editable-front and editable-back
    // focus to select element
    EditableComponent.prototype.editable_on = function ($event) {
        $('.editable-pack').removeClass('on');
        $($event.currentTarget).parents('.editable-pack').addClass('on');
        if (this.editableInput == 'select2') {
            $($event.currentTarget).parents('.editable-pack').find('select').select2('open');
        }
        if (this.editableInput == 'select') {
            $($event.currentTarget).parents('.editable-pack').find('select').focus().simulate('mousedown');
        }
    };
    EditableComponent.prototype.editable_off = function ($event) {
        setTimeout(function () {
            $('.editable-pack').removeClass('on');
            if (typeof this.passWithCallback != 'undefined') {
                var obj = {
                    external: this.passWithCallback,
                    value: this.editableModal
                };
                this.callback.emit(obj);
            }
            else {
                this.callback.emit(this.editableModal);
            }
        }.bind(this), 300);
    };
    EditableComponent.prototype.setDocSampleEve = function (link) {
        this.setDocSample.emit(link);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EditableComponent.prototype, "editableField", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EditableComponent.prototype, "editableInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EditableComponent.prototype, "result", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EditableComponent.prototype, "querySelector", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EditableComponent.prototype, "selector", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EditableComponent.prototype, "editableModal", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EditableComponent.prototype, "passWithCallback", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EditableComponent.prototype, "callback", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EditableComponent.prototype, "setDocSample", void 0);
    EditableComponent = __decorate([
        core_1.Component({
            selector: 'editable',
            templateUrl: './app/queryBlocks/editable/editable.component.html',
            inputs: ['editPlaceholder', 'callback', 'selectOption', 'informationList', 'showInfoFlag', 'searchOff', 'setDocSample']
        }), 
        __metadata('design:paramtypes', [])
    ], EditableComponent);
    return EditableComponent;
}());
exports.EditableComponent = EditableComponent;
//# sourceMappingURL=editable.component.js.map