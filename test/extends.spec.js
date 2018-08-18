import PerfectSchema from '@perfect-schema/base';


describe('Testing extends plugin', () => {

  it('should extend schema', () => {
    const baseSchema = new PerfectSchema({
      foo: String
    });
    const schema = new PerfectSchema({
      foo: {

      }
    })


  });


});
