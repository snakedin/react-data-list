# React DataList

React DataList is a lightweight, fast and fully customized component for creating data tables with sorting, filtering and paging support. An excellent choice for the admin centers or the control panels.

![](https://raw.githubusercontent.com/snakedin/react-data-list/master/examples/screen.png)

## Installing

~~~
npm install @snakedin/react-data-list
~~~

#### Usage without Bootstrap

By default, DataList uses [Bootstrap](https://getbootstrap.com/) styles to show tables. If you want to use DataList without Bootstrap, you need to import an additional file with styles:
~~~
import '@snakedin/react-data-list/dist/themes/without-bootstrap.css';
~~~

## Demo examples

* [Features demo](https://react-data-list.herokuapp.com/demo/)
* [Static data](https://react-data-list.herokuapp.com/static/)
* [Paging and sorting](https://react-data-list.herokuapp.com/paging/)
* [FetchProvider helper](https://react-data-list.herokuapp.com/provider/)
* [Advanced filtering](https://react-data-list.herokuapp.com/filtering/)
* [ReactRouter helper](https://react-data-list.herokuapp.com/router/?page=2&pageSize=10&sortBy=-averageRating&filter={%22categories%22%3A%22fantasy%22%2C%22ageRating%22%3A%22R%22})
* [Custom filters](https://react-data-list.herokuapp.com/custom/)

## API Reference

#### DataList

|Prop name|Type|Description|Default value|
|----|----|----|----|
|classNameHead|String|Table head (`<thead>`) class name|`"thead-light"`|
|classNamePager|String|Page list (`<ul>`) class name|`"pagination mb-0 justify-content-center justify-content-lg-start"`|
|classNameRow|String|Table content rows (`<tr>`) class name|`""`|
|classNameTable|String|Table (`<table>`) class name|`"table table-striped table-hover table-bordered"`|
|defaultFilter|Object|Initial filter values (`name: value`)|`{}`|
|defaultPager|Object|Initial pager and sort by values|`{ page: 1, pageSize: 10, sortBy: ''}`|
|enableSorting|Boolean|To disable sorting for all columns, set this param to `false`|`true`|
|extractId|Function|This function can be used to extract each row unique key.<br/><br/>By default component will use the `id` key.|`(item) => item.id`|
|locale|Object|Object with localized interface elements.|`{}`|
|onError|Function|This function can be used to override the default errors handler.||
|onParamsChanged|Function|This function can be used to override the default params changing behaviour.||
|pageShowMax|Number|Specifies the maximum number of pages to be displayed in the page bar.|`10`|
|pageSizes|Array of numbers|An array of allowed page sizes. Also it will be used in switch page sizes dropdown list.|`[10, 20, 30]`|
|provider|Function, Array|**Required**. The data provider for the view. It can be an array of objects, an async function, or an instance of the special `FetchProvider` helper class.||
|renderError|Function|This function can be used to override the default error message.||
|renderLoading|Function|This function can be used to override the default loading indicator.||
|renderPageBar|Function|This function can be used to change page bar render.||
|renderPageSummary|Function|This function can be used to change page summary text.||
|renderTemplate|Function|A function that receives `table` and `pageBar` arguments and is used to determine the order of displaying component's parts.<br/><br/> For example, you can show page bar above the table or show two page bars above and below the table.||
|showFilter|Boolean|Whether the filter row should be shown.|`true`|
|showPageBar|Boolean|Whether the page bar should be shown.|`true`|
|showPageNext|Boolean|Whether the "Next page" button should be shown.|`true`|
|showPagePrevious|Boolean|Whether the "Previous page" button should be shown.|`true`|

#### Column

|Prop name|Type|Description|Default value|
|----|----|----|----|
|contentAttributes|Object|The HTML attributes for the content cell td.||
|headerAttributes|Object|The HTML attributes for the head cell td.||
|id|String|**Required**. The unique ID for the column.||
|filter|Object, Function, Boolean|If `true` is passed, text input will be used for filtering.<br/>If `false` is passed, filtering will be disabled for this column.<br/>If `object` is passed, this object should contain `type` field (`text`, `select`, `react-select` or `date`).<br/>You can use your own filters by passing a function in this property.|`true`|
|label|String|Label to be displayed in the header cell. If this property is not set, `id` of the column will be used.||
|sort|String, Boolean|If `true` is passed, column's `id` will be used for sorting.<br/>If `string` is passed, this string will be used for sorting. <br/>If `false` is passed, sorting will be disabled for this column.|`true`|
|value|Function|By default, `item[Column's ID]` will be used to display in the cell.<br/><br/>This function can be used to change the rendered value in the cell.||

## Development

If you want to experiment with examples in your local environment:
~~~
$ git clone https://github.com/snakedin/react-data-list.git .
$ npm install 
$ npm start
~~~