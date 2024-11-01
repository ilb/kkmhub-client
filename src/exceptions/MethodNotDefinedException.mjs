export default class MethodNotDefinedException extends Error {
  constructor(methodName, className) {
    super(`Method ${methodName} is not defined in ${className}.`);
  }
}
