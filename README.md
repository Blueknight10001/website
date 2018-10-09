# web.lab splash page generator

## table of contents

- [getting started](#getting-started)
- [building and running](#building-and-running)
- [deploying code](#deploying-code)
- [directory structure](#directory-structure)
- [google calendar config](#google-calendar-config)
- [editing content](#editing-content)
  - [index](#index)

## getting started

download all dependencies including dev

```
$ npm install
```

## building and running

```
$ gulp stream
```

view at `localhost:8080`

## deploying code

to generate static code, and set up on athena locker

clone the repo anywhere, and then:

```
$ gulp
$ ln -s $PWD/build /path/to/serve/to
```

## directory structure

on the top level, code is separated as either source (`src`), built html files based on source (`build`), scripts for generating dynamic content (`scripts`), and config files such as `gulpfile.js`.

in `src`, files are separated as such:

```
src/
  ├── public/
  |   ├── fonts/
  |   └── img/
  ├── scss/
  |   ├── components/
  |   └── pages/
  ├── views/
  |   ├── components/
  |   └── content/
  └── favicon.ico
```

- `public/` contains fonts, images, and frontend javascript
- `scss/` contains styling files modularized into directories by the `page/` they style or by the `components/` they style
  - `_base.scss` overwrites some of the basic html tag styles such as `h1`
  - `_theme.scss` contains font imports and declares variables for theme colors, i.e. `$primary-accent: #396dff;`
  - `main.scss` imports all the style sheets
- `views/` contains pug files for all the files. files at the base of `views/` are separated by page.
  - `content/` holds supporting pug files with content for their corresponding page. `content/articles/` contains markdown articles imported into content.
  - `components/` contains supporting pug files such as the `navbar.pug` and the template `layout.pug`

## website config
the website should be maintainable with minimal modification to the actual code.
most important values are specified in the `config` directory

## google calendar config

all events in our calendar must follow this format in the description:

for lectures, the first line should be the name of the lecturer.

specify type as follows (lec by default):

```
type: lec
type: oh
type: event
type: milestone
type: block
```

links can be provided as follows:

```
slides 1: link_to_pdf
slides 2: link_to_pdf
youtube: link_to_youtube
info: link_to_something_else
```

if no type is explicitly provided, the website will infer based on the title (e.g. contains 'lunch', 'milestone', 'office hours')

to make an event with an instantaneous time (e.g. milestone due at 11:59am), set the calendar entry to start and end at the same time (e.g. 11:59am - 11:59am)

## editing content

content files for editing are all contained in `src/views/content/`. you do not need to touch any of the pug files at the top level of `src/views/`. you will be updating the content of the mixins in these files. this section is split up into pages and what can be updated/how to update components on each page.

### index (`src/views/content/index.pug`)

content on the homepage

- **welcome_blurb()** contains the description below "welcome to web.lab". `</br>` tags are needed to specifically separate into
- **join_mailing_list** is the button below the welcome description. as of 2018, it links to a google form
- **carasol_feature()** is no longer used. it has been replaced by the graphic on the right of the welcome blurb
- **feature_projects(num)** populates the "what people think" section. update the features array to change feature images, quotes, and text
- **thank_sponsor_subtitle()** is the text below the header "thanks to our sponsors"
- **sponsors()** can be updated by adding objects to the array `sponsors`. each array should be formatted as such `{name: "", path: "TO/IMG.png", link: "http://", level: ""}`.
