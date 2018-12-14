import assert from 'assert';
import PerfectSchema from '@perfect-schema/base';
import extendsPlugin from '../src/extends';


describe('Testing extends plugin', () => {

  const plugin = extendsPlugin(PerfectSchema);


  it('should extend schema', () => {
    const baseSchema = new PerfectSchema({
      foo: {
        type: String,
        base: true
      }
    });
    const fields = {
      foo: {
        type: String,
        extended: true
      },
      bar: {
        type: Number
      }
    };

    plugin.preInit(null, fields, { extends: baseSchema });

    assert.strictEqual( fields.foo.base, true );
    assert.strictEqual( fields.foo.extended, true );
    assert.ok( fields.bar );
  });


  it('should ignore if not extended', () => {
    const fields = {
      foo: {
        type: String,
        extended: true
      }
    };

    plugin.preInit(null, fields, {});

    assert.strictEqual( fields.foo.base, undefined );
    assert.strictEqual( fields.foo.extended, true );
  });


  it('should fail with invalid schema', () => {
    [
      undefined, null, false, true, NaN, -1, 0, 1,
      {}, [], new Date(), ()=>{}, /./, '', 'test'
    ].forEach(baseSchema => assert.throws(() => plugin.preInit(null, {}, {
      extends: baseSchema
    })));
  });


  it('should fail with mismatch types', () => {
    const baseSchema = new PerfectSchema({
      foo: {
        type: String,
        base: true
      }
    });
    const fields = {
      foo: {
        type: Number,
        extended: true
      }
    };

    assert.throws(() => plugin.preInit(null, fields, { extends: baseSchema }));

    assert.strictEqual( fields.foo.base, undefined );
    assert.strictEqual( fields.foo.extended, true );
  });

});
