
class ExtendsPlugin {
  constructor(PerfectSchema) {
    this.PerfectSchema = PerfectSchema;
    this._normalizeField = PerfectSchema._normalizeField;
  }

  preInit(schema, fields, options) {
    if ('extends' in options) {
      if (!(options.extends instanceof this.PerfectSchema)) {
        throw new TypeError('Extends argument must be a valid schema');
      }

      const baseFields = options.extends.fields;

      for (const fieldName of Object.keys(fields)) {
        const field = this._normalizeField(fields[fieldName]);

        if (fieldName in baseFields) {
          const { type, ...baseField } = baseFields[fieldName];

          if (field.type.$$type !== type.$$type) {
            throw new TypeError('Mismatch field types for ' + fieldName);
          }

          fields[fieldName] = Object.assign(baseField, field);
        }
      }
    }
  }
}

export default PerfectSchema => new ExtendsPlugin(PerfectSchema);
