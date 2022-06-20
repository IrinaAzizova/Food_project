/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/blocks/tabs.js":
/*!*******************************!*\
  !*** ./src/js/blocks/tabs.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const tabs = (contentSelector, tabsSelector, activeClass) => {
  const tabContent = document.querySelectorAll(contentSelector),
        tabsTittle = document.querySelectorAll(tabsSelector);
  tabsTittle.forEach((title, i) => {
    title.addEventListener('click', event => {
      toggleActiveClass(activeClass);
      showCorrectTabContent(i);
    });
  });

  function toggleActiveClass(className) {
    tabsTittle.forEach(title => {
      title.classList.remove(className);
    });
    event.target.classList.add(className);
  }

  function showCorrectTabContent(item = 0) {
    tabContent.forEach(tab => {
      tab.classList.remove('animate__fadeIn');
      tab.classList.add('hide');
    });
    tabContent[item].classList.remove('hide');
    tabContent[item].classList.add('animate__fadeIn');
  }

  showCorrectTabContent();
};

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./src/js/blocks/timer.js":
/*!********************************!*\
  !*** ./src/js/blocks/timer.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const timer = (deadLine, daysSelector, hoursSelector, minutesSelector, secondsSelector) => {
  const days = document.querySelector(daysSelector),
        hours = document.querySelector(hoursSelector),
        minutes = document.querySelector(minutesSelector),
        seconds = document.querySelector(secondsSelector),
        end = new Date(deadLine).getTime();
  let timeLeft;
  let startTimer = setTimeout(setTime, 1000);
  setTime();

  function setTime() {
    timeLeft = end - new Date().getTime();

    if (timeLeft < 0) {
      timeLeft = 0;
      clearInterval(startTimer);
    }

    const day = Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
          hour = Math.floor(timeLeft / (1000 * 60 * 60) % 24),
          min = Math.floor(timeLeft / (1000 * 60) % 60),
          sec = Math.floor(timeLeft / 1000 % 60);

    function getZero(num) {
      if (num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    }

    days.textContent = getZero(day);
    hours.textContent = getZero(hour);
    minutes.textContent = getZero(min);
    seconds.textContent = getZero(sec);
    console.log('ok');

    if (timeLeft > 0) {
      startTimer = setTimeout(setTime, 1000);
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _blocks_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blocks/tabs */ "./src/js/blocks/tabs.js");
/* harmony import */ var _blocks_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blocks/timer */ "./src/js/blocks/timer.js");




document.addEventListener('DOMContentLoaded', () => {
  Object(_blocks_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabcontent', '.tabheader__item', 'tabheader__item_active');
  Object(_blocks_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('2022-06-20T13:00:00', '#days', '#hours', '#minutes', '#seconds');
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map