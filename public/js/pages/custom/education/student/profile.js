/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*****************************************************************!*\
  !*** ../demo4/src/js/pages/custom/education/student/profile.js ***!
  \*****************************************************************/


// Class definition
var KTAppsEducationStudentProfile = function () {
	// Base elements
	var avatar;

	var initAvatar = function() {
		avatar = new KTImageInput('kt_user_avatar');
	}

	return {
		// public functions
		init: function() {
			initAvatar();
		}
	};
}();

jQuery(document).ready(function() {
	KTAppsEducationStudentProfile.init();
});

/******/ })()
;
//# sourceMappingURL=profile.js.map