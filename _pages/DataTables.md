---
title: DataTables
icon: fas fa-table
menu: Features
order: 3
---

## Automatic DataTables

[DataTables](https://datatables.net/) are automatically built when a markdown table is preceded by a special `<script>` tag.


## Available Features

DataTables supports many features and plugins. The build included with this theme has a [highly-opinionated subset of those features](https://datatables.net/download/#bs4/jszip-2.5.0/pdfmake-0.1.36/dt-1.10.18/b-1.5.6/b-colvis-1.5.6/b-html5-1.5.6/r-2.2.2). Basically, what I thought was most useful, and nothing more.

The features include:

* Styling framework
  * Bootstrap 4 style
* Packages
  * DataTables
* Extensions
  * Buttons
    * Column visibility
    * HTML5 export
      * JSZip
      * pdfmake
  * Responsive


## Usage


### Basic Usage

To create a DataTable:

1. First create a regular [Markdown table](https://help.github.com/en/articles/organizing-information-with-tables).
2. Then, precede the table with a custom `<script>` tag:
   ```html
   <script type="text/x-datatable"></script>
   ```
   * This tells the theme to render the next table as a DataTable.

_**Note:** There must be nothing between the `<script>` element and the table for the DataTable to be created._


#### Example

```markdown
<script type="text/x-datatable"></script>

| Item ID | Item Name | Price | Quantity |
| ------- | --------- | ----: | :------: |
| 1 | Tire | $45.00 | 4 |
| 2 | Engine | $2,000.00 | 1 |
| 3 | Seat | $300.00 | 2 |
| 4 | Door | $300.00 | 2 |
| 5 | Transmission | $1,500.00 | 1 |
| 6 | Radio | $45.00 | 1 |
```

This will render as:

<script type="text/x-datatable"></script>

| Item ID | Item Name | Price | Quantity |
| ------- | --------- | ----: | :------: |
| 1 | Tire | $45.00 | 4 |
| 2 | Engine | $2,000.00 | 1 |
| 3 | Seat | $300.00 | 2 |
| 4 | Door | $300.00 | 2 |
| 5 | Transmission | $1,500.00 | 1 |
| 6 | Radio | $45.00 | 1 |


### Advanced Usage

To have greater control over the table, you can specify an [options object](https://datatables.net/manual/options) inside the `<script>` tag.


#### Example


```markdown
<script type="text/x-datatable">
  {
    "order": [[ 2, "desc" ], [ 1, "asc" ], [ 0, "asc" ]],
    "columnDefs": [
      { "responsivePriority": 3, "targets": 0 },
      { "responsivePriority": 1, "targets": 1 },
      { "responsivePriority": 2, "targets": 2 },
      { "responsivePriority": 4, "targets": 3, "visible": false }
    ]
  }
</script>

| Item ID | Item Name | Price | Quantity |
| ------- | --------- | ----: | :------: |
| 1 | Tire | $45.00 | 4 |
| 2 | Engine | $2,000.00 | 1 |
| 3 | Seat | $300.00 | 2 |
| 4 | Door | $300.00 | 2 |
| 5 | Transmission | $1,500.00 | 1 |
| 6 | Radio | $45.00 | 1 |

```

This will render as:

<script type="text/x-datatable">{
  "order": [[ 2, "desc" ], [ 1, "asc" ], [ 0, "asc" ]],
  "columnDefs": [
    { "responsivePriority": 3, "targets": 0 },
    { "responsivePriority": 1, "targets": 1 },
    { "responsivePriority": 2, "targets": 2 },
    { "responsivePriority": 4, "targets": 3, "visible": false }
  ]
}</script>

| Item ID | Item Name | Price | Quantity |
| ------- | --------- | ----: | :------: |
| 1 | Tire | $45.00 | 4 |
| 2 | Engine | $2,000.00 | 1 |
| 3 | Seat | $300.00 | 2 |
| 4 | Door | $300.00 | 2 |
| 5 | Transmission | $1,500.00 | 1 |
| 6 | Radio | $45.00 | 1 |
