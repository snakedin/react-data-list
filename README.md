# React DataList

React DataList is a lightweight, fast and fully customized component for creating data tables with sorting, filtering and paging support. An excellent choice for the admin centers or the control panels.

![](https://raw.githubusercontent.com/snakedin/react-data-list/master/examples/screen.png)

## Installing

~~~
npm install @snakedin/react-data-list
~~~

#### Usage without Bootstrap

By default, DataList uses Bootstrap styles to show tables. If you want to use DataList without Bootstrap, you need to import an additional file with styles:
~~~
import '@snakedin/react-data-list/dist/themes/without-bootstrap.css';
~~~

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
|extractId|Function|A function <br/><br/>By default component will use the `id` key.|`(item) => item.id`|
|locale|Object|-|`{}`|
|onError|Function|-||
|onParamsChanged|Function|-||
|pageShowMax|Number|-|`10`|
|pageSizes|Array of numbers|An array of allowed page sizes. Also it will be used in switch page sizes dropdown list.|`[10, 20, 30]`|
|provider|Function, Array|**Required**. The data provider for the view.||
|renderError|Function|||
|renderLoading|Function|||
|renderPageBar|Function|||
|renderPageSummary|Function|||
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
|id|String|**Required**.||
|filter|Object, Function, Boolean|-|`true`|
|label|String|Label to be displayed in the header cell. When this property is not set, the list will use the id of column.||
|sort|String, Boolean|-|`true`|
|value|Function|||
