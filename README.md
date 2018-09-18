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
<script src="assets/select-beauty/dist/js/select-beauty.stable.min.js"></script>
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

#### Other Functions
Using ``select-beauty`` package, we have some function to make more easy for using this script

| Functions        | Description           |
|:-------------:|-------------|
| ``instanceName.reload()`` | This can use for reloading the beauty-select |
| ``instanceName.getTemporaryData()`` | For creating new temporary data from select option. And use the ``instanceName.tempData`` to get the temporary data as object |
| ``instanceName.selected`` | Will return value of the select option as array |

#### Demo
![Select Beauty](https://s1.postimg.cc/8335nuz27j/Screenshot_from_2017-10-26_09-52-51.png "Demo of Select Beauty")
