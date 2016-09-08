# bit-docs-html-toc

A table of contents for use with [bit-docs-generate-html](https://github.com/bit-docs/bit-docs-generate-html).

![toc](https://cloud.githubusercontent.com/assets/361671/18181878/6dd11318-705b-11e6-88e1-133c355742c9.gif)

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
