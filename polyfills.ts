import "core-js/modules/es.symbol.async-iterator";
import "text-encoding-polyfill";
import "react-native-get-random-values";

if (typeof DOMException === 'undefined') {
  class DOMException extends Error {
    constructor(message?: string, name = 'Error') {
      super(message);
      this.name = name;
    }
  };
  global.DOMException = DOMException as unknown as typeof global.DOMException
}