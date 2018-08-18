
class ExtendsPlugin {
  constructor(PerfectSchema) {
    this.PerfectSchema = PerfectSchema;
    this._normalizeField = PerfectSchema._normalizeField;
  }

  preInit(schema, fields, options) {
    if (options.extends) {
      if (!(options.extends instanceof this.PerfectSchema)) {
        throw new TypeError('Extends argument must be a valid schema');
      }

      const baseFields = options.extends.fields || {};

      for (const fieldName of Object.keys(fields)) {
        let field = this._normalizeField( fields[fieldName] );
        let baseField = baseFields[fieldName];

        if (field.type.$$type !== baseField.type.$$type) {
          throw new TypeError('Mismatch field types for ' + fieldName);
        }

        fields[fieldName] = Object.assign(baseFields[fieldName] || {}, fields[fieldName]);
      }
    }
  }
}

export default PerfectSchema => new ExtendsPlugin(PerfectSchema);
