/*================================================
=            Javascript Select Beauty            =
================================================*/

/**

	Author: Satria AJi Putra
	Created At: 25/10/17

 */


class SelectBeauty {
	constructor(data)
	{
		this.el = data.el;
		this.placeholder = (typeof data.placeholder !== "undefined") ? data.placeholder : "Select Something";
		this.length = (typeof data.length !== "undefined") ? data.length : 3;
		this.max = (typeof data.max !== "undefined") ? data.max : false;
		this.initSelected = (typeof data.selected !== "undefined") ? data.selected : [];
		this.selected = {};
		this.tempData = {};
		this.getTemporaryData();
		this.getHtml();
		this.hideSelect();
		this.renderView();
		this.buttonListener();
		this.toggleListener();
		this.selectListener();
		this.filter();
	}

	// get data from select
	getTemporaryData()
	{
		let _this = this;

		$.each($(this.el).children(), function(i, r) {
			let el = $(r);
			let value = el.attr('value');
			let data = {
				text: el.text(),
				icon: el.attr('icon')
			}

			_this.tempData[value] = data;
			
			// check if the initSelected is not empty
			if(_this.initSelected.length > 0) {
				// if the value is in array of initSelected
				if(_this.inArray(_this.initSelected, value)) {
					// if so, add to the selected property
					_this.selected[value] = _this.tempData[value];
				}
			}
		});
	}

	// check if a value is in array
	inArray(array, find)
	{
		return array.findIndex(function(value) {
			return value == find
		}) > -1 ? true : false;
	}

	// hide select with add attribute multiple
	hideSelect()
	{
		$(this.el).hide();
		$(this.el).attr('multiple', true);
	}

	renderView()
	{
		$(this.el).parent().append(this.htmlBeauty);
	}

	htmlData()
	{
		let html = '';

		for(name in this.tempData) {

			// check if the element is active or not while rendering the html
			let active = this.inArray(this.initSelected, name) ? 'active' : '';

			html += `
				<li class="${active}">
					<a href="#" data-value="${name}"><i class="iw ${this.tempData[name].icon}"></i> ${this.tempData[name].text}</a>
				</li>
			`;
		}

		return html;
	}

	getHtml()
	{
		this.htmlBeauty = `<div class="select-beauty" data-instance="${this.el}">
			<button class="button-sb button-sb-block">${this.placeholder}</button>
			<ul class="hide">
				${this.htmlData()}
			</ul>
		</div>`;
	}

	toggleListener()
	{
		let _this = this;
		$(document).click(function(ev) {
			let el = $('[data-instance="'+_this.el+'"] ul');
			el.addClass('hide');
		});

		$('[data-instance="'+this.el+'"] ul').click(function(ev) {
			ev.stopPropagation();
		});
	}

	buttonListener()
	{
		$(document).find('[data-instance="'+this.el+'"]').on('click', 'button', function(ev) {
			ev.preventDefault();
			ev.stopPropagation();
			$(this).next('ul').toggleClass('hide');
		});
	}

	selectListener()
	{
		let _this = this;
		$(document).find('[data-instance="'+this.el+'"] ul').on('click', 'a', function(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			let el = $(this);
			let id = el.attr('data-value');
			let parent = el.parent();

			if(parent.hasClass('active')) {
				delete _this.selected[id];
				parent.removeClass('active');
			} else {
				if(_this.max && _this.countObject(_this.selected) >= _this.max) return false;
				_this.selected[id] = _this.tempData[id];
				parent.addClass('active');
			}
			_this.filter();
		});
	}

	countObject(obj)
	{
		return Object.keys(obj).length;
	}

	filter()
	{
		let arr = [];
		let btnText = [];
		let btnElement = $('[data-instance="'+this.el+'"] button');

		for(name in this.selected) {
			arr.push(name);
			btnText.push(this.selected[name].text);
		}
		
		$(this.el).val(arr);

		if(btnText.length < 1) {
			btnElement.text(this.placeholder);
		} else if(btnText.length > this.length) {
			btnElement.text("("+btnText.length+") Selected");
		} else {
			btnElement.text(btnText.join(', '));
		}
	}

	reload()
	{
		this.selected = {};
		this.tempData = {};
		$(this.el).val([]);
		this.getTemporaryData();
		$(document).find('[data-instance="'+this.el+'"] ul').html('');
		$(document).find('[data-instance="'+this.el+'"] ul').html(this.htmlData());
	}
}