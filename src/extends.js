
class ExtendsPlugin {
  constructor(PerfectSchema) {
    this.PerfectSchema = PerfectSchema;
    //this._normalizeField = PerfectSchema._normalizeField;
  }

  preInit(schema, fields, options) {
    if ('extends' in options) {
      if (!(options.extends instanceof this.PerfectSchema)) {
        throw new TypeError('Extends argument must be a valid schema');
      }

      const baseFields = options.extends.fields;

      for (const fieldName of Object.keys(baseFields)) {
        const baseField = baseFields[fieldName];

        if (fieldName in fields) {
          const field = fields[fieldName];

          if (baseField.type.$$type !== field.type.$$type) {
            throw new TypeError('Mismatch field types for ' + fieldName);
          }

          if (Object.isExtensible(field)) {
            for (const key of Object.keys(baseField)) {
              if (!(key in field) || !Object.isFrozen(field[key])) {
                field[key] = baseField[key];
              }
            }
          }
        } else {
          fields[fieldName] = baseField;
        }

      }
    }
  }
}

export default PerfectSchema => new ExtendsPlugin(PerfectSchema);
