# bit-docs-html-toc

A table of contents for use with [bit-docs-generate-html](https://github.com/bit-docs/bit-docs-generate-html).

![screen shot 2016-11-10 at 10 16 55](https://cloud.githubusercontent.com/assets/724877/20181326/830b44a2-a73c-11e6-923c-5c880164383b.png)

![screen shot 2016-11-10 at 10 15 51](https://cloud.githubusercontent.com/assets/724877/20181334/887fbbe8-a73c-11e6-929b-0ba411cdd63b.png)

![screen shot 2016-11-09 at 17 02 17](https://cloud.githubusercontent.com/assets/724877/20152767/612903ae-a69e-11e6-9fe0-6d781567fd6f.png)


## Use

To use, add bit-docs-html-toc to your bit-docs dependencies in package.json:

```json
{
  ...

  "bit-docs": {
    "dependencies": {
      "bit-docs-html-toc": "$VERSION"
    }
  }
}
```

Where `$VERSION` is the latest version on npm.

In your template add a class **on-this-page-container**:

```js
<div class="on-this-page-container"></div>
```

The table of contents will be injected into this element at run time.
