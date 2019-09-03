---
title: Table of Contents
icon: fas fa-list
menu: Features
order: 8
---

## Table of Contents (TOC)

This theme automatically adds a table of contents (TOC) to the right side of each page.


## Based on Headings

The TOC is generated off of the page's headings.


### Multiple Levels

The TOC nests sections based on the heading sizes.

Supported headings are H2 through H6.

The H1 heading is reserved for page titles only and is not to be used in page contents.

Nested headings must be only one level below the parent heading. For example, it is not valid to have an H5 heading under an H3 heading.


#### Example

The following headings demonstrate the nesting of all levels.

```markdown
## H2 Heading

Content under an H2 Heading


### H3 Heading

Content under an H3 Heading


#### H4 Heading

Content under an H4 Heading


##### H5 Heading

Content under an H5 Heading


###### H6 Heading

Content under an H6 Heading
```

This content renders as:


## H2 Heading

Content under an H2 Heading


### H3 Heading

Content under an H3 Heading


#### H4 Heading

Content under an H4 Heading


##### H5 Heading

Content under an H5 Heading


###### H6 Heading

Content under an H6 Heading


## sroll_past_content

There is an option in `_config.yml` called `sroll_past_content`.

If this setting is enabled, a spacer is added to the end of the page's content, which allows the page to scroll all the way past content. This helps with links to anchors near the bottom of the page.

Since the option is disabled by default. This page has some hard-coded whitespace to allow it to scroll.

```























































```
