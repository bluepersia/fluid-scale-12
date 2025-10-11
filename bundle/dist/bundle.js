"use strict";
var FluidScale = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // bundle/src/bundle.ts
  var bundle_exports = {};
  __export(bundle_exports, {
    getQueue: () => getQueue,
    serializeDocAssertionMaster: () => serializeDocAssertionMaster,
    serializeDocument: () => serializeDocument
  });

  // ../GoldSight/dist/utils/deepClone.js
  function deepClone(value, hash = /* @__PURE__ */ new WeakMap()) {
    if (value === null || typeof value !== "object")
      return value;
    if (hash.has(value))
      return hash.get(value);
    if (value instanceof Date)
      return new Date(value.getTime());
    if (Array.isArray(value)) {
      const arr = [];
      hash.set(value, arr);
      value.forEach((item, index) => {
        arr[index] = deepClone(item, hash);
      });
      return arr;
    }
    if (value instanceof Map) {
      const map = /* @__PURE__ */ new Map();
      hash.set(value, map);
      value.forEach((v, k) => {
        map.set(k, deepClone(v, hash));
      });
      return map;
    }
    if (value instanceof Set) {
      const set = /* @__PURE__ */ new Set();
      hash.set(value, set);
      value.forEach((v) => {
        set.add(deepClone(v, hash));
      });
      return set;
    }
    const obj = Object.create(Object.getPrototypeOf(value));
    hash.set(value, obj);
    for (const key of Object.keys(value)) {
      obj[key] = deepClone(value[key], hash);
    }
    return obj;
  }

  // ../GoldSight/dist/index.js
  var assertionQueues = {};
  var AssertionMaster = class {
    constructor(assertionChains, globalKey) {
      this.resetState = () => {
        this._state = {
          ...this.newState(),
          master: this.master,
          callStack: [],
          branchCounter: /* @__PURE__ */ new Map(),
          queueIndex: 0
        };
      };
      this.assertQueue = (options) => {
        if (!options)
          options = {};
        if (!options.errorAlgorithm)
          options.errorAlgorithm = "firstOfDeepest";
        const assertionQueue = assertionQueues[this.globalKey];
        const verifiedAssertions = /* @__PURE__ */ new Map();
        if (!this.state?.master && options?.master === void 0)
          console.error(`No master indexes set. Provide it via options.`);
        console.groupCollapsed(`\u2705 ${this.globalKey} - \u2728${options?.master ? printMaster(options.master) : printMaster(this.state?.master)}`);
        let groupedByName = {};
        for (const [, item] of assertionQueue.entries()) {
          if (!groupedByName[item.name])
            groupedByName[item.name] = [];
          groupedByName[item.name].push(item);
        }
        if (options.targetName) {
          if (groupedByName.hasOwnProperty(options.targetName))
            groupedByName = {
              [options.targetName]: groupedByName[options.targetName]
            };
        }
        const nameWithHighestIndex = Object.entries(groupedByName).map(([name, items]) => ({
          name,
          highestIndex: Math.max(...items.map((i) => i.funcIndex))
        }));
        nameWithHighestIndex.sort((a, b) => {
          return b.highestIndex - a.highestIndex;
        });
        let error;
        const errors = [];
        outer: for (const { name } of nameWithHighestIndex) {
          const items = groupedByName[name].sort((a, b) => {
            if (a.funcIndex === b.funcIndex) {
              return a.branchCount - b.branchCount;
            }
            if (options?.errorAlgorithm === "firstOfDeepest")
              return a.funcIndex - b.funcIndex;
            else
              return b.funcIndex - a.funcIndex;
          });
          for (const { state, args, result } of items) {
            const assertions = this.assertionChains[name];
            for (const [key, assertion] of Object.entries(assertions)) {
              try {
                assertion(state, args, result);
              } catch (e) {
                if (!options.showAllErrors) {
                  error = e;
                  break outer;
                }
                errors.push({ err: e, name });
              }
              let count = verifiedAssertions.get(key) || 0;
              count++;
              verifiedAssertions.set(key, count);
            }
          }
        }
        for (const [key, count] of verifiedAssertions.entries()) {
          console.log(`\u2705 ${key} - \u2728${count} times`);
        }
        console.groupEnd();
        this.reset();
        if (error)
          throw error;
        if (errors.length) {
          throw new Error(errors.map((e) => `${e.name}:${e.err.message}`).join("\n"));
        }
      };
      this.assertionChains = assertionChains;
      this._globalKey = globalKey;
      assertionQueues[globalKey] = /* @__PURE__ */ new Map();
    }
    get globalKey() {
      return this._globalKey;
    }
    set master(master) {
      this._master = master;
    }
    get master() {
      return this._master;
    }
    get state() {
      return this._state;
    }
    wrapFn(fn, name, processors) {
      return ((...args) => {
        const convertedArgs = processors?.argsConverter ? processors.argsConverter(args) : args;
        if (processors?.pre)
          processors.pre(this.state, convertedArgs);
        const parentId = this.state.callStack[this.state.callStack.length - 1] ?? -1;
        let funcIndex = parentId + 1;
        const queueIndex = this.state.queueIndex;
        this.state.queueIndex++;
        this.state.callStack.push(funcIndex);
        const branchCount = this.state.branchCounter.get(parentId) || 0;
        this.state.branchCounter.set(parentId, branchCount + 1);
        const result = fn(...args);
        this.state.callStack.pop();
        const convertedResult = processors?.resultConverter ? processors.resultConverter(result) : result;
        if (processors?.resultConverter)
          console.log(convertedResult);
        const assertionData = {
          state: this.state,
          funcIndex,
          result: processors?.skipDeepClone ? convertedResult : deepClone(convertedResult),
          name,
          branchCount,
          args: convertedArgs,
          postOp: () => {
          }
        };
        if (processors?.post) {
          assertionData.postOp = (state, args2, result2) => {
            processors.post(state, args2, result2);
          };
        }
        assertionQueues[this.globalKey].set(queueIndex, assertionData);
        return result;
      });
    }
    wrapAll() {
    }
    reset() {
      const assertionQueue = assertionQueues[this.globalKey];
      assertionQueue.clear();
    }
    setQueue(queue) {
      assertionQueues[this.globalKey] = queue;
    }
    setQueueFromArray(queue) {
      assertionQueues[this.globalKey] = new Map(queue);
    }
    runPostOps() {
      const assertionQueue = assertionQueues[this.globalKey];
      const queueIndexes = Array.from(assertionQueue.keys()).sort((a, b) => a - b);
      for (const queueIndex of queueIndexes) {
        const value = assertionQueue.get(queueIndex);
        value.state = { ...value.state };
        if (value.postOp)
          value.postOp(this.state, value.args, value.result);
      }
    }
    wrapTopFn(fn, name, options) {
      return (...args) => {
        this.resetState();
        this.setQueue(/* @__PURE__ */ new Map());
        const wrappedFn = this.wrapFn(fn, name, options);
        const result = wrappedFn(...args);
        this.state.master = this.master;
        this.runPostOps();
        return result;
      };
    }
  };
  function getQueue(globalKey) {
    if (!assertionQueues[globalKey])
      throw Error(`Assertion queue for ${globalKey} not found`);
    return assertionQueues[globalKey];
  }
  function printMaster(master) {
    if (!master)
      return "";
    if (master.index !== void 0 && master.step !== void 0)
      return `Master ${master.index}, step ${master.step}`;
    else if (master.index !== void 0)
      return `Master ${master.index}`;
    else
      return "";
  }
  var dist_default = AssertionMaster;

  // src/parsing/serialization/serializerConsts.ts
  var STYLE_RULE_TYPE = 1;
  var MEDIA_RULE_TYPE = 4;
  var FLUID_PROPERTY_NAMES = /* @__PURE__ */ new Set([
    "font-size",
    "line-height",
    "letter-spacing",
    "word-spacing",
    "text-indent",
    "width",
    "min-width",
    "max-width",
    "height",
    "min-height",
    "max-height",
    "grid-template-columns",
    "grid-template-rows",
    "background-position-x",
    "background-position-y",
    "padding",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "margin",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "border-radius",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-bottom-right-radius",
    "border-bottom-left-radius",
    "gap",
    "column-gap",
    "row-gap",
    "--fluid-bg-size",
    "top",
    "left",
    "right",
    "bottom",
    "object-position"
  ]);
  var SHORTHAND_PROPERTIES = {
    padding: /* @__PURE__ */ new Map([
      [
        1,
        /* @__PURE__ */ new Map([
          [0, ["padding-top", "padding-right", "padding-bottom", "padding-left"]]
        ])
      ],
      [
        2,
        /* @__PURE__ */ new Map([
          [0, ["padding-top", "padding-bottom"]],
          [1, ["padding-right", "padding-left"]]
        ])
      ],
      [
        3,
        /* @__PURE__ */ new Map([
          [0, ["padding-top"]],
          [1, ["padding-right", "padding-left"]],
          [2, ["padding-bottom"]]
        ])
      ],
      [
        4,
        /* @__PURE__ */ new Map([
          [0, ["padding-top"]],
          [1, ["padding-right"]],
          [2, ["padding-bottom"]],
          [3, ["padding-left"]]
        ])
      ]
    ]),
    margin: /* @__PURE__ */ new Map([
      [
        1,
        /* @__PURE__ */ new Map([
          [0, ["margin-top", "margin-right", "margin-bottom", "margin-left"]]
        ])
      ],
      [
        2,
        /* @__PURE__ */ new Map([
          [0, ["margin-top", "margin-bottom"]],
          [1, ["margin-right", "margin-left"]]
        ])
      ],
      [
        3,
        /* @__PURE__ */ new Map([
          [0, ["margin-top"]],
          [1, ["margin-right", "margin-left"]],
          [2, ["margin-bottom"]]
        ])
      ],
      [
        4,
        /* @__PURE__ */ new Map([
          [0, ["margin-top"]],
          [1, ["margin-right"]],
          [2, ["margin-bottom"]],
          [3, ["margin-left"]]
        ])
      ]
    ]),
    border: /* @__PURE__ */ new Map([
      [
        1,
        /* @__PURE__ */ new Map([
          [0, ["border-top", "border-right", "border-bottom", "border-left"]]
        ])
      ],
      [
        2,
        /* @__PURE__ */ new Map([
          [0, ["border-top", "border-bottom"]],
          [1, ["border-right", "border-left"]]
        ])
      ],
      [
        3,
        /* @__PURE__ */ new Map([
          [0, ["border-top"]],
          [1, ["border-right", "border-left"]],
          [2, ["border-bottom"]]
        ])
      ],
      [
        4,
        /* @__PURE__ */ new Map([
          [0, ["border-top"]],
          [1, ["border-right"]],
          [2, ["border-bottom"]],
          [3, ["border-left"]]
        ])
      ]
    ]),
    "border-radius": /* @__PURE__ */ new Map([
      [
        1,
        /* @__PURE__ */ new Map([
          [
            0,
            [
              "border-top-left-radius",
              "border-top-right-radius",
              "border-bottom-right-radius",
              "border-bottom-left-radius"
            ]
          ]
        ])
      ],
      [
        2,
        /* @__PURE__ */ new Map([
          [0, ["border-top-left-radius", "border-bottom-right-radius"]],
          [1, ["border-top-right-radius", "border-bottom-left-radius"]]
        ])
      ],
      [
        3,
        /* @__PURE__ */ new Map([
          [0, ["border-top-left-radius"]],
          [1, ["border-top-right-radius", "border-bottom-left-radius"]],
          [2, ["border-bottom-right-radius"]]
        ])
      ],
      [
        4,
        /* @__PURE__ */ new Map([
          [0, ["border-top-left-radius"]],
          [1, ["border-top-right-radius"]],
          [2, ["border-bottom-right-radius"]],
          [3, ["border-bottom-left-radius"]]
        ])
      ]
    ]),
    gap: /* @__PURE__ */ new Map([[1, /* @__PURE__ */ new Map([[0, ["column-gap", "row-gap"]]])]]),
    "background-position": /* @__PURE__ */ new Map([
      [2, /* @__PURE__ */ new Map([[0, ["background-position-x", "background-position-y"]]])]
    ])
  };
  var SPECIAL_PROPERTIES = /* @__PURE__ */ new Set(["lock", "force", "span-start", "span-end"]);

  // test/parsing/serialization/masterController.ts
  function clearNullsForDoc(docClone) {
    return {
      styleSheets: clearNullsForStyleSheets(docClone.styleSheets)
    };
  }
  function clearNullsForStyleSheets(styleSheets) {
    return styleSheets.map(clearNullsForStyleSheet);
  }
  function clearNullsForStyleSheet(sheet) {
    return {
      cssRules: clearNullsForRules(sheet.cssRules)
    };
  }
  function clearNullsForRules(rules) {
    return rules.map((rule) => clearNullsForRule(rule)).filter((rule) => rule !== void 0);
  }
  function clearNullsForRule(rule) {
    const isNull = rule.null;
    if (isNull) return;
    if (rule.type === STYLE_RULE_TYPE) {
      return rule;
    } else if (rule.type === MEDIA_RULE_TYPE) {
      return {
        ...rule,
        cssRules: clearNullsForRules(rule.cssRules)
      };
    }
  }
  function getRulesByAbsIndex(docClone, absIndex) {
    let index = 0;
    for (const sheet of docClone.styleSheets) {
      if (index === absIndex) return sheet.cssRules;
      index++;
      for (const rule of sheet.cssRules) {
        if (rule.type === MEDIA_RULE_TYPE) {
          if (index === absIndex) return rule.cssRules;
          index++;
        }
      }
    }
  }
  function getRuleByAbsIndex(docClone, absIndex) {
    let index = 0;
    for (const sheet of docClone.styleSheets) {
      for (const rule of sheet.cssRules) {
        if (index === absIndex) return rule;
        index++;
        if (rule.type === MEDIA_RULE_TYPE) {
          for (const childRule of rule.cssRules) {
            if (index === absIndex) return childRule;
            index++;
          }
        }
      }
    }
  }
  function getStyleRuleByAbsIndex(docClone, absIndex) {
    let index = 0;
    for (const sheet of docClone.styleSheets) {
      for (const rule of sheet.cssRules) {
        if (rule.type === STYLE_RULE_TYPE) {
          if (index === absIndex) return rule;
          index++;
        } else if (rule.type === MEDIA_RULE_TYPE) {
          for (const childRule of rule.cssRules) {
            if (childRule.type === STYLE_RULE_TYPE) {
              if (index === absIndex) return childRule;
              index++;
            }
          }
        }
      }
    }
  }
  function getMediaRuleByAbsIndex(docClone, absIndex) {
    let index = 0;
    for (const sheet of docClone.styleSheets) {
      for (const rule of sheet.cssRules) {
        if (rule.type === MEDIA_RULE_TYPE) {
          if (index === absIndex) return rule;
          index++;
        }
      }
    }
  }
  function normalizeDoc(docClone) {
    return {
      styleSheets: normalizeStyleSheets(docClone.styleSheets)
    };
  }
  function normalizeStyleSheets(styleSheets) {
    return styleSheets.map(normalizeStyleSheet);
  }
  function normalizeStyleSheet(sheet) {
    return {
      cssRules: normalizeRules(sheet.cssRules)
    };
  }
  function normalizeRules(rules) {
    return rules.map(normalizeRule);
  }
  function normalizeRule(rule) {
    if (rule.type === STYLE_RULE_TYPE) {
      const styleRule = rule;
      return {
        ...rule,
        selectorText: normalizeSelector(styleRule.selectorText),
        style: normalizeStyle(styleRule.style)
      };
    } else if (rule.type === MEDIA_RULE_TYPE) {
      return {
        ...rule,
        cssRules: rule.cssRules.map(normalizeRule)
      };
    }
    return rule;
  }
  function normalizeStyle(style) {
    return Object.fromEntries(
      Object.entries(style).map(([key, value]) => [key, normalizeZero(value)])
    );
  }
  function normalizeZero(input) {
    return input.replace(
      /(?<![\d.])0+(?:\.0+)?(?![\d.])(?!(px|em|rem|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc)\b)/g,
      "0px"
    );
  }
  function normalizeSelector(selector) {
    return selector.replace(/\*::(before|after)\b/g, "::$1").replace(/\s*,\s*/g, ", ").replace(/\s+/g, " ").trim();
  }

  // src/utils/stringHelpers.ts
  function splitBySpaces(value) {
    let depth = 0;
    let currentValue = "";
    const result = [];
    for (const char of value) {
      if (char === " ") {
        if (depth === 0) {
          result.push(currentValue);
          currentValue = "";
        } else {
          currentValue += char;
        }
      } else {
        if (char === "(") {
          depth++;
        } else if (char === ")") {
          depth--;
        }
        currentValue += char;
      }
    }
    if (currentValue) {
      result.push(currentValue);
    }
    return result;
  }

  // src/parsing/serialization/serializer.ts
  var serializeDocument = (document, ctx) => {
    const serializedDoc = {
      styleSheets: serializeStyleSheets(
        getAccessibleStyleSheets(document.styleSheets),
        ctx
      )
    };
    return serializedDoc;
  };
  var getAccessibleStyleSheets = (styleSheets) => {
    return Array.from(styleSheets).filter((sheet) => {
      try {
        const rules = sheet.cssRules;
        return rules ? true : false;
      } catch (error) {
        return false;
      }
    });
  };
  var serializeStyleSheets = (styleSheets, ctx) => {
    return styleSheets.map((sheet) => serializeStyleSheet(sheet, ctx));
  };
  var serializeStyleSheet = (sheet, ctx) => {
    return {
      cssRules: serializeRules(sheet.cssRules, ctx)
    };
  };
  var serializeRules = (rules, ctx) => {
    return Array.from(rules).map((rule) => serializeRule(rule, ctx)).filter((rule) => rule !== null);
  };
  var serializeRule = (rule, ctx) => {
    return rule.type === STYLE_RULE_TYPE ? serializeStyleRule(rule, ctx) : serializeMediaRule(rule, ctx);
  };
  var serializeStyleRule = (rule, ctx) => {
    const { style, specialProps } = cloneStyleProps(rule, ctx);
    if (Object.keys(style).length <= 0) return null;
    return {
      type: STYLE_RULE_TYPE,
      selectorText: rule.selectorText,
      style,
      specialProps
    };
  };
  var cloneStyleProps = (rule, ctx) => {
    let styleResults = { style: {}, specialProps: {} };
    for (let i = 0; i < rule.style.length; i++) {
      const prop = rule.style[i];
      styleResults = cloneStyleProp(rule, prop, { ...ctx, styleResults });
    }
    return styleResults;
  };
  var cloneStyleProp = (rule, prop, ctx) => {
    let { styleResults } = ctx;
    styleResults = { ...styleResults };
    if (FLUID_PROPERTY_NAMES.has(prop)) {
      styleResults.style = cloneFluidProp(rule, prop, ctx);
    } else if (SPECIAL_PROPERTIES.has(prop)) {
      const specialProps = styleResults.specialProps = {
        ...styleResults.specialProps
      };
      specialProps[prop] = rule.style.getPropertyValue(prop);
    }
    return styleResults;
  };
  var cloneFluidProp = (rule, prop, ctx) => {
    let {
      styleResults: { style }
    } = ctx;
    const { isBrowser } = ctx;
    const shorthandOuterMap = SHORTHAND_PROPERTIES[prop];
    if (shorthandOuterMap) {
      if (isBrowser) return style;
      style = applyExplicitPropsFromShorthand(rule, prop, {
        ...ctx,
        shorthandOuterMap
      });
    } else {
      style = { ...style };
      style[prop] = rule.style.getPropertyValue(prop);
    }
    return style;
  };
  var applyExplicitPropsFromShorthand = (rule, prop, ctx) => {
    const { shorthandOuterMap } = ctx;
    let {
      styleResults: { style }
    } = ctx;
    style = { ...style };
    const shorthandValues = splitBySpaces(rule.style.getPropertyValue(prop));
    const mapLength = shorthandValues.length;
    const shorthandInnerMap = shorthandOuterMap.get(mapLength);
    if (shorthandInnerMap) {
      for (let j = 0; j < shorthandValues.length; j++) {
        const shorthandValue = shorthandValues[j];
        const properties = shorthandInnerMap.get(j);
        if (properties) {
          for (const explicitProp of properties)
            style[explicitProp] = shorthandValue;
        }
      }
    }
    return style;
  };
  var serializeMediaRule = (rule, ctx) => {
    const match = rule.media.mediaText.match(/\(min-width:\s*(\d+)px\)/);
    if (match) {
      const minWidth = Number(match[1]);
      return {
        type: MEDIA_RULE_TYPE,
        minWidth,
        cssRules: serializeRules(rule.cssRules, ctx)
      };
    }
    return null;
  };
  function wrap(serializeDocumentWrapped, getAccessibleStyleSheetsWrapped, serializeStyleSheetWrapped, serializeStyleSheetsWrapped, serializeRulesWrapped, serializeRuleWrapped, serializeStyleRuleWrapped, serializeMediaRuleWrapped, cloneStylePropsWrapped, cloneStylePropWrapped, cloneFluidPropWrapped, applyExplicitPropsFromShorthandWrapped) {
    serializeDocument = serializeDocumentWrapped;
    getAccessibleStyleSheets = getAccessibleStyleSheetsWrapped;
    serializeStyleSheet = serializeStyleSheetWrapped;
    serializeStyleSheets = serializeStyleSheetsWrapped;
    serializeRules = serializeRulesWrapped;
    serializeRule = serializeRuleWrapped;
    serializeStyleRule = serializeStyleRuleWrapped;
    serializeMediaRule = serializeMediaRuleWrapped;
    cloneStyleProps = cloneStylePropsWrapped;
    cloneStyleProp = cloneStylePropWrapped;
    cloneFluidProp = cloneFluidPropWrapped;
    applyExplicitPropsFromShorthand = applyExplicitPropsFromShorthandWrapped;
  }

  // test/utils/vitest.ts
  var expect;
  if (false) {
    expect = null.expect;
  }
  function toBeEqualDefined(actual, expected, msg) {
    expect(actual, msg).toBeDefined();
    expect(actual, msg).toEqual(expected);
  }

  // test/parsing/serialization/gold-sight.ts
  var expect2;
  if (false) {
    expect2 = null.expect;
  }
  var serializeDocAssertions = {
    "should serialize the document": (state, args, result) => {
      result = normalizeDoc(result);
      expect2(result).toEqual(clearNullsForDoc(state.master.docClone));
    }
  };
  var getAccessibleStyleSheetsAssertions = {
    "should get the accessible style sheets": (state, args, result) => {
      expect2(result.length).toBe(state.master.docClone.styleSheets.length);
    }
  };
  var serializeStyleSheetsAssertions = {
    "should serialize the style sheets": (state, args, result) => {
      result = normalizeStyleSheets(result);
      expect2(result).toEqual(
        clearNullsForStyleSheets(state.master.docClone.styleSheets)
      );
    }
  };
  var serializeStyleSheetAssertions = {
    "should serialize the style sheet": (state, args, result) => {
      result = normalizeStyleSheet(result);
      toBeEqualDefined(
        result,
        clearNullsForStyleSheet(
          state.master.docClone.styleSheets[state.sheetIndex]
        )
      );
    }
  };
  var serializeRulesAssertions = {
    "should serialize the rules": (state, args, result) => {
      result = normalizeRules(result);
      let rules = getRulesByAbsIndex(state.master.docClone, state.rulesIndex);
      if (rules) rules = clearNullsForRules(rules);
      toBeEqualDefined(result, rules);
    }
  };
  var serializeRuleAssertions = {
    "should serialize the rule": (state, args, result) => {
      result = result ? normalizeRule(result) : null;
      let masterRule = getRuleByAbsIndex(state.master.docClone, state.ruleIndex);
      if (result === null) {
        expect2(masterRule.null).toBeTruthy();
        return;
      }
      if (masterRule) masterRule = clearNullsForRule(masterRule);
      toBeEqualDefined(result, masterRule);
    }
  };
  var serializeStyleRuleAssertions = {
    "should serialize the style rule": (state, args, result) => {
      result = result ? normalizeRule(result) : null;
      const masterRule = getStyleRuleByAbsIndex(
        state.master.docClone,
        state.styleRuleIndex
      );
      if (result === null) {
        expect2(masterRule.null).toBeTruthy();
        return;
      }
      toBeEqualDefined(result, masterRule);
    }
  };
  var serializeMediaRuleAssertions = {
    "should serialize the media rule": (state, args, result) => {
      result = result ? normalizeRule(result) : null;
      let masterRule = getMediaRuleByAbsIndex(
        state.master.docClone,
        state.mediaRuleIndex
      );
      if (result === null) {
        expect2(masterRule.null).toBeTruthy();
        return;
      }
      if (masterRule) masterRule = clearNullsForRule(masterRule);
      toBeEqualDefined(result, masterRule);
    }
  };
  var cloneStylePropsAssertions = {
    "should clone the style props": (state, args, result) => {
      let { style, specialProps } = result;
      style = normalizeStyle(style);
      const masterRule = getStyleRuleByAbsIndex(
        state.master.docClone,
        state.styleRuleIndex - 1
      );
      if (Object.keys(style).length <= 0) {
        expect2(masterRule.null).toBeTruthy();
        return;
      }
      expect2(style).toEqual(masterRule.style);
      expect2(specialProps).toEqual(masterRule.specialProps);
    }
  };
  var cloneStylePropAssertions = {
    "should clone the style prop": (state, args, result) => {
      const [rule, prop, ctx] = args;
      const {
        isBrowser,
        styleResults: { style: styleArg }
      } = ctx;
      let { style, specialProps } = result;
      style = normalizeStyle(style);
      let masterRule = getStyleRuleByAbsIndex(
        state.master.docClone,
        state.styleRuleIndex - 1
      );
      if (FLUID_PROPERTY_NAMES.has(prop)) {
        assertFluidProp(prop, { isBrowser, style, masterRule, styleArg });
      } else if (SPECIAL_PROPERTIES.has(prop)) {
        expect2(specialProps[prop]).toEqual(masterRule.specialProps[prop]);
      }
    }
  };
  function assertFluidProp(prop, ctx) {
    const { isBrowser, style, masterRule, styleArg } = ctx;
    if (SHORTHAND_PROPERTIES[prop]) {
      if (isBrowser) return;
      expect2(style).not.toEqual(styleArg);
      expect2(masterRule.style).toMatchObject(style);
    } else {
      toBeEqualDefined(style[prop], masterRule.style[prop]);
    }
  }
  var cloneFluidPropAssertions = {
    "should clone the fluid prop": (state, args, result) => {
      const [rule, prop, ctx] = args;
      const {
        isBrowser,
        styleResults: { style: styleArg }
      } = ctx;
      const masterRule = getStyleRuleByAbsIndex(
        state.master.docClone,
        state.styleRuleIndex - 1
      );
      result = normalizeStyle(result);
      assertFluidProp(prop, {
        isBrowser,
        style: result,
        masterRule,
        styleArg
      });
    }
  };
  var applyExplicitPropsFromShorthandAssertions = {
    "should apply the explicit props from shorthand": (state, args, result) => {
      const [rule, prop, ctx] = args;
      const {
        styleResults: { style: styleArg }
      } = ctx;
      const masterRule = getStyleRuleByAbsIndex(
        state.master.docClone,
        state.styleRuleIndex - 1
      );
      result = normalizeStyle(result);
      expect2(result).not.toEqual(styleArg);
      expect2(masterRule.style).toMatchObject(result);
    }
  };
  var defaultAssertions = {
    serializeDocument: serializeDocAssertions,
    getAccessibleStyleSheets: getAccessibleStyleSheetsAssertions,
    serializeStyleSheets: serializeStyleSheetsAssertions,
    serializeStyleSheet: serializeStyleSheetAssertions,
    serializeRules: serializeRulesAssertions,
    serializeRule: serializeRuleAssertions,
    serializeStyleRule: serializeStyleRuleAssertions,
    serializeMediaRule: serializeMediaRuleAssertions,
    cloneStyleProps: cloneStylePropsAssertions,
    cloneStyleProp: cloneStylePropAssertions,
    cloneFluidProp: cloneFluidPropAssertions,
    applyExplicitPropsFromShorthand: applyExplicitPropsFromShorthandAssertions
  };
  var SerializeDocAssertionMaster = class extends dist_default {
    constructor() {
      super(defaultAssertions, "serializeDoc");
      this.serializeDocument = this.wrapTopFn(serializeDocument, "serializeDocument");
      this.getAccessibleStyleSheets = this.wrapFn(
        getAccessibleStyleSheets,
        "getAccessibleStyleSheets"
      );
      this.serializeStyleSheets = this.wrapFn(
        serializeStyleSheets,
        "serializeStyleSheets"
      );
      this.serializeStyleSheet = this.wrapFn(
        serializeStyleSheet,
        "serializeStyleSheet",
        {
          post: (state) => {
            state.sheetIndex++;
          }
        }
      );
      this.serializeRules = this.wrapFn(serializeRules, "serializeRules", {
        post: (state) => {
          state.rulesIndex++;
        }
      });
      this.serializeRule = this.wrapFn(serializeRule, "serializeRule", {
        post: (state) => {
          state.ruleIndex++;
        }
      });
      this.serializeStyleRule = this.wrapFn(serializeStyleRule, "serializeStyleRule", {
        post: (state) => {
          state.styleRuleIndex++;
        }
      });
      this.serializeMediaRule = this.wrapFn(serializeMediaRule, "serializeMediaRule", {
        post: (state) => {
          state.mediaRuleIndex++;
        }
      });
      this.cloneStyleProps = this.wrapFn(cloneStyleProps, "cloneStyleProps");
      this.cloneStyleProp = this.wrapFn(cloneStyleProp, "cloneStyleProp");
      this.cloneFluidProp = this.wrapFn(cloneFluidProp, "cloneFluidProp");
      this.applyExplicitPropsFromShorthand = this.wrapFn(
        applyExplicitPropsFromShorthand,
        "applyExplicitPropsFromShorthand"
      );
    }
    newState() {
      return {
        sheetIndex: 0,
        ruleIndex: 0,
        rulesIndex: 0,
        styleRuleIndex: 0,
        mediaRuleIndex: 0
      };
    }
  };
  var serializeDocAssertionMaster = new SerializeDocAssertionMaster();
  function wrapAll() {
    wrap(
      serializeDocAssertionMaster.serializeDocument,
      serializeDocAssertionMaster.getAccessibleStyleSheets,
      serializeDocAssertionMaster.serializeStyleSheet,
      serializeDocAssertionMaster.serializeStyleSheets,
      serializeDocAssertionMaster.serializeRules,
      serializeDocAssertionMaster.serializeRule,
      serializeDocAssertionMaster.serializeStyleRule,
      serializeDocAssertionMaster.serializeMediaRule,
      serializeDocAssertionMaster.cloneStyleProps,
      serializeDocAssertionMaster.cloneStyleProp,
      serializeDocAssertionMaster.cloneFluidProp,
      serializeDocAssertionMaster.applyExplicitPropsFromShorthand
    );
  }

  // bundle/src/bundle.ts
  wrapAll();
  return __toCommonJS(bundle_exports);
})();
