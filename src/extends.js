
const ignoredFieldProperties = ['validator'];

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

      const baseFieldNames = options.extends.fieldNames
      const baseFields = options.extends.fields;

      for (const fieldName of baseFieldNames) {
        const baseField = baseFields[fieldName];

        const field = fieldName in fields ? this._normalizeField( fields[fieldName] ) : { type: baseField.type };

        if (baseField.type.$$type !== field.type.$$type) {
          throw new TypeError('Mismatch field types for ' + fieldName);
        }

        if (Object.isExtensible(field)) {
          for (const key of Object.keys(baseField)) {
            if (!ignoredFieldProperties.includes(key) && (!(key in field) || !Object.isFrozen(field[key]))) {
              field[key] = baseField[key];
            }
          }
        }

        fields[fieldName] = field;
      }
    }
  }
}

export default PerfectSchema => new ExtendsPlugin(PerfectSchema);
