import _ from 'lodash';
import validator from 'validator';

type ISchema = {
  [key: string]: [ITest];
};

type ITestResult = {
  result: boolean;
  message: string;
};

type ITestFunction = (value: string, data: IData) => boolean | ITestResult;

type ITest = {
  test: ValidatorJS.ValidatorStatic | ITestFunction;
  message: string;
};

export type IErrors = {
  [key: string]: string;
};

type IData = {
  [key: string]: any;
};

export default class Validator {
  private readonly schema: ISchema;
  constructor(schema: ISchema) {
    this.schema = schema;
  }

  async validate(data: IData) {
    const errors: IErrors = {};
    const keys = _.keys(this.schema);
    for (let i = 0; i < keys.length; i++) {
      const testResults = [];
      for (let t = 0; t < this.schema[keys[i]].length; t++) {
        const testResult = await this.test(
          this.schema[keys[i]][t].test as ITestFunction,
          data[keys[i]],
          data,
        );
        if (!testResult || (_.isObject(testResult) && !testResult.result)) {
          testResults.push(
            _.isObject(testResult) && testResult.message
              ? testResult.message
              : this.schema[keys[i]][t].message,
          );
        }
      }
      if (testResults.length) {
        errors[keys[i]] = testResults[0];
      }
    }
    return errors;
  }

  async test(
    test: ITestFunction,
    value: any,
    data: IData,
  ): Promise<ITestResult | boolean> {
    if (_.isFunction(test)) {
      const result = await test(value, data);
      return result;
    }

    type IValidatorTest=(input: any)=>boolean | ITestResult
   
    return (validator[test] as IValidatorTest)(value);
  }
}
