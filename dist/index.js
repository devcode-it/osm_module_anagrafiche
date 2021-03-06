import { Model, RecordsPage } from '../../../index.js';

class Azienda extends Model {
  static jsonApiType = "anagrafiche-aziende";
  static relationships = ["anagrafica"];
  denominazione;
  partitaIva;
  codiceDestinatario;
  anagrafica() {
    return this.hasOne(Anagrafica, "anagrafica");
  }
  getAnagrafiche() {
    return this.getRelation("anagrafica");
  }
}

class Privato extends Model {
  static jsonApiType = "anagrafiche-privati";
  static relationships = ["anagrafica"];
  nome;
  cognome;
  codiceFiscale;
  anagrafica() {
    return this.hasOne(Anagrafica, "anagrafica");
  }
  getAnagrafiche() {
    return this.getRelation("anagrafica");
  }
  get denominazione() {
    let s = this.nome;
    if (this.cognome) {
      s += ` ${this.cognome}`;
    }
    return s;
  }
  set denominazione(value) {
    [this.nome, this.cognome] = value.split(" ");
    this.setAttributes({ nome: this.nome, cognome: this.cognome });
  }
}

class Anagrafica extends Model {
  static jsonApiType = "anagrafiche";
  tipo;
  tipologia;
  indirizzo;
  cap;
  citta;
  provincia;
  nazione;
  telefono;
  cellulare;
  email;
  pec;
  sitoWeb;
  static relationships = ["privato", "azienda"];
  getIstanza() {
    return this.getPrivato() ?? this.getAzienda();
  }
  privato() {
    return this.hasOne(Privato);
  }
  getPrivato() {
    return this.getRelation("privato");
  }
  azienda() {
    return this.hasOne(Azienda);
  }
  getAzienda() {
    return this.getRelation("azienda");
  }
  get denominazione() {
    return this.getIstanza().denominazione;
  }
  set denominazione(value) {
    this.getIstanza().denominazione = value;
  }
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

var freeGlobal$1 = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal$1 || freeSelf || Function('return this')();

var root$1 = root;

/** Built-in value references. */
var Symbol$1 = root$1.Symbol;

var Symbol$2 = Symbol$1;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray$1 = isArray;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$2 ? Symbol$2.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray$1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

/** Used to compose unicode character classes. */
var rsAstralRange$1 = '\\ud800-\\udfff',
    rsComboMarksRange$1 = '\\u0300-\\u036f',
    reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
    rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
    rsVarRange$1 = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ$1 = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ$1 + rsAstralRange$1  + rsComboRange$1 + rsVarRange$1 + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);

    var strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst = createCaseFirst('toUpperCase');

var upperFirst$1 = upperFirst;

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */
function capitalize(string) {
  return upperFirst$1(toString(string).toLowerCase());
}

class Records extends RecordsPage {
  title = __("Anagrafiche");
  columns = {
    denominazione: __("Ragione sociale"),
    tipo: {
      title: __("Tipo"),
      valueModifier: (value) => capitalize(value)
    },
    tipologia: {
      title: __("Tipologia"),
      valueModifier: (value) => capitalize(value)
    },
    citta: __("Citt\xE0"),
    telefono: __("Telefono")
  };
  sections = {
    generali: {
      heading: __("Dati anagrafici"),
      fields: {
        tipologia: {
          label: __("Tipologia"),
          type: "select",
          options: [
            {
              label: __("Privato"),
              value: "PRIVATO"
            },
            {
              label: __("Azienda"),
              value: "AZIENDA"
            }
          ],
          required: true
        },
        tipo: {
          label: __("Tipo"),
          type: "select",
          options: [
            {
              label: __("Fornitore"),
              value: "FORNITORE"
            },
            {
              label: __("Cliente"),
              value: "CLIENTE"
            }
          ],
          required: true
        },
        "azienda:denominazione": {
          label: __("Denominazione"),
          type: "text"
        },
        "privato:nome": {
          label: __("Nome"),
          type: "text"
        },
        "privato:cognome": {
          label: __("Cognome"),
          type: "text"
        }
      }
    },
    recapiti: {
      heading: __("Dati di recapito"),
      fields: {
        indirizzo: {
          label: __("Indirizzo"),
          type: "text",
          icon: "map-marker-outline"
        },
        cap: {
          label: __("CAP"),
          type: "text"
        },
        citta: {
          label: __("Citt\xE0"),
          type: "text",
          icon: "city-variant-outline"
        },
        provincia: {
          label: __("Provincia"),
          type: "text"
        },
        nazione: {
          label: __("Nazione"),
          type: "select",
          options: this.page.props.nazioni,
          icon: "flag-variant-outline"
        },
        telefono: {
          label: __("Telefono"),
          type: "tel",
          icon: "phone-classic"
        },
        cellulare: {
          label: __("Cellulare"),
          type: "tel",
          icon: "cellphone"
        },
        email: {
          label: __("Email"),
          type: "email",
          icon: "email-outline"
        },
        pec: {
          label: __("PEC"),
          type: "email",
          icon: "email-seal-outline"
        },
        sitoWeb: {
          label: __("Sito web"),
          type: "url",
          icon: "web"
        }
      }
    },
    datiAzienda: {
      heading: __("Dati azienda"),
      fields: {
        "azienda:partitaIva": {
          label: __("Partita IVA"),
          type: "text",
          disabled: true
        },
        "azienda:codiceDestinatario": {
          label: __("Codice destinatario"),
          type: "text",
          disabled: true,
          maxLength: 7,
          minLength: 7
        }
      }
    },
    datiPrivato: {
      heading: __("Dati privato"),
      fields: {
        "privato:codiceFiscale": {
          label: __("Codice fiscale"),
          type: "text",
          disabled: true
        }
      }
    }
  };
  model = Anagrafica;
  relationsToDelete = ["privato", "azienda"];
  oncreate(vnode) {
    super.oncreate(vnode);
    $("material-select#tipologia").on("selected", (event) => {
      const tipologia = $(event.target);
      const azienda = $("#datiAzienda [data-default-value], #azienda\\:denominazione");
      const privato = $("#datiPrivato [data-default-value], #privato\\:nome, #privato\\:cognome");
      if (tipologia.val() === "AZIENDA") {
        azienda.prop("disabled", false).prop("required", true);
        privato.prop("disabled", true).prop("required", false);
      } else {
        azienda.prop("disabled", true).prop("required", false);
        privato.prop("disabled", false).prop("required", true);
      }
    });
  }
  async loadRelations(model, data) {
    const relations = await super.loadRelations(model, data);
    delete relations[data.get("tipologia") === "AZIENDA" ? "privato" : "azienda"];
    return relations;
  }
  openNewRecordDialog(form, dialog) {
    super.openNewRecordDialog(form, dialog);
    form.find("#datiAzienda, #datiPrivato").find("[data-default-value]").prop("disabled", true);
    form.find("#privato\\:nome, #privato\\:cognome, #azienda\\:denominazione").prop("disabled", true);
  }
  async setter(model, data) {
    const tipologia = data.get("tipologia") === "AZIENDA" ? "privato" : "azienda";
    return super.setter(model, data.filter((item, key) => !key.startsWith(`${tipologia}:`)));
  }
}

export { Anagrafica, Azienda, Privato, Records };
