import _ from 'lodash';
import validator from 'validator';

type Schema = {
  [key: string]: [Test]
}
type TestResult = {
  result: boolean,
  message: string
}

type TestFunction = (value: string, data: Data) => boolean | TestResult

type Test = {
  test: ValidatorJS.ValidatorStatic | TestFunction
  message: string
}

export type Errors = {
  [key: string]: string
}

type Data = {
  [key: string]: any
}

export default class Validator {
  private readonly schema: Schema;
  constructor (schema: Schema) {
    this.schema = schema
  }

  async validate (data: Data) {
    const errors:Errors = {};
    const keys = _.keys(this.schema);
    for (let i = 0; i < keys.length; i++) {
      const testResults = [];
      for (let t = 0; t < this.schema[keys[i]].length; t++) {
        const testResult = await this.test(<TestFunction>this.schema[keys[i]][t].test, data[keys[i]], data);
        if (!testResult || (_.isObject(testResult) && !testResult.result)) {
          testResults.push(_.isObject(testResult) && testResult.message ? testResult.message : this.schema[keys[i]][t].message)
        }
      }
      if (testResults.length) {
        errors[keys[i]] = testResults[0]
      }
    }
    return errors
  }

  async test (test: TestFunction, value: any, data: Data):Promise<TestResult | boolean> {
    if (_.isFunction(test)) {
      const result = await test(value, data);
      return result
    }

    // @ts-ignore
    return validator[test](value)
  }
}
