"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*================================================
=            Javascript Select Beauty            =
================================================*/

/**

	Author: Satria AJi Putra
	Created At: 25/10/17

 */

var SelectBeauty = function () {
	function SelectBeauty(data) {
		_classCallCheck(this, SelectBeauty);

		this.el = data.el;
		this.placeholder = typeof data.placeholder !== "undefined" ? data.placeholder : "Select Something";
		this.length = typeof data.length !== "undefined" ? data.length : 3;
		this.max = typeof data.max !== "undefined" ? data.max : false;
		this.selected = {};
		this.tempData = {};
		this.getTemporaryData();
		this.getHtml();
		this.hideSelect();
		this.renderView();
		this.buttonListener();
		this.toggleListener();
		this.selectListener();
	}

	// get data from select


	_createClass(SelectBeauty, [{
		key: "getTemporaryData",
		value: function getTemporaryData() {
			var _this = this;

			$.each($(this.el).children(), function (i, r) {
				var el = $(r);
				var data = {
					text: el.text(),
					icon: el.attr('icon')
				};
				_this.tempData[el.attr('value')] = data;
			});
		}

		// hide select with add attribute multiple

	}, {
		key: "hideSelect",
		value: function hideSelect() {
			$(this.el).hide();
			$(this.el).attr('multiple', true);
		}
	}, {
		key: "renderView",
		value: function renderView() {
			$(this.el).parent().append(this.htmlBeauty);
		}
	}, {
		key: "htmlData",
		value: function htmlData() {
			var html = '';

			for (name in this.tempData) {
				html += "\n\t\t\t\t<li>\n\t\t\t\t\t<a href=\"#\" data-value=\"" + name + "\"><i class=\"iw " + this.tempData[name].icon + "\"></i> " + this.tempData[name].text + "</a>\n\t\t\t\t</li>\n\t\t\t";
			}

			return html;
		}
	}, {
		key: "getHtml",
		value: function getHtml() {
			this.htmlBeauty = "<div class=\"select-beauty\" data-instance=\"" + this.el + "\">\n\t\t\t<button class=\"button-sb button-sb-block\">" + this.placeholder + "</button>\n\t\t\t<ul class=\"hide\">\n\t\t\t\t" + this.htmlData() + "\n\t\t\t</ul>\n\t\t</div>";
		}
	}, {
		key: "toggleListener",
		value: function toggleListener() {
			var _this = this;
			$(document).click(function (ev) {
				var el = $('[data-instance="' + _this.el + '"] ul');
				el.addClass('hide');
			});

			$('[data-instance="' + this.el + '"] ul').click(function (ev) {
				ev.stopPropagation();
			});
		}
	}, {
		key: "buttonListener",
		value: function buttonListener() {
			$(document).find('[data-instance="' + this.el + '"]').on('click', 'button', function (ev) {
				ev.preventDefault();
				ev.stopPropagation();
				$(this).next('ul').toggleClass('hide');
			});
		}
	}, {
		key: "selectListener",
		value: function selectListener() {
			var _this = this;
			$(document).find('[data-instance="' + this.el + '"] ul').on('click', 'a', function (ev) {
				ev.stopPropagation();
				ev.preventDefault();
				var el = $(this);
				var id = el.attr('data-value');
				var parent = el.parent();

				if (parent.hasClass('active')) {
					delete _this.selected[id];
					parent.removeClass('active');
				} else {
					if (_this.max && _this.countObject(_this.selected) >= _this.max) return false;
					_this.selected[id] = _this.tempData[id];
					parent.addClass('active');
				}
				_this.filter();
			});
		}
	}, {
		key: "countObject",
		value: function countObject(obj) {
			return Object.keys(obj).length;
		}
	}, {
		key: "filter",
		value: function filter() {
			var arr = [];
			var btnText = [];
			var btnElement = $('[data-instance="' + this.el + '"] button');

			for (name in this.selected) {
				arr.push(name);
				btnText.push(this.selected[name].text);
			}

			$(this.el).val(arr);

			if (btnText.length < 1) {
				btnElement.text(this.placeholder);
			} else if (btnText.length > this.length) {
				btnElement.text("(" + btnText.length + ") Selected");
			} else {
				btnElement.text(btnText.join(', '));
			}
		}
	}, {
		key: "reload",
		value: function reload() {
			this.selected = {};
			this.tempData = {};
			$(this.el).val([]);
			this.getTemporaryData();
			$(document).find('[data-instance="' + this.el + '"] ul').html('');
			$(document).find('[data-instance="' + this.el + '"] ul').html(this.htmlData());
		}
	}]);

	return SelectBeauty;
}();