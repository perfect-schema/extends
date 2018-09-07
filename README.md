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
  foo: String
});


const schema = new PerfectSchema({
  foo: {
    type: String,
    min: 10,
    max: 20
  }
}, {
  extends: baseSchema
});
```

## Documentation

* [Perfect Schema Documentation](https://perfect-schema.github.io/perfect-schema/)


## license

MIT
