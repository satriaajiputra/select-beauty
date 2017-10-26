# select-beauty
JQuery Select Package for Make Select Option more Beauty

# Quick Setup
Easy to use this package, first for all you have this plugin script and JQuery. After that insert all assets to your code

#### Style
```html
<link rel="stylesheet" href="assets/select-beauty/dist/css/select-beauty.css">
```
#### JavaScript
```html
<script src="assets/select-beauty/dist/js/jquery.min.js"></script>
<script src="assets/select-beauty/dist/js/select-beauty.js"></script>
```

#### Example Select
```html
<select name="work-condition" id="work-condition" class="form-control">
  <option value="1" icon="iw-way">Remote Location</option>
  <option value="2" icon="iw-crane">Work From Height</option>
  <option value="3" icon="iw-scope">Field Visit</option>
  <option value="4" icon="iw-excavator">Active Machinery</option>
</select>
```

#### Initiate Script
```javascript
var beauty = new SelectBeauty({
  el: '#work-condition', // element with only id selector
  placeholder: 'Select Something...', // placeholder for button
  length: 5, // max length to show the selected items
  max: 10 // max length to select the item
});
```

