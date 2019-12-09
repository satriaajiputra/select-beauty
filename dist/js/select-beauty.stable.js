"use strict";

function _instanceof(left, right) {
  return right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
    ? !!right[Symbol.hasInstance](left)
    : left instanceof right;
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor))
    throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    (descriptor.enumerable = descriptor.enumerable || false),
      (descriptor.configurable = true),
      "value" in descriptor && (descriptor.writable = true),
      Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  return (
    protoProps && _defineProperties(Constructor.prototype, protoProps),
    staticProps && _defineProperties(Constructor, staticProps),
    Constructor
  );
}

/*================================================
=            Javascript Select Beauty            =
================================================*/

/**

	Author: Satria AJi Putra
	Created At: 25/10/17

 */
var SelectBeauty =
  /*#__PURE__*/
  (function() {
    function SelectBeauty(data) {
      _classCallCheck(this, SelectBeauty),
        (this.el = data.el),
        (this.placeholder =
          typeof data.placeholder === "undefined"
            ? "Select Something"
            : data.placeholder),
        (this.length = typeof data.length === "undefined" ? 3 : data.length),
        (this.max = typeof data.max !== "undefined" && data.max),
        (this.initSelected =
          typeof data.selected === "undefined" ? [] : data.selected),
        (this.selected = {}),
        (this.tempData = {}),
        this.getTemporaryData(),
        this.getHtml(),
        this.hideSelect(),
        this.renderView(),
        this.buttonListener(),
        this.toggleListener(),
        this.selectListener(),
        this.filter();
    } // get data from select

    return (
      _createClass(SelectBeauty, [
        {
          key: "getTemporaryData",
          value: function getTemporaryData() {
            var _this = this;

            $.each($(this.el).children(), function(i, r) {
              var el = $(r);
              var value = el.attr("value");
              var data = {
                text: el.text(),
                icon: el.attr("icon")
              };
              (_this.tempData[value] = data),
                _this.initSelected.length > 0 &&
                  _this.inArray(_this.initSelected, value) &&
                  (_this.selected[value] = _this.tempData[value]);
            });
          } // check if a value is in array
        },
        {
          key: "inArray",
          value: function inArray(array, find) {
            return !!(
              array.findIndex(function(value) {
                return value == find;
              }) > -1
            );
          } // hide select with add attribute multiple
        },
        {
          key: "hideSelect",
          value: function hideSelect() {
            $(this.el).hide(), $(this.el).attr("multiple", true);
          }
        },
        {
          key: "renderView",
          value: function renderView() {
            $(this.el)
              .parent()
              .append(this.htmlBeauty);
          }
        },
        {
          key: "htmlData",
          value: function htmlData() {
            var html = "";

            for (name in this.tempData) {
              // check if the element is active or not while rendering the html
              var active = this.inArray(this.initSelected, name)
                ? "active"
                : "";
              html += '\n\t\t\t\t<li class="'
                .concat(active, '">\n\t\t\t\t\t<a href="#" data-value="')
                .concat(name, '"><i class="iw ')
                .concat(this.tempData[name].icon, '"></i> ')
                .concat(
                  this.tempData[name].text,
                  "</a>\n\t\t\t\t</li>\n\t\t\t"
                );
            }

            return html;
          }
        },
        {
          key: "getHtml",
          value: function getHtml() {
            this.htmlBeauty = '<div class="select-beauty" data-instance="'
              .concat(
                this.el,
                '">\n\t\t\t<button class="button-sb button-sb-block">'
              )
              .concat(
                this.placeholder,
                '</button>\n\t\t\t<ul class="hide">\n\t\t\t\t'
              )
              .concat(this.htmlData(), "\n\t\t\t</ul>\n\t\t</div>");
          }
        },
        {
          key: "toggleListener",
          value: function toggleListener() {
            var _this = this;

            $(document).click(function(ev) {
              var el = $('[data-instance="' + _this.el + '"] ul');
              el.addClass("hide");
            }),
              $('[data-instance="' + this.el + '"] ul').click(function(ev) {
                ev.stopPropagation();
              });
          }
        },
        {
          key: "buttonListener",
          value: function buttonListener() {
            $(document)
              .find('[data-instance="' + this.el + '"]')
              .on("click", "button", function(ev) {
                ev.preventDefault(),
                  ev.stopPropagation(),
                  $(this)
                    .next("ul")
                    .toggleClass("hide");
              });
          }
        },
        {
          key: "selectListener",
          value: function selectListener() {
            var _this = this;

            $(document)
              .find('[data-instance="' + this.el + '"] ul')
              .on("click", "a", function(ev) {
                ev.stopPropagation(), ev.preventDefault();
                var el = $(this);
                var id = el.attr("data-value");
                var parent = el.parent();
                if (parent.hasClass("active"))
                  delete _this.selected[id], parent.removeClass("active");
                else {
                  if (
                    _this.max &&
                    _this.countObject(_this.selected) >= _this.max
                  )
                    return false;
                  (_this.selected[id] = _this.tempData[id]),
                    parent.addClass("active");
                }

                _this.filter();
              });
          }
        },
        {
          key: "countObject",
          value: function countObject(obj) {
            return Object.keys(obj).length;
          }
        },
        {
          key: "filter",
          value: function filter() {
            var arr = [];
            var btnText = [];
            var btnElement = $('[data-instance="' + this.el + '"] button');

            for (name in this.selected)
              arr.push(name), btnText.push(this.selected[name].text);

            $(this.el).val(arr),
              btnText.length < 1
                ? btnElement.text(this.placeholder)
                : btnText.length > this.length
                  ? btnElement.text("(" + btnText.length + ") Selected")
                  : btnElement.text(btnText.join(", "));
          }
        },
        {
          key: "reload",
          value: function reload() {
            (this.selected = {}),
              (this.tempData = {}),
              $(this.el).val([]),
              this.getTemporaryData(),
              $(document)
                .find('[data-instance="' + this.el + '"] ul')
                .html(""),
              $(document)
                .find('[data-instance="' + this.el + '"] ul')
                .html(this.htmlData());
          }
        }
      ]),
      SelectBeauty
    );
  })();
