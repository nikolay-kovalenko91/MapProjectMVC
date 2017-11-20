/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "8322b7131f2227f10b14"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		1:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"main","2":"vendor"}[chunkId]||chunkId) + ".bundle.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	eval("\"use strict\";\n__webpack_require__(85);\n__webpack_require__(86);\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/polyfills.ts\n ** module id = 0\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///./src/polyfills.ts?");

/***/ },

/***/ 85:
/***/ function(module, exports) {

	eval("/* WEBPACK VAR INJECTION */(function(global) {/*! *****************************************************************************\r\nCopyright (C) Microsoft. All rights reserved.\r\nLicensed under the Apache License, Version 2.0 (the \"License\"); you may not use\r\nthis file except in compliance with the License. You may obtain a copy of the\r\nLicense at http://www.apache.org/licenses/LICENSE-2.0\r\n\r\nTHIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\r\nKIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED\r\nWARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,\r\nMERCHANTABLITY OR NON-INFRINGEMENT.\r\n\r\nSee the Apache Version 2.0 License for specific language governing permissions\r\nand limitations under the License.\r\n***************************************************************************** */\r\nvar Reflect;\r\n(function (Reflect) {\r\n    \"use strict\";\r\n    var hasOwn = Object.prototype.hasOwnProperty;\r\n    // feature test for Object.create support\r\n    var supportsCreate = typeof Object.create === \"function\";\r\n    // feature test for __proto__ support\r\n    var supportsProto = (function () {\r\n        var sentinel = {};\r\n        function __() { }\r\n        __.prototype = sentinel;\r\n        var instance = new __();\r\n        return instance.__proto__ === sentinel;\r\n    })();\r\n    // create an object in dictionary mode (a.k.a. \"slow\" mode in v8)\r\n    var createDictionary = supportsCreate ? function () { return MakeDictionary(Object.create(null)); } :\r\n        supportsProto ? function () { return MakeDictionary({ __proto__: null }); } :\r\n            function () { return MakeDictionary({}); };\r\n    var HashMap;\r\n    (function (HashMap) {\r\n        var downLevel = !supportsCreate && !supportsProto;\r\n        HashMap.has = downLevel\r\n            ? function (map, key) { return hasOwn.call(map, key); }\r\n            : function (map, key) { return key in map; };\r\n        HashMap.get = downLevel\r\n            ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }\r\n            : function (map, key) { return map[key]; };\r\n    })(HashMap || (HashMap = {}));\r\n    // Load global or shim versions of Map, Set, and WeakMap\r\n    var functionPrototype = Object.getPrototypeOf(Function);\r\n    var _Map = typeof Map === \"function\" ? Map : CreateMapPolyfill();\r\n    var _Set = typeof Set === \"function\" ? Set : CreateSetPolyfill();\r\n    var _WeakMap = typeof WeakMap === \"function\" ? WeakMap : CreateWeakMapPolyfill();\r\n    // [[Metadata]] internal slot\r\n    var Metadata = new _WeakMap();\r\n    /**\r\n      * Applies a set of decorators to a property of a target object.\r\n      * @param decorators An array of decorators.\r\n      * @param target The target object.\r\n      * @param targetKey (Optional) The property key to decorate.\r\n      * @param targetDescriptor (Optional) The property descriptor for the target key\r\n      * @remarks Decorators are applied in reverse order.\r\n      * @example\r\n      *\r\n      *     class Example {\r\n      *         // property declarations are not part of ES6, though they are valid in TypeScript:\r\n      *         // static staticProperty;\r\n      *         // property;\r\n      *\r\n      *         constructor(p) { }\r\n      *         static staticMethod(p) { }\r\n      *         method(p) { }\r\n      *     }\r\n      *\r\n      *     // constructor\r\n      *     Example = Reflect.decorate(decoratorsArray, Example);\r\n      *\r\n      *     // property (on constructor)\r\n      *     Reflect.decorate(decoratorsArray, Example, \"staticProperty\");\r\n      *\r\n      *     // property (on prototype)\r\n      *     Reflect.decorate(decoratorsArray, Example.prototype, \"property\");\r\n      *\r\n      *     // method (on constructor)\r\n      *     Object.defineProperty(Example, \"staticMethod\",\r\n      *         Reflect.decorate(decoratorsArray, Example, \"staticMethod\",\r\n      *             Object.getOwnPropertyDescriptor(Example, \"staticMethod\")));\r\n      *\r\n      *     // method (on prototype)\r\n      *     Object.defineProperty(Example.prototype, \"method\",\r\n      *         Reflect.decorate(decoratorsArray, Example.prototype, \"method\",\r\n      *             Object.getOwnPropertyDescriptor(Example.prototype, \"method\")));\r\n      *\r\n      */\r\n    function decorate(decorators, target, targetKey, targetDescriptor) {\r\n        if (!IsUndefined(targetDescriptor)) {\r\n            if (!IsArray(decorators))\r\n                throw new TypeError();\r\n            if (!IsObject(target))\r\n                throw new TypeError();\r\n            if (IsUndefined(targetKey))\r\n                throw new TypeError();\r\n            if (!IsObject(targetDescriptor))\r\n                throw new TypeError();\r\n            targetKey = ToPropertyKey(targetKey);\r\n            return DecoratePropertyWithDescriptor(decorators, target, targetKey, targetDescriptor);\r\n        }\r\n        else if (!IsUndefined(targetKey)) {\r\n            if (!IsArray(decorators))\r\n                throw new TypeError();\r\n            if (!IsObject(target))\r\n                throw new TypeError();\r\n            targetKey = ToPropertyKey(targetKey);\r\n            return DecoratePropertyWithoutDescriptor(decorators, target, targetKey);\r\n        }\r\n        else {\r\n            if (!IsArray(decorators))\r\n                throw new TypeError();\r\n            if (!IsConstructor(target))\r\n                throw new TypeError();\r\n            return DecorateConstructor(decorators, target);\r\n        }\r\n    }\r\n    Reflect.decorate = decorate;\r\n    /**\r\n      * A default metadata decorator factory that can be used on a class, class member, or parameter.\r\n      * @param metadataKey The key for the metadata entry.\r\n      * @param metadataValue The value for the metadata entry.\r\n      * @returns A decorator function.\r\n      * @remarks\r\n      * If `metadataKey` is already defined for the target and target key, the\r\n      * metadataValue for that key will be overwritten.\r\n      * @example\r\n      *\r\n      *     // constructor\r\n      *     @Reflect.metadata(key, value)\r\n      *     class Example {\r\n      *     }\r\n      *\r\n      *     // property (on constructor, TypeScript only)\r\n      *     class Example {\r\n      *         @Reflect.metadata(key, value)\r\n      *         static staticProperty;\r\n      *     }\r\n      *\r\n      *     // property (on prototype, TypeScript only)\r\n      *     class Example {\r\n      *         @Reflect.metadata(key, value)\r\n      *         property;\r\n      *     }\r\n      *\r\n      *     // method (on constructor)\r\n      *     class Example {\r\n      *         @Reflect.metadata(key, value)\r\n      *         static staticMethod() { }\r\n      *     }\r\n      *\r\n      *     // method (on prototype)\r\n      *     class Example {\r\n      *         @Reflect.metadata(key, value)\r\n      *         method() { }\r\n      *     }\r\n      *\r\n      */\r\n    function metadata(metadataKey, metadataValue) {\r\n        function decorator(target, targetKey) {\r\n            if (!IsUndefined(targetKey)) {\r\n                if (!IsObject(target))\r\n                    throw new TypeError();\r\n                targetKey = ToPropertyKey(targetKey);\r\n                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);\r\n            }\r\n            else {\r\n                if (!IsConstructor(target))\r\n                    throw new TypeError();\r\n                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, /*targetKey*/ undefined);\r\n            }\r\n        }\r\n        return decorator;\r\n    }\r\n    Reflect.metadata = metadata;\r\n    /**\r\n      * Define a unique metadata entry on the target.\r\n      * @param metadataKey A key used to store and retrieve metadata.\r\n      * @param metadataValue A value that contains attached metadata.\r\n      * @param target The target object on which to define metadata.\r\n      * @param targetKey (Optional) The property key for the target.\r\n      * @example\r\n      *\r\n      *     class Example {\r\n      *         // property declarations are not part of ES6, though they are valid in TypeScript:\r\n      *         // static staticProperty;\r\n      *         // property;\r\n      *\r\n      *         constructor(p) { }\r\n      *         static staticMethod(p) { }\r\n      *         method(p) { }\r\n      *     }\r\n      *\r\n      *     // constructor\r\n      *     Reflect.defineMetadata(\"custom:annotation\", options, Example);\r\n      *\r\n      *     // property (on constructor)\r\n      *     Reflect.defineMetadata(\"custom:annotation\", options, Example, \"staticProperty\");\r\n      *\r\n      *     // property (on prototype)\r\n      *     Reflect.defineMetadata(\"custom:annotation\", options, Example.prototype, \"property\");\r\n      *\r\n      *     // method (on constructor)\r\n      *     Reflect.defineMetadata(\"custom:annotation\", options, Example, \"staticMethod\");\r\n      *\r\n      *     // method (on prototype)\r\n      *     Reflect.defineMetadata(\"custom:annotation\", options, Example.prototype, \"method\");\r\n      *\r\n      *     // decorator factory as metadata-producing annotation.\r\n      *     function MyAnnotation(options): Decorator {\r\n      *         return (target, key?) => Reflect.defineMetadata(\"custom:annotation\", options, target, key);\r\n      *     }\r\n      *\r\n      */\r\n    function defineMetadata(metadataKey, metadataValue, target, targetKey) {\r\n        if (!IsObject(target))\r\n            throw new TypeError();\r\n        if (!IsUndefined(targetKey))\r\n            targetKey = ToPropertyKey(targetKey);\r\n        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);\r\n    }\r\n    Reflect.defineMetadata = defineMetadata;\r\n    /**\r\n      * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.\r\n      * @param metadataKey A key used to store and retrieve metadata.\r\n      * @param target The target object on which the metadata is defined.\r\n      * @param targetKey (Optional) The property key for the target.\r\n      * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.\r\n      * @example\r\n      *\r\n      *     class Example {\r\n      *         // property declarations are not part of ES6, though they are valid in TypeScript:\r\n      *         // static staticProperty;\r\n      *         // property;\r\n      *\r\n      *         constructor(p) { }\r\n      *         static staticMethod(p) { }\r\n      *         method(p) { }\r\n      *     }\r\n      *\r\n      *     // constructor\r\n      *     result = Reflect.hasMetadata(\"custom:annotation\", Example);\r\n      *\r\n      *     // property (on constructor)\r\n      *     result = Reflect.hasMetadata(\"custom:annotation\", Example, \"staticProperty\");\r\n      *\r\n      *     // property (on prototype)\r\n      *     result = Reflect.hasMetadata(\"custom:annotation\", Example.prototype, \"property\");\r\n      *\r\n      *     // method (on constructor)\r\n      *     result = Reflect.hasMetadata(\"custom:annotation\", Example, \"staticMethod\");\r\n      *\r\n      *     // method (on prototype)\r\n      *     result = Reflect.hasMetadata(\"custom:annotation\", Example.prototype, \"method\");\r\n      *\r\n      */\r\n    function hasMetadata(metadataKey, target, targetKey) {\r\n        if (!IsObject(target))\r\n            throw new TypeError();\r\n        if (!IsUndefined(targetKey))\r\n            targetKey = ToPropertyKey(targetKey);\r\n        return OrdinaryHasMetadata(metadataKey, target, targetKey);\r\n    }\r\n    Reflect.hasMetadata = hasMetadata;\r\n    /**\r\n      * Gets a value indicating whether the target object has the provided metadata key defined.\r\n      * @param metadataKey A key used to store and retrieve metadata.\r\n      * @param target The target object on which the metadata is defined.\r\n      * @param targetKey (Optional) The property key for the target.\r\n      * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.\r\n      * @example\r\n      *\r\n      *     class Example {\r\n      *         // property declarations are not part of ES6, though they are valid in TypeScript:\r\n      *         // static staticProperty;\r\n      *         // property;\r\n      *\r\n      *         constructor(p) { }\r\n      *         static staticMethod(p) { }\r\n      *         method(p) { }\r\n      *     }\r\n      *\r\n      *     // constructor\r\n      *     result = Reflect.hasOwnMetadata(\"custom:annotation\", Example);\r\n      *\r\n      *     // property (on constructor)\r\n      *     result = Reflect.hasOwnMetadata(\"custom:annotation\", Example, \"staticProperty\");\r\n      *\r\n      *     // property (on prototype)\r\n      *     result = Reflect.hasOwnMetadata(\"custom:annotation\", Example.prototype, \"property\");\r\n      *\r\n      *     // method (on constructor)\r\n      *     result = Reflect.hasOwnMetadata(\"custom:annotation\", Example, \"staticMethod\");\r\n      *\r\n      *     // method (on prototype)\r\n      *     result = Reflect.hasOwnMetadata(\"custom:annotation\", Example.prototype, \"method\");\r\n      *\r\n      */\r\n    function hasOwnMetadata(metadataKey, target, targetKey) {\r\n        if (!IsObject(target))\r\n            throw new TypeError();\r\n        if (!IsUndefined(targetKey))\r\n            targetKey = ToPropertyKey(targetKey);\r\n        return OrdinaryHasOwnMetadata(metadataKey, target, targetKey);\r\n    }\r\n    Reflect.hasOwnMetadata = hasOwnMetadata;\r\n    /**\r\n      * Gets the metadata value for the provided metadata key on the target object or its prototype chain.\r\n      * @param metadataKey A key used to store and retrieve metadata.\r\n      * @param target The target object on which the metadata is defined.\r\n      * @param targetKey (Optional) The property key for the target.\r\n      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.\r\n      * @example\r\n      *\r\n      *     class Example {\r\n      *         // property declarations are not part of ES6, though they are valid in TypeScript:\r\n      *         // static staticProperty;\r\n      *         // property;\r\n      *\r\n      *         constructor(p) { }\r\n      *         static staticMethod(p) { }\r\n      *         method(p) { }\r\n      *     }\r\n      *\r\n      *     // constructor\r\n      *     result = Reflect.getMetadata(\"custom:annotation\", Example);\r\n      *\r\n      *     // property (on constructor)\r\n      *     result = Reflect.getMetadata(\"custom:annotation\", Example, \"staticProperty\");\r\n      *\r\n      *     // property (on prototype)\r\n      *     result = Reflect.getMetadata(\"custom:annotation\", Example.prototype, \"property\");\r\n      *\r\n      *     // method (on constructor)\r\n      *     result = Reflect.getMetadata(\"custom:annotation\", Example, \"staticMethod\");\r\n      *\r\n      *     // method (on prototype)\r\n      *     result = Reflect.getMetadata(\"custom:annotation\", Example.prototype, \"method\");\r\n      *\r\n      */\r\n    function getMetadata(metadataKey, target, targetKey) {\r\n        if (!IsObject(target))\r\n            throw new TypeError();\r\n        if (!IsUndefined(targetKey))\r\n            targetKey = ToPropertyKey(targetKey);\r\n        return OrdinaryGetMetadata(metadataKey, target, targetKey);\r\n    }\r\n    Reflect.getMetadata = getMetadata;\r\n    /**\r\n      * Gets the metadata value for the provided metadata key on the target object.\r\n      * @param metadataKey A key used to store and retrieve metadata.\r\n      * @param target The target object on which the metadata is defined.\r\n      * @param targetKey (Optional) The property key for the target.\r\n      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.\r\n      * @example\r\n      *\r\n      *     class Example {\r\n      *         // property declarations are not part of ES6, though they are valid in TypeScript:\r\n      *         // static staticProperty;\r\n      *         // property;\r\n      *\r\n      *         constructor(p) { }\r\n      *         static staticMethod(p) { }\r\n      *         method(p) { }\r\n      *     }\r\n      *\r\n      *     // constructor\r\n      *     result = Reflect.getOwnMetadata(\"custom:annotation\", Example);\r\n      *\r\n      *     // property (on constructor)\r\n      *     result = Reflect.getOwnMetadata(\"custom:annotation\", Example, \"staticProperty\");\r\n      *\r\n      *     // property (on prototype)\r\n      *     result = Reflect.getOwnMetadata(\"custom:annotation\", Example.prototype, \"property\");\r\n      *\r\n      *     // method (on constructor)\r\n      *     result = Reflect.getOwnMetadata(\"custom:annotation\", Example, \"staticMethod\");\r\n      *\r\n      *     // method (on prototype)\r\n      *     result = Reflect.getOwnMetadata(\"custom:annotation\", Example.prototype, \"method\");\r\n      *\r\n      */\r\n    function getOwnMetadata(metadataKey, target, targetKey) {\r\n        if (!IsObject(target))\r\n            throw new TypeError();\r\n        if (!IsUndefined(targetKey))\r\n            targetKey = ToPropertyKey(targetKey);\r\n        return OrdinaryGetOwnMetadata(metadataKey, target, targetKey);\r\n    }\r\n    Reflect.getOwnMetadata = getOwnMetadata;\r\n    /**\r\n      * Gets the metadata keys defined on the target object or its prototype chain.\r\n      * @param target The target object on which the metadata is defined.\r\n      * @param targetKey (Optional) The property key for the target.\r\n      * @returns An array of unique metadata keys.\r\n      * @example\r\n      *\r\n      *     class Example {\r\n      *         // property declarations are not part of ES6, though they are valid in TypeScript:\r\n      *         // static staticProperty;\r\n      *         // property;\r\n      *\r\n      *         constructor(p) { }\r\n      *         static staticMethod(p) { }\r\n      *         method(p) { }\r\n      *     }\r\n      *\r\n      *     // constructor\r\n      *     result = Reflect.getMetadataKeys(Example);\r\n      *\r\n      *     // property (on constructor)\r\n      *     result = Reflect.getMetadataKeys(Example, \"staticProperty\");\r\n      *\r\n      *     // property (on prototype)\r\n      *     result = Reflect.getMetadataKeys(Example.prototype, \"property\");\r\n      *\r\n      *     // method (on constructor)\r\n      *     result = Reflect.getMetadataKeys(Example, \"staticMethod\");\r\n      *\r\n      *     // method (on prototype)\r\n      *     result = Reflect.getMetadataKeys(Example.prototype, \"method\");\r\n      *\r\n      */\r\n    function getMetadataKeys(target, targetKey) {\r\n        if (!IsObject(target))\r\n            throw new TypeError();\r\n        if (!IsUndefined(targetKey))\r\n            targetKey = ToPropertyKey(targetKey);\r\n        return OrdinaryMetadataKeys(target, targetKey);\r\n    }\r\n    Reflect.getMetadataKeys = getMetadataKeys;\r\n    /**\r\n      * Gets the unique metadata keys defined on the target object.\r\n      * @param target The target object on which the metadata is defined.\r\n      * @param targetKey (Optional) The property key for the target.\r\n      * @returns An array of unique metadata keys.\r\n      * @example\r\n      *\r\n      *     class Example {\r\n      *         // property declarations are not part of ES6, though they are valid in TypeScript:\r\n      *         // static staticProperty;\r\n      *         // property;\r\n      *\r\n      *         constructor(p) { }\r\n      *         static staticMethod(p) { }\r\n      *         method(p) { }\r\n      *     }\r\n      *\r\n      *     // constructor\r\n      *     result = Reflect.getOwnMetadataKeys(Example);\r\n      *\r\n      *     // property (on constructor)\r\n      *     result = Reflect.getOwnMetadataKeys(Example, \"staticProperty\");\r\n      *\r\n      *     // property (on prototype)\r\n      *     result = Reflect.getOwnMetadataKeys(Example.prototype, \"property\");\r\n      *\r\n      *     // method (on constructor)\r\n      *     result = Reflect.getOwnMetadataKeys(Example, \"staticMethod\");\r\n      *\r\n      *     // method (on prototype)\r\n      *     result = Reflect.getOwnMetadataKeys(Example.prototype, \"method\");\r\n      *\r\n      */\r\n    function getOwnMetadataKeys(target, targetKey) {\r\n        if (!IsObject(target))\r\n            throw new TypeError();\r\n        if (!IsUndefined(targetKey))\r\n            targetKey = ToPropertyKey(targetKey);\r\n        return OrdinaryOwnMetadataKeys(target, targetKey);\r\n    }\r\n    Reflect.getOwnMetadataKeys = getOwnMetadataKeys;\r\n    /**\r\n      * Deletes the metadata entry from the target object with the provided key.\r\n      * @param metadataKey A key used to store and retrieve metadata.\r\n      * @param target The target object on which the metadata is defined.\r\n      * @param targetKey (Optional) The property key for the target.\r\n      * @returns `true` if the metadata entry was found and deleted; otherwise, false.\r\n      * @example\r\n      *\r\n      *     class Example {\r\n      *         // property declarations are not part of ES6, though they are valid in TypeScript:\r\n      *         // static staticProperty;\r\n      *         // property;\r\n      *\r\n      *         constructor(p) { }\r\n      *         static staticMethod(p) { }\r\n      *         method(p) { }\r\n      *     }\r\n      *\r\n      *     // constructor\r\n      *     result = Reflect.deleteMetadata(\"custom:annotation\", Example);\r\n      *\r\n      *     // property (on constructor)\r\n      *     result = Reflect.deleteMetadata(\"custom:annotation\", Example, \"staticProperty\");\r\n      *\r\n      *     // property (on prototype)\r\n      *     result = Reflect.deleteMetadata(\"custom:annotation\", Example.prototype, \"property\");\r\n      *\r\n      *     // method (on constructor)\r\n      *     result = Reflect.deleteMetadata(\"custom:annotation\", Example, \"staticMethod\");\r\n      *\r\n      *     // method (on prototype)\r\n      *     result = Reflect.deleteMetadata(\"custom:annotation\", Example.prototype, \"method\");\r\n      *\r\n      */\r\n    function deleteMetadata(metadataKey, target, targetKey) {\r\n        // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#deletemetadata-metadatakey-p-\r\n        if (!IsObject(target))\r\n            throw new TypeError();\r\n        if (!IsUndefined(targetKey))\r\n            targetKey = ToPropertyKey(targetKey);\r\n        var metadataMap = GetOrCreateMetadataMap(target, targetKey, /*create*/ false);\r\n        if (IsUndefined(metadataMap))\r\n            return false;\r\n        if (!metadataMap.delete(metadataKey))\r\n            return false;\r\n        if (metadataMap.size > 0)\r\n            return true;\r\n        var targetMetadata = Metadata.get(target);\r\n        targetMetadata.delete(targetKey);\r\n        if (targetMetadata.size > 0)\r\n            return true;\r\n        Metadata.delete(target);\r\n        return true;\r\n    }\r\n    Reflect.deleteMetadata = deleteMetadata;\r\n    function DecorateConstructor(decorators, target) {\r\n        for (var i = decorators.length - 1; i >= 0; --i) {\r\n            var decorator = decorators[i];\r\n            var decorated = decorator(target);\r\n            if (!IsUndefined(decorated)) {\r\n                if (!IsConstructor(decorated))\r\n                    throw new TypeError();\r\n                target = decorated;\r\n            }\r\n        }\r\n        return target;\r\n    }\r\n    function DecoratePropertyWithDescriptor(decorators, target, propertyKey, descriptor) {\r\n        for (var i = decorators.length - 1; i >= 0; --i) {\r\n            var decorator = decorators[i];\r\n            var decorated = decorator(target, propertyKey, descriptor);\r\n            if (!IsUndefined(decorated)) {\r\n                if (!IsObject(decorated))\r\n                    throw new TypeError();\r\n                descriptor = decorated;\r\n            }\r\n        }\r\n        return descriptor;\r\n    }\r\n    function DecoratePropertyWithoutDescriptor(decorators, target, propertyKey) {\r\n        for (var i = decorators.length - 1; i >= 0; --i) {\r\n            var decorator = decorators[i];\r\n            decorator(target, propertyKey);\r\n        }\r\n    }\r\n    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#getorcreatemetadatamap--o-p-create-\r\n    function GetOrCreateMetadataMap(target, targetKey, create) {\r\n        var targetMetadata = Metadata.get(target);\r\n        if (!targetMetadata) {\r\n            if (!create)\r\n                return undefined;\r\n            targetMetadata = new _Map();\r\n            Metadata.set(target, targetMetadata);\r\n        }\r\n        var keyMetadata = targetMetadata.get(targetKey);\r\n        if (!keyMetadata) {\r\n            if (!create)\r\n                return undefined;\r\n            keyMetadata = new _Map();\r\n            targetMetadata.set(targetKey, keyMetadata);\r\n        }\r\n        return keyMetadata;\r\n    }\r\n    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryhasmetadata--metadatakey-o-p-\r\n    function OrdinaryHasMetadata(MetadataKey, O, P) {\r\n        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);\r\n        if (hasOwn)\r\n            return true;\r\n        var parent = GetPrototypeOf(O);\r\n        return parent !== null ? OrdinaryHasMetadata(MetadataKey, parent, P) : false;\r\n    }\r\n    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryhasownmetadata--metadatakey-o-p-\r\n    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {\r\n        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ false);\r\n        return metadataMap !== undefined && Boolean(metadataMap.has(MetadataKey));\r\n    }\r\n    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarygetmetadata--metadatakey-o-p-\r\n    function OrdinaryGetMetadata(MetadataKey, O, P) {\r\n        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);\r\n        if (hasOwn)\r\n            return OrdinaryGetOwnMetadata(MetadataKey, O, P);\r\n        var parent = GetPrototypeOf(O);\r\n        return parent !== null ? OrdinaryGetMetadata(MetadataKey, parent, P) : undefined;\r\n    }\r\n    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarygetownmetadata--metadatakey-o-p-\r\n    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {\r\n        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ false);\r\n        return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);\r\n    }\r\n    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarydefineownmetadata--metadatakey-metadatavalue-o-p-\r\n    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {\r\n        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ true);\r\n        metadataMap.set(MetadataKey, MetadataValue);\r\n    }\r\n    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarymetadatakeys--o-p-\r\n    function OrdinaryMetadataKeys(O, P) {\r\n        var ownKeys = OrdinaryOwnMetadataKeys(O, P);\r\n        var parent = GetPrototypeOf(O);\r\n        if (parent === null)\r\n            return ownKeys;\r\n        var parentKeys = OrdinaryMetadataKeys(parent, P);\r\n        if (parentKeys.length <= 0)\r\n            return ownKeys;\r\n        if (ownKeys.length <= 0)\r\n            return parentKeys;\r\n        var keys = new _Set();\r\n        for (var _i = 0; _i < ownKeys.length; _i++) {\r\n            var key = ownKeys[_i];\r\n            keys.add(key);\r\n        }\r\n        for (var _a = 0; _a < parentKeys.length; _a++) {\r\n            var key = parentKeys[_a];\r\n            keys.add(key);\r\n        }\r\n        return getKeys(keys);\r\n    }\r\n    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryownmetadatakeys--o-p-\r\n    function OrdinaryOwnMetadataKeys(target, targetKey) {\r\n        var metadataMap = GetOrCreateMetadataMap(target, targetKey, /*create*/ false);\r\n        var keys = [];\r\n        if (metadataMap)\r\n            forEach(metadataMap, function (_, key) { return keys.push(key); });\r\n        return keys;\r\n    }\r\n    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-undefined-type\r\n    function IsUndefined(x) {\r\n        return x === undefined;\r\n    }\r\n    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray\r\n    function IsArray(x) {\r\n        return Array.isArray ? Array.isArray(x) : x instanceof Array || Object.prototype.toString.call(x) === \"[object Array]\";\r\n    }\r\n    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object-type\r\n    function IsObject(x) {\r\n        return typeof x === \"object\" ? x !== null : typeof x === \"function\";\r\n    }\r\n    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor\r\n    function IsConstructor(x) {\r\n        return typeof x === \"function\";\r\n    }\r\n    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-symbol-type\r\n    function IsSymbol(x) {\r\n        return typeof x === \"symbol\";\r\n    }\r\n    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey\r\n    function ToPropertyKey(value) {\r\n        return IsSymbol(value) ? value : String(value);\r\n    }\r\n    function GetPrototypeOf(O) {\r\n        var proto = Object.getPrototypeOf(O);\r\n        if (typeof O !== \"function\" || O === functionPrototype)\r\n            return proto;\r\n        // TypeScript doesn't set __proto__ in ES5, as it's non-standard.\r\n        // Try to determine the superclass Exampleonstructor. Compatible implementations\r\n        // must either set __proto__ on a subclass Exampleonstructor to the superclass Exampleonstructor,\r\n        // or ensure each class has a valid `constructor` property on its prototype that\r\n        // points back to the constructor.\r\n        // If this is not the same as Function.[[Prototype]], then this is definately inherited.\r\n        // This is the case when in ES6 or when using __proto__ in a compatible browser.\r\n        if (proto !== functionPrototype)\r\n            return proto;\r\n        // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.\r\n        var prototype = O.prototype;\r\n        var prototypeProto = prototype && Object.getPrototypeOf(prototype);\r\n        if (prototypeProto == null || prototypeProto === Object.prototype)\r\n            return proto;\r\n        // If the constructor was not a function, then we cannot determine the heritage.\r\n        var constructor = prototypeProto.constructor;\r\n        if (typeof constructor !== \"function\")\r\n            return proto;\r\n        // If we have some kind of self-reference, then we cannot determine the heritage.\r\n        if (constructor === O)\r\n            return proto;\r\n        // we have a pretty good guess at the heritage.\r\n        return constructor;\r\n    }\r\n    function IteratorStep(iterator) {\r\n        var result = iterator.next();\r\n        return result.done ? undefined : result;\r\n    }\r\n    function IteratorClose(iterator) {\r\n        var f = iterator[\"return\"];\r\n        if (f)\r\n            f.call(iterator);\r\n    }\r\n    function forEach(source, callback, thisArg) {\r\n        var entries = source.entries;\r\n        if (typeof entries === \"function\") {\r\n            var iterator = entries.call(source);\r\n            var result;\r\n            try {\r\n                while (result = IteratorStep(iterator)) {\r\n                    var _a = result.value, key = _a[0], value = _a[1];\r\n                    callback.call(thisArg, value, key, source);\r\n                }\r\n            }\r\n            finally {\r\n                if (result)\r\n                    IteratorClose(iterator);\r\n            }\r\n        }\r\n        else {\r\n            var forEach_1 = source.forEach;\r\n            if (typeof forEach_1 === \"function\") {\r\n                forEach_1.call(source, callback, thisArg);\r\n            }\r\n        }\r\n    }\r\n    function getKeys(source) {\r\n        var keys = [];\r\n        forEach(source, function (_, key) { keys.push(key); });\r\n        return keys;\r\n    }\r\n    // naive MapIterator shim\r\n    function CreateMapIterator(keys, values, kind) {\r\n        var index = 0;\r\n        return {\r\n            next: function () {\r\n                if ((keys || values) && index < (keys || values).length) {\r\n                    var current = index++;\r\n                    switch (kind) {\r\n                        case \"key\": return { value: keys[current], done: false };\r\n                        case \"value\": return { value: values[current], done: false };\r\n                        case \"key+value\": return { value: [keys[current], values[current]], done: false };\r\n                    }\r\n                }\r\n                keys = undefined;\r\n                values = undefined;\r\n                return { value: undefined, done: true };\r\n            },\r\n            \"throw\": function (error) {\r\n                if (keys || values) {\r\n                    keys = undefined;\r\n                    values = undefined;\r\n                }\r\n                throw error;\r\n            },\r\n            \"return\": function (value) {\r\n                if (keys || values) {\r\n                    keys = undefined;\r\n                    values = undefined;\r\n                }\r\n                return { value: value, done: true };\r\n            }\r\n        };\r\n    }\r\n    // naive Map shim\r\n    function CreateMapPolyfill() {\r\n        var cacheSentinel = {};\r\n        return (function () {\r\n            function Map() {\r\n                this._keys = [];\r\n                this._values = [];\r\n                this._cacheKey = cacheSentinel;\r\n                this._cacheIndex = -2;\r\n            }\r\n            Object.defineProperty(Map.prototype, \"size\", {\r\n                get: function () { return this._keys.length; },\r\n                enumerable: true,\r\n                configurable: true\r\n            });\r\n            Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };\r\n            Map.prototype.get = function (key) {\r\n                var index = this._find(key, /*insert*/ false);\r\n                return index >= 0 ? this._values[index] : undefined;\r\n            };\r\n            Map.prototype.set = function (key, value) {\r\n                var index = this._find(key, /*insert*/ true);\r\n                this._values[index] = value;\r\n                return this;\r\n            };\r\n            Map.prototype.delete = function (key) {\r\n                var index = this._find(key, /*insert*/ false);\r\n                if (index >= 0) {\r\n                    var size = this._keys.length;\r\n                    for (var i = index + 1; i < size; i++) {\r\n                        this._keys[i - 1] = this._keys[i];\r\n                        this._values[i - 1] = this._values[i];\r\n                    }\r\n                    this._keys.length--;\r\n                    this._values.length--;\r\n                    this._cacheKey = cacheSentinel;\r\n                    this._cacheIndex = -2;\r\n                    return true;\r\n                }\r\n                return false;\r\n            };\r\n            Map.prototype.clear = function () {\r\n                this._keys.length = 0;\r\n                this._values.length = 0;\r\n                this._cacheKey = cacheSentinel;\r\n                this._cacheIndex = -2;\r\n            };\r\n            Map.prototype.keys = function () { return CreateMapIterator(this._keys, /*values*/ undefined, \"key\"); };\r\n            Map.prototype.values = function () { return CreateMapIterator(/*keys*/ undefined, this._values, \"value\"); };\r\n            Map.prototype.entries = function () { return CreateMapIterator(this._keys, this._values, \"key+value\"); };\r\n            Map.prototype._find = function (key, insert) {\r\n                if (this._cacheKey === key)\r\n                    return this._cacheIndex;\r\n                var index = this._keys.indexOf(key);\r\n                if (index < 0 && insert) {\r\n                    index = this._keys.length;\r\n                    this._keys.push(key);\r\n                    this._values.push(undefined);\r\n                }\r\n                return this._cacheKey = key, this._cacheIndex = index;\r\n            };\r\n            return Map;\r\n        })();\r\n    }\r\n    // naive Set shim\r\n    function CreateSetPolyfill() {\r\n        return (function () {\r\n            function Set() {\r\n                this._map = new _Map();\r\n            }\r\n            Object.defineProperty(Set.prototype, \"size\", {\r\n                get: function () { return this._map.size; },\r\n                enumerable: true,\r\n                configurable: true\r\n            });\r\n            Set.prototype.has = function (value) { return this._map.has(value); };\r\n            Set.prototype.add = function (value) { return this._map.set(value, value), this; };\r\n            Set.prototype.delete = function (value) { return this._map.delete(value); };\r\n            Set.prototype.clear = function () { this._map.clear(); };\r\n            Set.prototype.keys = function () { return this._map.keys(); };\r\n            Set.prototype.values = function () { return this._map.values(); };\r\n            Set.prototype.entries = function () { return this._map.entries(); };\r\n            return Set;\r\n        })();\r\n    }\r\n    // naive WeakMap shim\r\n    function CreateWeakMapPolyfill() {\r\n        var UUID_SIZE = 16;\r\n        var keys = createDictionary();\r\n        var rootKey = CreateUniqueKey();\r\n        return (function () {\r\n            function WeakMap() {\r\n                this._key = CreateUniqueKey();\r\n            }\r\n            WeakMap.prototype.has = function (target) {\r\n                var table = GetOrCreateWeakMapTable(target, /*create*/ false);\r\n                return table !== undefined ? HashMap.has(table, this._key) : false;\r\n            };\r\n            WeakMap.prototype.get = function (target) {\r\n                var table = GetOrCreateWeakMapTable(target, /*create*/ false);\r\n                return table !== undefined ? HashMap.get(table, this._key) : undefined;\r\n            };\r\n            WeakMap.prototype.set = function (target, value) {\r\n                var table = GetOrCreateWeakMapTable(target, /*create*/ true);\r\n                table[this._key] = value;\r\n                return this;\r\n            };\r\n            WeakMap.prototype.delete = function (target) {\r\n                var table = GetOrCreateWeakMapTable(target, /*create*/ false);\r\n                return table !== undefined ? delete table[this._key] : false;\r\n            };\r\n            WeakMap.prototype.clear = function () {\r\n                // NOTE: not a real clear, just makes the previous data unreachable\r\n                this._key = CreateUniqueKey();\r\n            };\r\n            return WeakMap;\r\n        })();\r\n        function FillRandomBytes(buffer, size) {\r\n            for (var i = 0; i < size; ++i)\r\n                buffer[i] = Math.random() * 0xff | 0;\r\n            return buffer;\r\n        }\r\n        function GenRandomBytes(size) {\r\n            if (typeof Uint8Array === \"function\") {\r\n                if (typeof crypto !== \"undefined\")\r\n                    return crypto.getRandomValues(new Uint8Array(size));\r\n                if (typeof msCrypto !== \"undefined\")\r\n                    return msCrypto.getRandomValues(new Uint8Array(size));\r\n                return FillRandomBytes(new Uint8Array(size), size);\r\n            }\r\n            return FillRandomBytes(new Array(size), size);\r\n        }\r\n        function CreateUUID() {\r\n            var data = GenRandomBytes(UUID_SIZE);\r\n            // mark as random - RFC 4122 § 4.4\r\n            data[6] = data[6] & 0x4f | 0x40;\r\n            data[8] = data[8] & 0xbf | 0x80;\r\n            var result = \"\";\r\n            for (var offset = 0; offset < UUID_SIZE; ++offset) {\r\n                var byte = data[offset];\r\n                if (offset === 4 || offset === 6 || offset === 8)\r\n                    result += \"-\";\r\n                if (byte < 16)\r\n                    result += \"0\";\r\n                result += byte.toString(16).toLowerCase();\r\n            }\r\n            return result;\r\n        }\r\n        function CreateUniqueKey() {\r\n            var key;\r\n            do\r\n                key = \"@@WeakMap@@\" + CreateUUID();\r\n            while (HashMap.has(keys, key));\r\n            keys[key] = true;\r\n            return key;\r\n        }\r\n        function GetOrCreateWeakMapTable(target, create) {\r\n            if (!hasOwn.call(target, rootKey)) {\r\n                if (!create)\r\n                    return undefined;\r\n                Object.defineProperty(target, rootKey, { value: createDictionary() });\r\n            }\r\n            return target[rootKey];\r\n        }\r\n    }\r\n    // uses a heuristic used by v8 and chakra to force an object into dictionary mode.\r\n    function MakeDictionary(obj) {\r\n        obj.__DICTIONARY_MODE__ = 1;\r\n        delete obj.____DICTIONARY_MODE__;\r\n        return obj;\r\n    }\r\n    // patch global Reflect\r\n    (function (__global) {\r\n        if (typeof __global.Reflect !== \"undefined\") {\r\n            if (__global.Reflect !== Reflect) {\r\n                for (var p in Reflect) {\r\n                    if (hasOwn.call(Reflect, p)) {\r\n                        __global.Reflect[p] = Reflect[p];\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        else {\r\n            __global.Reflect = Reflect;\r\n        }\r\n    })(typeof window !== \"undefined\" ? window :\r\n        typeof WorkerGlobalScope !== \"undefined\" ? self :\r\n            typeof global !== \"undefined\" ? global :\r\n                Function(\"return this;\")());\r\n})(Reflect || (Reflect = {}));\r\n//# sourceMappingURL=Reflect.js.map\n/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/reflect-metadata/Reflect.js\n ** module id = 85\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///./~/reflect-metadata/Reflect.js?");

/***/ },

/***/ 86:
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function(global, process) {/**\n* @license\n* Copyright Google Inc. All Rights Reserved.\n*\n* Use of this source code is governed by an MIT-style license that can be\n* found in the LICENSE file at https://angular.io/license\n*/\n(function (global, factory) {\n     true ? factory() :\n    typeof define === 'function' && define.amd ? define(factory) :\n    (factory());\n}(this, (function () { 'use strict';\n\nvar Zone$1 = (function (global) {\n    if (global.Zone) {\n        throw new Error('Zone already loaded.');\n    }\n    var Zone = (function () {\n        function Zone(parent, zoneSpec) {\n            this._properties = null;\n            this._parent = parent;\n            this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';\n            this._properties = zoneSpec && zoneSpec.properties || {};\n            this._zoneDelegate = new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);\n        }\n        Zone.assertZonePatched = function () {\n            if (global.Promise !== ZoneAwarePromise) {\n                throw new Error(\"Zone.js has detected that ZoneAwarePromise `(window|global).Promise` \" +\n                    \"has been overwritten.\\n\" +\n                    \"Most likely cause is that a Promise polyfill has been loaded \" +\n                    \"after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. \" +\n                    \"If you must load one, do so before loading zone.js.)\");\n            }\n        };\n        Object.defineProperty(Zone, \"current\", {\n            get: function () { return _currentZone; },\n            enumerable: true,\n            configurable: true\n        });\n        \n        Object.defineProperty(Zone, \"currentTask\", {\n            get: function () { return _currentTask; },\n            enumerable: true,\n            configurable: true\n        });\n        \n        Object.defineProperty(Zone.prototype, \"parent\", {\n            get: function () { return this._parent; },\n            enumerable: true,\n            configurable: true\n        });\n        \n        Object.defineProperty(Zone.prototype, \"name\", {\n            get: function () { return this._name; },\n            enumerable: true,\n            configurable: true\n        });\n        \n        Zone.prototype.get = function (key) {\n            var zone = this.getZoneWith(key);\n            if (zone)\n                return zone._properties[key];\n        };\n        Zone.prototype.getZoneWith = function (key) {\n            var current = this;\n            while (current) {\n                if (current._properties.hasOwnProperty(key)) {\n                    return current;\n                }\n                current = current._parent;\n            }\n            return null;\n        };\n        Zone.prototype.fork = function (zoneSpec) {\n            if (!zoneSpec)\n                throw new Error('ZoneSpec required!');\n            return this._zoneDelegate.fork(this, zoneSpec);\n        };\n        Zone.prototype.wrap = function (callback, source) {\n            if (typeof callback !== 'function') {\n                throw new Error('Expecting function got: ' + callback);\n            }\n            var _callback = this._zoneDelegate.intercept(this, callback, source);\n            var zone = this;\n            return function () {\n                return zone.runGuarded(_callback, this, arguments, source);\n            };\n        };\n        Zone.prototype.run = function (callback, applyThis, applyArgs, source) {\n            if (applyThis === void 0) { applyThis = null; }\n            if (applyArgs === void 0) { applyArgs = null; }\n            if (source === void 0) { source = null; }\n            var oldZone = _currentZone;\n            _currentZone = this;\n            try {\n                return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);\n            }\n            finally {\n                _currentZone = oldZone;\n            }\n        };\n        Zone.prototype.runGuarded = function (callback, applyThis, applyArgs, source) {\n            if (applyThis === void 0) { applyThis = null; }\n            if (applyArgs === void 0) { applyArgs = null; }\n            if (source === void 0) { source = null; }\n            var oldZone = _currentZone;\n            _currentZone = this;\n            try {\n                try {\n                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);\n                }\n                catch (error) {\n                    if (this._zoneDelegate.handleError(this, error)) {\n                        throw error;\n                    }\n                }\n            }\n            finally {\n                _currentZone = oldZone;\n            }\n        };\n        Zone.prototype.runTask = function (task, applyThis, applyArgs) {\n            task.runCount++;\n            if (task.zone != this)\n                throw new Error('A task can only be run in the zone which created it! (Creation: ' +\n                    task.zone.name + '; Execution: ' + this.name + ')');\n            var previousTask = _currentTask;\n            _currentTask = task;\n            var oldZone = _currentZone;\n            _currentZone = this;\n            try {\n                if (task.type == 'macroTask' && task.data && !task.data.isPeriodic) {\n                    task.cancelFn = null;\n                }\n                try {\n                    return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);\n                }\n                catch (error) {\n                    if (this._zoneDelegate.handleError(this, error)) {\n                        throw error;\n                    }\n                }\n            }\n            finally {\n                _currentZone = oldZone;\n                _currentTask = previousTask;\n            }\n        };\n        Zone.prototype.scheduleMicroTask = function (source, callback, data, customSchedule) {\n            return this._zoneDelegate.scheduleTask(this, new ZoneTask('microTask', this, source, callback, data, customSchedule, null));\n        };\n        Zone.prototype.scheduleMacroTask = function (source, callback, data, customSchedule, customCancel) {\n            return this._zoneDelegate.scheduleTask(this, new ZoneTask('macroTask', this, source, callback, data, customSchedule, customCancel));\n        };\n        Zone.prototype.scheduleEventTask = function (source, callback, data, customSchedule, customCancel) {\n            return this._zoneDelegate.scheduleTask(this, new ZoneTask('eventTask', this, source, callback, data, customSchedule, customCancel));\n        };\n        Zone.prototype.cancelTask = function (task) {\n            var value = this._zoneDelegate.cancelTask(this, task);\n            task.runCount = -1;\n            task.cancelFn = null;\n            return value;\n        };\n        Zone.__symbol__ = __symbol__;\n        return Zone;\n    }());\n    \n    var ZoneDelegate = (function () {\n        function ZoneDelegate(zone, parentDelegate, zoneSpec) {\n            this._taskCounts = { microTask: 0, macroTask: 0, eventTask: 0 };\n            this.zone = zone;\n            this._parentDelegate = parentDelegate;\n            this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);\n            this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);\n            this._interceptZS = zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);\n            this._interceptDlgt = zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);\n            this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);\n            this._invokeDlgt = zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);\n            this._handleErrorZS = zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);\n            this._handleErrorDlgt = zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);\n            this._scheduleTaskZS = zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);\n            this._scheduleTaskDlgt = zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);\n            this._invokeTaskZS = zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);\n            this._invokeTaskDlgt = zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);\n            this._cancelTaskZS = zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);\n            this._cancelTaskDlgt = zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);\n            this._hasTaskZS = zoneSpec && (zoneSpec.onHasTask ? zoneSpec : parentDelegate._hasTaskZS);\n            this._hasTaskDlgt = zoneSpec && (zoneSpec.onHasTask ? parentDelegate : parentDelegate._hasTaskDlgt);\n        }\n        ZoneDelegate.prototype.fork = function (targetZone, zoneSpec) {\n            return this._forkZS\n                ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec)\n                : new Zone(targetZone, zoneSpec);\n        };\n        ZoneDelegate.prototype.intercept = function (targetZone, callback, source) {\n            return this._interceptZS\n                ? this._interceptZS.onIntercept(this._interceptDlgt, this.zone, targetZone, callback, source)\n                : callback;\n        };\n        ZoneDelegate.prototype.invoke = function (targetZone, callback, applyThis, applyArgs, source) {\n            return this._invokeZS\n                ? this._invokeZS.onInvoke(this._invokeDlgt, this.zone, targetZone, callback, applyThis, applyArgs, source)\n                : callback.apply(applyThis, applyArgs);\n        };\n        ZoneDelegate.prototype.handleError = function (targetZone, error) {\n            return this._handleErrorZS\n                ? this._handleErrorZS.onHandleError(this._handleErrorDlgt, this.zone, targetZone, error)\n                : true;\n        };\n        ZoneDelegate.prototype.scheduleTask = function (targetZone, task) {\n            try {\n                if (this._scheduleTaskZS) {\n                    return this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this.zone, targetZone, task);\n                }\n                else if (task.scheduleFn) {\n                    task.scheduleFn(task);\n                }\n                else if (task.type == 'microTask') {\n                    scheduleMicroTask(task);\n                }\n                else {\n                    throw new Error('Task is missing scheduleFn.');\n                }\n                return task;\n            }\n            finally {\n                if (targetZone == this.zone) {\n                    this._updateTaskCount(task.type, 1);\n                }\n            }\n        };\n        ZoneDelegate.prototype.invokeTask = function (targetZone, task, applyThis, applyArgs) {\n            try {\n                return this._invokeTaskZS\n                    ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this.zone, targetZone, task, applyThis, applyArgs)\n                    : task.callback.apply(applyThis, applyArgs);\n            }\n            finally {\n                if (targetZone == this.zone && (task.type != 'eventTask') && !(task.data && task.data.isPeriodic)) {\n                    this._updateTaskCount(task.type, -1);\n                }\n            }\n        };\n        ZoneDelegate.prototype.cancelTask = function (targetZone, task) {\n            var value;\n            if (this._cancelTaskZS) {\n                value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this.zone, targetZone, task);\n            }\n            else if (!task.cancelFn) {\n                throw new Error('Task does not support cancellation, or is already canceled.');\n            }\n            else {\n                value = task.cancelFn(task);\n            }\n            if (targetZone == this.zone) {\n                // this should not be in the finally block, because exceptions assume not canceled.\n                this._updateTaskCount(task.type, -1);\n            }\n            return value;\n        };\n        ZoneDelegate.prototype.hasTask = function (targetZone, isEmpty) {\n            return this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this.zone, targetZone, isEmpty);\n        };\n        ZoneDelegate.prototype._updateTaskCount = function (type, count) {\n            var counts = this._taskCounts;\n            var prev = counts[type];\n            var next = counts[type] = prev + count;\n            if (next < 0) {\n                throw new Error('More tasks executed then were scheduled.');\n            }\n            if (prev == 0 || next == 0) {\n                var isEmpty = {\n                    microTask: counts.microTask > 0,\n                    macroTask: counts.macroTask > 0,\n                    eventTask: counts.eventTask > 0,\n                    change: type\n                };\n                try {\n                    this.hasTask(this.zone, isEmpty);\n                }\n                finally {\n                    if (this._parentDelegate) {\n                        this._parentDelegate._updateTaskCount(type, count);\n                    }\n                }\n            }\n        };\n        return ZoneDelegate;\n    }());\n    var ZoneTask = (function () {\n        function ZoneTask(type, zone, source, callback, options, scheduleFn, cancelFn) {\n            this.runCount = 0;\n            this.type = type;\n            this.zone = zone;\n            this.source = source;\n            this.data = options;\n            this.scheduleFn = scheduleFn;\n            this.cancelFn = cancelFn;\n            this.callback = callback;\n            var self = this;\n            this.invoke = function () {\n                _numberOfNestedTaskFrames++;\n                try {\n                    return zone.runTask(self, this, arguments);\n                }\n                finally {\n                    if (_numberOfNestedTaskFrames == 1) {\n                        drainMicroTaskQueue();\n                    }\n                    _numberOfNestedTaskFrames--;\n                }\n            };\n        }\n        ZoneTask.prototype.toString = function () {\n            if (this.data && typeof this.data.handleId !== 'undefined') {\n                return this.data.handleId;\n            }\n            else {\n                return this.toString();\n            }\n        };\n        return ZoneTask;\n    }());\n    function __symbol__(name) { return '__zone_symbol__' + name; }\n    \n    var symbolSetTimeout = __symbol__('setTimeout');\n    var symbolPromise = __symbol__('Promise');\n    var symbolThen = __symbol__('then');\n    var _currentZone = new Zone(null, null);\n    var _currentTask = null;\n    var _microTaskQueue = [];\n    var _isDrainingMicrotaskQueue = false;\n    var _uncaughtPromiseErrors = [];\n    var _numberOfNestedTaskFrames = 0;\n    function scheduleQueueDrain() {\n        // if we are not running in any task, and there has not been anything scheduled\n        // we must bootstrap the initial task creation by manually scheduling the drain\n        if (_numberOfNestedTaskFrames == 0 && _microTaskQueue.length == 0) {\n            // We are not running in Task, so we need to kickstart the microtask queue.\n            if (global[symbolPromise]) {\n                global[symbolPromise].resolve(0)[symbolThen](drainMicroTaskQueue);\n            }\n            else {\n                global[symbolSetTimeout](drainMicroTaskQueue, 0);\n            }\n        }\n    }\n    function scheduleMicroTask(task) {\n        scheduleQueueDrain();\n        _microTaskQueue.push(task);\n    }\n    function consoleError(e) {\n        var rejection = e && e.rejection;\n        if (rejection) {\n            console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);\n        }\n        console.error(e);\n    }\n    function drainMicroTaskQueue() {\n        if (!_isDrainingMicrotaskQueue) {\n            _isDrainingMicrotaskQueue = true;\n            while (_microTaskQueue.length) {\n                var queue = _microTaskQueue;\n                _microTaskQueue = [];\n                for (var i = 0; i < queue.length; i++) {\n                    var task = queue[i];\n                    try {\n                        task.zone.runTask(task, null, null);\n                    }\n                    catch (e) {\n                        consoleError(e);\n                    }\n                }\n            }\n            while (_uncaughtPromiseErrors.length) {\n                var _loop_1 = function() {\n                    var uncaughtPromiseError = _uncaughtPromiseErrors.shift();\n                    try {\n                        uncaughtPromiseError.zone.runGuarded(function () { throw uncaughtPromiseError; });\n                    }\n                    catch (e) {\n                        consoleError(e);\n                    }\n                };\n                while (_uncaughtPromiseErrors.length) {\n                    _loop_1();\n                }\n            }\n            _isDrainingMicrotaskQueue = false;\n        }\n    }\n    function isThenable(value) {\n        return value && value.then;\n    }\n    function forwardResolution(value) { return value; }\n    function forwardRejection(rejection) { return ZoneAwarePromise.reject(rejection); }\n    var symbolState = __symbol__('state');\n    var symbolValue = __symbol__('value');\n    var source = 'Promise.then';\n    var UNRESOLVED = null;\n    var RESOLVED = true;\n    var REJECTED = false;\n    var REJECTED_NO_CATCH = 0;\n    function makeResolver(promise, state) {\n        return function (v) {\n            resolvePromise(promise, state, v);\n            // Do not return value or you will break the Promise spec.\n        };\n    }\n    function resolvePromise(promise, state, value) {\n        if (promise[symbolState] === UNRESOLVED) {\n            if (value instanceof ZoneAwarePromise && value[symbolState] !== UNRESOLVED) {\n                clearRejectedNoCatch(value);\n                resolvePromise(promise, value[symbolState], value[symbolValue]);\n            }\n            else if (isThenable(value)) {\n                value.then(makeResolver(promise, state), makeResolver(promise, false));\n            }\n            else {\n                promise[symbolState] = state;\n                var queue = promise[symbolValue];\n                promise[symbolValue] = value;\n                for (var i = 0; i < queue.length;) {\n                    scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);\n                }\n                if (queue.length == 0 && state == REJECTED) {\n                    promise[symbolState] = REJECTED_NO_CATCH;\n                    try {\n                        throw new Error(\"Uncaught (in promise): \" + value);\n                    }\n                    catch (e) {\n                        var error_1 = e;\n                        error_1.rejection = value;\n                        error_1.promise = promise;\n                        error_1.zone = Zone.current;\n                        error_1.task = Zone.currentTask;\n                        _uncaughtPromiseErrors.push(error_1);\n                        scheduleQueueDrain();\n                    }\n                }\n            }\n        }\n        // Resolving an already resolved promise is a noop.\n        return promise;\n    }\n    function clearRejectedNoCatch(promise) {\n        if (promise[symbolState] === REJECTED_NO_CATCH) {\n            promise[symbolState] = REJECTED;\n            for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {\n                if (promise === _uncaughtPromiseErrors[i].promise) {\n                    _uncaughtPromiseErrors.splice(i, 1);\n                    break;\n                }\n            }\n        }\n    }\n    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {\n        clearRejectedNoCatch(promise);\n        var delegate = promise[symbolState] ? onFulfilled || forwardResolution : onRejected || forwardRejection;\n        zone.scheduleMicroTask(source, function () {\n            try {\n                resolvePromise(chainPromise, true, zone.run(delegate, null, [promise[symbolValue]]));\n            }\n            catch (error) {\n                resolvePromise(chainPromise, false, error);\n            }\n        });\n    }\n    var ZoneAwarePromise = (function () {\n        function ZoneAwarePromise(executor) {\n            var promise = this;\n            if (!(promise instanceof ZoneAwarePromise)) {\n                throw new Error('Must be an instanceof Promise.');\n            }\n            promise[symbolState] = UNRESOLVED;\n            promise[symbolValue] = []; // queue;\n            try {\n                executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));\n            }\n            catch (e) {\n                resolvePromise(promise, false, e);\n            }\n        }\n        ZoneAwarePromise.resolve = function (value) {\n            return resolvePromise(new this(null), RESOLVED, value);\n        };\n        ZoneAwarePromise.reject = function (error) {\n            return resolvePromise(new this(null), REJECTED, error);\n        };\n        ZoneAwarePromise.race = function (values) {\n            var resolve;\n            var reject;\n            var promise = new this(function (res, rej) { resolve = res; reject = rej; });\n            function onResolve(value) { promise && (promise = null || resolve(value)); }\n            function onReject(error) { promise && (promise = null || reject(error)); }\n            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {\n                var value = values_1[_i];\n                if (!isThenable(value)) {\n                    value = this.resolve(value);\n                }\n                value.then(onResolve, onReject);\n            }\n            return promise;\n        };\n        ZoneAwarePromise.all = function (values) {\n            var resolve;\n            var reject;\n            var promise = new this(function (res, rej) { resolve = res; reject = rej; });\n            var count = 0;\n            var resolvedValues = [];\n            for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {\n                var value = values_2[_i];\n                if (!isThenable(value)) {\n                    value = this.resolve(value);\n                }\n                value.then((function (index) { return function (value) {\n                    resolvedValues[index] = value;\n                    count--;\n                    if (!count) {\n                        resolve(resolvedValues);\n                    }\n                }; })(count), reject);\n                count++;\n            }\n            if (!count)\n                resolve(resolvedValues);\n            return promise;\n        };\n        ZoneAwarePromise.prototype.then = function (onFulfilled, onRejected) {\n            var chainPromise = new this.constructor(null);\n            var zone = Zone.current;\n            if (this[symbolState] == UNRESOLVED) {\n                this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);\n            }\n            else {\n                scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);\n            }\n            return chainPromise;\n        };\n        ZoneAwarePromise.prototype.catch = function (onRejected) {\n            return this.then(null, onRejected);\n        };\n        return ZoneAwarePromise;\n    }());\n    // Protect against aggressive optimizers dropping seemingly unused properties.\n    // E.g. Closure Compiler in advanced mode.\n    ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;\n    ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;\n    ZoneAwarePromise['race'] = ZoneAwarePromise.race;\n    ZoneAwarePromise['all'] = ZoneAwarePromise.all;\n    var NativePromise = global[__symbol__('Promise')] = global.Promise;\n    global.Promise = ZoneAwarePromise;\n    function patchThen(NativePromise) {\n        var NativePromiseProtototype = NativePromise.prototype;\n        var NativePromiseThen = NativePromiseProtototype[__symbol__('then')]\n            = NativePromiseProtototype.then;\n        NativePromiseProtototype.then = function (onResolve, onReject) {\n            var nativePromise = this;\n            return new ZoneAwarePromise(function (resolve, reject) {\n                NativePromiseThen.call(nativePromise, resolve, reject);\n            }).then(onResolve, onReject);\n        };\n    }\n    if (NativePromise) {\n        patchThen(NativePromise);\n        if (typeof global['fetch'] !== 'undefined') {\n            var fetchPromise = void 0;\n            try {\n                // In MS Edge this throws\n                fetchPromise = global['fetch']();\n            }\n            catch (e) {\n                // In Chrome this throws instead.\n                fetchPromise = global['fetch']('about:blank');\n            }\n            // ignore output to prevent error;\n            fetchPromise.then(function () { return null; }, function () { return null; });\n            if (fetchPromise.constructor != NativePromise) {\n                patchThen(fetchPromise.constructor);\n            }\n        }\n    }\n    // This is not part of public API, but it is usefull for tests, so we expose it.\n    Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;\n    return global.Zone = Zone;\n})(typeof window === 'object' && window || typeof self === 'object' && self || global);\n\n/**\n * Suppress closure compiler errors about unknown 'process' variable\n * @fileoverview\n * @suppress {undefinedVars}\n */\nvar zoneSymbol = Zone['__symbol__'];\nvar _global$1 = typeof window === 'object' && window || typeof self === 'object' && self || global;\nfunction bindArguments(args, source) {\n    for (var i = args.length - 1; i >= 0; i--) {\n        if (typeof args[i] === 'function') {\n            args[i] = Zone.current.wrap(args[i], source + '_' + i);\n        }\n    }\n    return args;\n}\n\nfunction patchPrototype(prototype, fnNames) {\n    var source = prototype.constructor['name'];\n    var _loop_1 = function(i) {\n        var name_1 = fnNames[i];\n        var delegate = prototype[name_1];\n        if (delegate) {\n            prototype[name_1] = (function (delegate) {\n                return function () {\n                    return delegate.apply(this, bindArguments(arguments, source + '.' + name_1));\n                };\n            })(delegate);\n        }\n    };\n    for (var i = 0; i < fnNames.length; i++) {\n        _loop_1(i);\n    }\n}\n\nvar isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);\nvar isNode = (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]');\nvar isBrowser = !isNode && !isWebWorker && !!(typeof window !== 'undefined' && window['HTMLElement']);\nfunction patchProperty(obj, prop) {\n    var desc = Object.getOwnPropertyDescriptor(obj, prop) || {\n        enumerable: true,\n        configurable: true\n    };\n    // A property descriptor cannot have getter/setter and be writable\n    // deleting the writable and value properties avoids this error:\n    //\n    // TypeError: property descriptors must not specify a value or be writable when a\n    // getter or setter has been specified\n    delete desc.writable;\n    delete desc.value;\n    // substr(2) cuz 'onclick' -> 'click', etc\n    var eventName = prop.substr(2);\n    var _prop = '_' + prop;\n    desc.set = function (fn) {\n        if (this[_prop]) {\n            this.removeEventListener(eventName, this[_prop]);\n        }\n        if (typeof fn === 'function') {\n            var wrapFn = function (event) {\n                var result;\n                result = fn.apply(this, arguments);\n                if (result != undefined && !result)\n                    event.preventDefault();\n            };\n            this[_prop] = wrapFn;\n            this.addEventListener(eventName, wrapFn, false);\n        }\n        else {\n            this[_prop] = null;\n        }\n    };\n    // The getter would return undefined for unassigned properties but the default value of an unassigned property is null\n    desc.get = function () {\n        return this[_prop] || null;\n    };\n    Object.defineProperty(obj, prop, desc);\n}\n\nfunction patchOnProperties(obj, properties) {\n    var onProperties = [];\n    for (var prop in obj) {\n        if (prop.substr(0, 2) == 'on') {\n            onProperties.push(prop);\n        }\n    }\n    for (var j = 0; j < onProperties.length; j++) {\n        patchProperty(obj, onProperties[j]);\n    }\n    if (properties) {\n        for (var i = 0; i < properties.length; i++) {\n            patchProperty(obj, 'on' + properties[i]);\n        }\n    }\n}\n\nvar EVENT_TASKS = zoneSymbol('eventTasks');\n// For EventTarget\nvar ADD_EVENT_LISTENER = 'addEventListener';\nvar REMOVE_EVENT_LISTENER = 'removeEventListener';\nfunction findExistingRegisteredTask(target, handler, name, capture, remove) {\n    var eventTasks = target[EVENT_TASKS];\n    if (eventTasks) {\n        for (var i = 0; i < eventTasks.length; i++) {\n            var eventTask = eventTasks[i];\n            var data = eventTask.data;\n            if (data.handler === handler\n                && data.useCapturing === capture\n                && data.eventName === name) {\n                if (remove) {\n                    eventTasks.splice(i, 1);\n                }\n                return eventTask;\n            }\n        }\n    }\n    return null;\n}\nfunction attachRegisteredEvent(target, eventTask) {\n    var eventTasks = target[EVENT_TASKS];\n    if (!eventTasks) {\n        eventTasks = target[EVENT_TASKS] = [];\n    }\n    eventTasks.push(eventTask);\n}\nfunction makeZoneAwareAddListener(addFnName, removeFnName, useCapturingParam, allowDuplicates) {\n    if (useCapturingParam === void 0) { useCapturingParam = true; }\n    if (allowDuplicates === void 0) { allowDuplicates = false; }\n    var addFnSymbol = zoneSymbol(addFnName);\n    var removeFnSymbol = zoneSymbol(removeFnName);\n    var defaultUseCapturing = useCapturingParam ? false : undefined;\n    function scheduleEventListener(eventTask) {\n        var meta = eventTask.data;\n        attachRegisteredEvent(meta.target, eventTask);\n        return meta.target[addFnSymbol](meta.eventName, eventTask.invoke, meta.useCapturing);\n    }\n    function cancelEventListener(eventTask) {\n        var meta = eventTask.data;\n        findExistingRegisteredTask(meta.target, eventTask.invoke, meta.eventName, meta.useCapturing, true);\n        meta.target[removeFnSymbol](meta.eventName, eventTask.invoke, meta.useCapturing);\n    }\n    return function zoneAwareAddListener(self, args) {\n        var eventName = args[0];\n        var handler = args[1];\n        var useCapturing = args[2] || defaultUseCapturing;\n        // - Inside a Web Worker, `this` is undefined, the context is `global`\n        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined\n        // see https://github.com/angular/zone.js/issues/190\n        var target = self || _global$1;\n        var delegate = null;\n        if (typeof handler == 'function') {\n            delegate = handler;\n        }\n        else if (handler && handler.handleEvent) {\n            delegate = function (event) { return handler.handleEvent(event); };\n        }\n        var validZoneHandler = false;\n        try {\n            // In cross site contexts (such as WebDriver frameworks like Selenium),\n            // accessing the handler object here will cause an exception to be thrown which\n            // will fail tests prematurely.\n            validZoneHandler = handler && handler.toString() === \"[object FunctionWrapper]\";\n        }\n        catch (e) {\n            // Returning nothing here is fine, because objects in a cross-site context are unusable\n            return;\n        }\n        // Ignore special listeners of IE11 & Edge dev tools, see https://github.com/angular/zone.js/issues/150\n        if (!delegate || validZoneHandler) {\n            return target[addFnSymbol](eventName, handler, useCapturing);\n        }\n        if (!allowDuplicates) {\n            var eventTask = findExistingRegisteredTask(target, handler, eventName, useCapturing, false);\n            if (eventTask) {\n                // we already registered, so this will have noop.\n                return target[addFnSymbol](eventName, eventTask.invoke, useCapturing);\n            }\n        }\n        var zone = Zone.current;\n        var source = target.constructor['name'] + '.' + addFnName + ':' + eventName;\n        var data = {\n            target: target,\n            eventName: eventName,\n            name: eventName,\n            useCapturing: useCapturing,\n            handler: handler\n        };\n        zone.scheduleEventTask(source, delegate, data, scheduleEventListener, cancelEventListener);\n    };\n}\nfunction makeZoneAwareRemoveListener(fnName, useCapturingParam) {\n    if (useCapturingParam === void 0) { useCapturingParam = true; }\n    var symbol = zoneSymbol(fnName);\n    var defaultUseCapturing = useCapturingParam ? false : undefined;\n    return function zoneAwareRemoveListener(self, args) {\n        var eventName = args[0];\n        var handler = args[1];\n        var useCapturing = args[2] || defaultUseCapturing;\n        // - Inside a Web Worker, `this` is undefined, the context is `global`\n        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined\n        // see https://github.com/angular/zone.js/issues/190\n        var target = self || _global$1;\n        var eventTask = findExistingRegisteredTask(target, handler, eventName, useCapturing, true);\n        if (eventTask) {\n            eventTask.zone.cancelTask(eventTask);\n        }\n        else {\n            target[symbol](eventName, handler, useCapturing);\n        }\n    };\n}\n\nvar zoneAwareAddEventListener = makeZoneAwareAddListener(ADD_EVENT_LISTENER, REMOVE_EVENT_LISTENER);\nvar zoneAwareRemoveEventListener = makeZoneAwareRemoveListener(REMOVE_EVENT_LISTENER);\nfunction patchEventTargetMethods(obj) {\n    if (obj && obj.addEventListener) {\n        patchMethod(obj, ADD_EVENT_LISTENER, function () { return zoneAwareAddEventListener; });\n        patchMethod(obj, REMOVE_EVENT_LISTENER, function () { return zoneAwareRemoveEventListener; });\n        return true;\n    }\n    else {\n        return false;\n    }\n}\nvar originalInstanceKey = zoneSymbol('originalInstance');\n// wrap some native API on `window`\nfunction patchClass(className) {\n    var OriginalClass = _global$1[className];\n    if (!OriginalClass)\n        return;\n    _global$1[className] = function () {\n        var a = bindArguments(arguments, className);\n        switch (a.length) {\n            case 0:\n                this[originalInstanceKey] = new OriginalClass();\n                break;\n            case 1:\n                this[originalInstanceKey] = new OriginalClass(a[0]);\n                break;\n            case 2:\n                this[originalInstanceKey] = new OriginalClass(a[0], a[1]);\n                break;\n            case 3:\n                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);\n                break;\n            case 4:\n                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);\n                break;\n            default: throw new Error('Arg list too long.');\n        }\n    };\n    var instance = new OriginalClass(function () { });\n    var prop;\n    for (prop in instance) {\n        // https://bugs.webkit.org/show_bug.cgi?id=44721\n        if (className === 'XMLHttpRequest' && prop === 'responseBlob')\n            continue;\n        (function (prop) {\n            if (typeof instance[prop] === 'function') {\n                _global$1[className].prototype[prop] = function () {\n                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);\n                };\n            }\n            else {\n                Object.defineProperty(_global$1[className].prototype, prop, {\n                    set: function (fn) {\n                        if (typeof fn === 'function') {\n                            this[originalInstanceKey][prop] = Zone.current.wrap(fn, className + '.' + prop);\n                        }\n                        else {\n                            this[originalInstanceKey][prop] = fn;\n                        }\n                    },\n                    get: function () {\n                        return this[originalInstanceKey][prop];\n                    }\n                });\n            }\n        }(prop));\n    }\n    for (prop in OriginalClass) {\n        if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {\n            _global$1[className][prop] = OriginalClass[prop];\n        }\n    }\n}\n\nfunction createNamedFn(name, delegate) {\n    try {\n        return (Function('f', \"return function \" + name + \"(){return f(this, arguments)}\"))(delegate);\n    }\n    catch (e) {\n        // if we fail, we must be CSP, just return delegate.\n        return function () {\n            return delegate(this, arguments);\n        };\n    }\n}\nfunction patchMethod(target, name, patchFn) {\n    var proto = target;\n    while (proto && !proto.hasOwnProperty(name)) {\n        proto = Object.getPrototypeOf(proto);\n    }\n    if (!proto && target[name]) {\n        // somehow we did not find it, but we can see it. This happens on IE for Window properties.\n        proto = target;\n    }\n    var delegateName = zoneSymbol(name);\n    var delegate;\n    if (proto && !(delegate = proto[delegateName])) {\n        delegate = proto[delegateName] = proto[name];\n        proto[name] = createNamedFn(name, patchFn(delegate, delegateName, name));\n    }\n    return delegate;\n}\n\nvar WTF_ISSUE_555 = 'Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video';\nvar NO_EVENT_TARGET = 'ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex'.split(',');\nvar EVENT_TARGET = 'EventTarget';\nfunction eventTargetPatch(_global) {\n    var apis = [];\n    var isWtf = _global['wtf'];\n    if (isWtf) {\n        // Workaround for: https://github.com/google/tracing-framework/issues/555\n        apis = WTF_ISSUE_555.split(',').map(function (v) { return 'HTML' + v + 'Element'; }).concat(NO_EVENT_TARGET);\n    }\n    else if (_global[EVENT_TARGET]) {\n        apis.push(EVENT_TARGET);\n    }\n    else {\n        // Note: EventTarget is not available in all browsers,\n        // if it's not available, we instead patch the APIs in the IDL that inherit from EventTarget\n        apis = NO_EVENT_TARGET;\n    }\n    for (var i = 0; i < apis.length; i++) {\n        var type = _global[apis[i]];\n        patchEventTargetMethods(type && type.prototype);\n    }\n}\n\n/*\n * This is necessary for Chrome and Chrome mobile, to enable\n * things like redefining `createdCallback` on an element.\n */\nvar _defineProperty = Object[zoneSymbol('defineProperty')] = Object.defineProperty;\nvar _getOwnPropertyDescriptor = Object[zoneSymbol('getOwnPropertyDescriptor')] = Object.getOwnPropertyDescriptor;\nvar _create = Object.create;\nvar unconfigurablesKey = zoneSymbol('unconfigurables');\nfunction propertyPatch() {\n    Object.defineProperty = function (obj, prop, desc) {\n        if (isUnconfigurable(obj, prop)) {\n            throw new TypeError('Cannot assign to read only property \\'' + prop + '\\' of ' + obj);\n        }\n        var originalConfigurableFlag = desc.configurable;\n        if (prop !== 'prototype') {\n            desc = rewriteDescriptor(obj, prop, desc);\n        }\n        return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);\n    };\n    Object.defineProperties = function (obj, props) {\n        Object.keys(props).forEach(function (prop) {\n            Object.defineProperty(obj, prop, props[prop]);\n        });\n        return obj;\n    };\n    Object.create = function (obj, proto) {\n        if (typeof proto === 'object' && !Object.isFrozen(proto)) {\n            Object.keys(proto).forEach(function (prop) {\n                proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);\n            });\n        }\n        return _create(obj, proto);\n    };\n    Object.getOwnPropertyDescriptor = function (obj, prop) {\n        var desc = _getOwnPropertyDescriptor(obj, prop);\n        if (isUnconfigurable(obj, prop)) {\n            desc.configurable = false;\n        }\n        return desc;\n    };\n}\n\nfunction _redefineProperty(obj, prop, desc) {\n    var originalConfigurableFlag = desc.configurable;\n    desc = rewriteDescriptor(obj, prop, desc);\n    return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);\n}\n\nfunction isUnconfigurable(obj, prop) {\n    return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];\n}\nfunction rewriteDescriptor(obj, prop, desc) {\n    desc.configurable = true;\n    if (!desc.configurable) {\n        if (!obj[unconfigurablesKey]) {\n            _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });\n        }\n        obj[unconfigurablesKey][prop] = true;\n    }\n    return desc;\n}\nfunction _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {\n    try {\n        return _defineProperty(obj, prop, desc);\n    }\n    catch (e) {\n        if (desc.configurable) {\n            // In case of errors, when the configurable flag was likely set by rewriteDescriptor(), let's retry with the original flag value\n            if (typeof originalConfigurableFlag == 'undefined') {\n                delete desc.configurable;\n            }\n            else {\n                desc.configurable = originalConfigurableFlag;\n            }\n            try {\n                return _defineProperty(obj, prop, desc);\n            }\n            catch (e) {\n                var descJson = null;\n                try {\n                    descJson = JSON.stringify(desc);\n                }\n                catch (e) {\n                    descJson = descJson.toString();\n                }\n                console.log(\"Attempting to configure '\" + prop + \"' with descriptor '\" + descJson + \"' on object '\" + obj + \"' and got error, giving up: \" + e);\n            }\n        }\n        else {\n            throw e;\n        }\n    }\n}\n\nfunction registerElementPatch(_global) {\n    if (!isBrowser || !('registerElement' in _global.document)) {\n        return;\n    }\n    var _registerElement = document.registerElement;\n    var callbacks = [\n        'createdCallback',\n        'attachedCallback',\n        'detachedCallback',\n        'attributeChangedCallback'\n    ];\n    document.registerElement = function (name, opts) {\n        if (opts && opts.prototype) {\n            callbacks.forEach(function (callback) {\n                var source = 'Document.registerElement::' + callback;\n                if (opts.prototype.hasOwnProperty(callback)) {\n                    var descriptor = Object.getOwnPropertyDescriptor(opts.prototype, callback);\n                    if (descriptor && descriptor.value) {\n                        descriptor.value = Zone.current.wrap(descriptor.value, source);\n                        _redefineProperty(opts.prototype, callback, descriptor);\n                    }\n                    else {\n                        opts.prototype[callback] = Zone.current.wrap(opts.prototype[callback], source);\n                    }\n                }\n                else if (opts.prototype[callback]) {\n                    opts.prototype[callback] = Zone.current.wrap(opts.prototype[callback], source);\n                }\n            });\n        }\n        return _registerElement.apply(document, [name, opts]);\n    };\n}\n\n// we have to patch the instance since the proto is non-configurable\nfunction apply(_global) {\n    var WS = _global.WebSocket;\n    // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener\n    // On older Chrome, no need since EventTarget was already patched\n    if (!_global.EventTarget) {\n        patchEventTargetMethods(WS.prototype);\n    }\n    _global.WebSocket = function (a, b) {\n        var socket = arguments.length > 1 ? new WS(a, b) : new WS(a);\n        var proxySocket;\n        // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance\n        var onmessageDesc = Object.getOwnPropertyDescriptor(socket, 'onmessage');\n        if (onmessageDesc && onmessageDesc.configurable === false) {\n            proxySocket = Object.create(socket);\n            ['addEventListener', 'removeEventListener', 'send', 'close'].forEach(function (propName) {\n                proxySocket[propName] = function () {\n                    return socket[propName].apply(socket, arguments);\n                };\n            });\n        }\n        else {\n            // we can patch the real socket\n            proxySocket = socket;\n        }\n        patchOnProperties(proxySocket, ['close', 'error', 'message', 'open']);\n        return proxySocket;\n    };\n    for (var prop in WS) {\n        _global.WebSocket[prop] = WS[prop];\n    }\n}\n\nvar eventNames = 'copy cut paste abort blur focus canplay canplaythrough change click contextmenu dblclick drag dragend dragenter dragleave dragover dragstart drop durationchange emptied ended input invalid keydown keypress keyup load loadeddata loadedmetadata loadstart message mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup pause play playing progress ratechange reset scroll seeked seeking select show stalled submit suspend timeupdate volumechange waiting mozfullscreenchange mozfullscreenerror mozpointerlockchange mozpointerlockerror error webglcontextrestored webglcontextlost webglcontextcreationerror'.split(' ');\nfunction propertyDescriptorPatch(_global) {\n    if (isNode) {\n        return;\n    }\n    var supportsWebSocket = typeof WebSocket !== 'undefined';\n    if (canPatchViaPropertyDescriptor()) {\n        // for browsers that we can patch the descriptor:  Chrome & Firefox\n        if (isBrowser) {\n            patchOnProperties(HTMLElement.prototype, eventNames);\n        }\n        patchOnProperties(XMLHttpRequest.prototype, null);\n        if (typeof IDBIndex !== 'undefined') {\n            patchOnProperties(IDBIndex.prototype, null);\n            patchOnProperties(IDBRequest.prototype, null);\n            patchOnProperties(IDBOpenDBRequest.prototype, null);\n            patchOnProperties(IDBDatabase.prototype, null);\n            patchOnProperties(IDBTransaction.prototype, null);\n            patchOnProperties(IDBCursor.prototype, null);\n        }\n        if (supportsWebSocket) {\n            patchOnProperties(WebSocket.prototype, null);\n        }\n    }\n    else {\n        // Safari, Android browsers (Jelly Bean)\n        patchViaCapturingAllTheEvents();\n        patchClass('XMLHttpRequest');\n        if (supportsWebSocket) {\n            apply(_global);\n        }\n    }\n}\nfunction canPatchViaPropertyDescriptor() {\n    if (isBrowser && !Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onclick')\n        && typeof Element !== 'undefined') {\n        // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364\n        // IDL interface attributes are not configurable\n        var desc = Object.getOwnPropertyDescriptor(Element.prototype, 'onclick');\n        if (desc && !desc.configurable)\n            return false;\n    }\n    Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {\n        get: function () {\n            return true;\n        }\n    });\n    var req = new XMLHttpRequest();\n    var result = !!req.onreadystatechange;\n    Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {});\n    return result;\n}\n\nvar unboundKey = zoneSymbol('unbound');\n// Whenever any eventListener fires, we check the eventListener target and all parents\n// for `onwhatever` properties and replace them with zone-bound functions\n// - Chrome (for now)\nfunction patchViaCapturingAllTheEvents() {\n    var _loop_1 = function(i) {\n        var property = eventNames[i];\n        var onproperty = 'on' + property;\n        document.addEventListener(property, function (event) {\n            var elt = event.target, bound, source;\n            if (elt) {\n                source = elt.constructor['name'] + '.' + onproperty;\n            }\n            else {\n                source = 'unknown.' + onproperty;\n            }\n            while (elt) {\n                if (elt[onproperty] && !elt[onproperty][unboundKey]) {\n                    bound = Zone.current.wrap(elt[onproperty], source);\n                    bound[unboundKey] = elt[onproperty];\n                    elt[onproperty] = bound;\n                }\n                elt = elt.parentElement;\n            }\n        }, true);\n    };\n    for (var i = 0; i < eventNames.length; i++) {\n        _loop_1(i);\n    }\n    \n}\n\nfunction patchTimer(window, setName, cancelName, nameSuffix) {\n    var setNative = null;\n    var clearNative = null;\n    setName += nameSuffix;\n    cancelName += nameSuffix;\n    function scheduleTask(task) {\n        var data = task.data;\n        data.args[0] = task.invoke;\n        data.handleId = setNative.apply(window, data.args);\n        return task;\n    }\n    function clearTask(task) {\n        return clearNative(task.data.handleId);\n    }\n    setNative = patchMethod(window, setName, function (delegate) { return function (self, args) {\n        if (typeof args[0] === 'function') {\n            var zone = Zone.current;\n            var options = {\n                handleId: null,\n                isPeriodic: nameSuffix === 'Interval',\n                delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 : null,\n                args: args\n            };\n            var task = zone.scheduleMacroTask(setName, args[0], options, scheduleTask, clearTask);\n            if (!task) {\n                return task;\n            }\n            // Node.js must additionally support the ref and unref functions.\n            var handle = task.data.handleId;\n            if (handle.ref && handle.unref) {\n                task.ref = handle.ref.bind(handle);\n                task.unref = handle.unref.bind(handle);\n            }\n            return task;\n        }\n        else {\n            // cause an error by calling it directly.\n            return delegate.apply(window, args);\n        }\n    }; });\n    clearNative = patchMethod(window, cancelName, function (delegate) { return function (self, args) {\n        var task = args[0];\n        if (task && typeof task.type === 'string') {\n            if (task.cancelFn && task.data.isPeriodic || task.runCount === 0) {\n                // Do not cancel already canceled functions\n                task.zone.cancelTask(task);\n            }\n        }\n        else {\n            // cause an error by calling it directly.\n            delegate.apply(window, args);\n        }\n    }; });\n}\n\nvar set = 'set';\nvar clear = 'clear';\nvar blockingMethods = ['alert', 'prompt', 'confirm'];\nvar _global = typeof window === 'object' && window || typeof self === 'object' && self || global;\npatchTimer(_global, set, clear, 'Timeout');\npatchTimer(_global, set, clear, 'Interval');\npatchTimer(_global, set, clear, 'Immediate');\npatchTimer(_global, 'request', 'cancel', 'AnimationFrame');\npatchTimer(_global, 'mozRequest', 'mozCancel', 'AnimationFrame');\npatchTimer(_global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');\nfor (var i = 0; i < blockingMethods.length; i++) {\n    var name = blockingMethods[i];\n    patchMethod(_global, name, function (delegate, symbol, name) {\n        return function (s, args) {\n            return Zone.current.run(delegate, _global, args, name);\n        };\n    });\n}\neventTargetPatch(_global);\npropertyDescriptorPatch(_global);\npatchClass('MutationObserver');\npatchClass('WebKitMutationObserver');\npatchClass('FileReader');\npropertyPatch();\nregisterElementPatch(_global);\n// Treat XMLHTTPRequest as a macrotask.\npatchXHR(_global);\nvar XHR_TASK = zoneSymbol('xhrTask');\nvar XHR_SYNC = zoneSymbol('xhrSync');\nfunction patchXHR(window) {\n    function findPendingTask(target) {\n        var pendingTask = target[XHR_TASK];\n        return pendingTask;\n    }\n    function scheduleTask(task) {\n        var data = task.data;\n        data.target.addEventListener('readystatechange', function () {\n            if (data.target.readyState === data.target.DONE) {\n                if (!data.aborted) {\n                    task.invoke();\n                }\n            }\n        });\n        var storedTask = data.target[XHR_TASK];\n        if (!storedTask) {\n            data.target[XHR_TASK] = task;\n        }\n        sendNative.apply(data.target, data.args);\n        return task;\n    }\n    function placeholderCallback() {\n    }\n    function clearTask(task) {\n        var data = task.data;\n        // Note - ideally, we would call data.target.removeEventListener here, but it's too late\n        // to prevent it from firing. So instead, we store info for the event listener.\n        data.aborted = true;\n        return abortNative.apply(data.target, data.args);\n    }\n    var openNative = patchMethod(window.XMLHttpRequest.prototype, 'open', function () { return function (self, args) {\n        self[XHR_SYNC] = args[2] == false;\n        return openNative.apply(self, args);\n    }; });\n    var sendNative = patchMethod(window.XMLHttpRequest.prototype, 'send', function () { return function (self, args) {\n        var zone = Zone.current;\n        if (self[XHR_SYNC]) {\n            // if the XHR is sync there is no task to schedule, just execute the code.\n            return sendNative.apply(self, args);\n        }\n        else {\n            var options = {\n                target: self,\n                isPeriodic: false,\n                delay: null,\n                args: args,\n                aborted: false\n            };\n            return zone.scheduleMacroTask('XMLHttpRequest.send', placeholderCallback, options, scheduleTask, clearTask);\n        }\n    }; });\n    var abortNative = patchMethod(window.XMLHttpRequest.prototype, 'abort', function (delegate) { return function (self, args) {\n        var task = findPendingTask(self);\n        if (task && typeof task.type == 'string') {\n            // If the XHR has already completed, do nothing.\n            if (task.cancelFn == null) {\n                return;\n            }\n            task.zone.cancelTask(task);\n        }\n        // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no task to cancel. Do nothing.\n    }; });\n}\n/// GEO_LOCATION\nif (_global['navigator'] && _global['navigator'].geolocation) {\n    patchPrototype(_global['navigator'].geolocation, [\n        'getCurrentPosition',\n        'watchPosition'\n    ]);\n}\n\n})));\n\n/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(87)))\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/zone.js/dist/zone.js\n ** module id = 86\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///./~/zone.js/dist/zone.js?");

/***/ },

/***/ 87:
/***/ function(module, exports) {

	eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n/*****************\n ** WEBPACK FOOTER\n ** (webpack)/~/node-libs-browser/~/process/browser.js\n ** module id = 87\n ** module chunks = 1\n **/\n//# sourceURL=webpack:///(webpack)/~/node-libs-browser/~/process/browser.js?");

/***/ }

/******/ });