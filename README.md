# Perfect Schema - Extends Plugin

Extends PerfectSchema instances with other schemas.


## Install

```
npm i -S @perfect-schema/extends
```

## Usage

```js
import PerfectSchema from '@perfect-schema/base';
import extendsPlugin from '@perfect-schema/extends';


PerfectSchema.use(extendsPlugin);


const baseSchema = new PerfectSchema({
  foo: String,
  bar: Boolean
});


const schema = new PerfectSchema({
  foo: {
    type: String,
    minLength: 10,
    maxLength: 20
  }
}, {
  extends: baseSchema
});

schema.fieldNames;
// => ['foo', 'bar']
```

## Documentation

* [Perfect Schema Documentation](https://perfect-schema.github.io/perfect-schema/)


## license

MIT
