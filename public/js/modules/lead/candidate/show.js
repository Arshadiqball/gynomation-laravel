/******/ (() => { // webpackBootstrap
"use strict";

// Class definition
var KTLeaflet = function () {

    // Private functions
    var demo1 = function () {
     // define leaflet
     var leaflet = L.map('kt_leaflet_1', {
      center: [locations.lat, locations.lng],
      zoom: 11
     });

     // set leaflet tile layer
     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
     }).addTo(leaflet);

     // set custom SVG icon marker
     var leafletIcon = L.divIcon({
      html: `<span class="svg-icon svg-icon-danger svg-icon-3x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="24" width="24" height="0"/><path d="M5,10.5 C5,6 8,3 12.5,3 C17,3 20,6.75 20,10.5 C20,12.8325623 17.8236613,16.03566 13.470984,20.1092932 C12.9154018,20.6292577 12.0585054,20.6508331 11.4774555,20.1594925 C7.15915182,16.5078313 5,13.2880005 5,10.5 Z M12.5,12 C13.8807119,12 15,10.8807119 15,9.5 C15,8.11928813 13.8807119,7 12.5,7 C11.1192881,7 10,8.11928813 10,9.5 C10,10.8807119 11.1192881,12 12.5,12 Z" fill="#000000" fill-rule="nonzero"/></g></svg></span>`,
      bgPos: [5, 5],
      iconAnchor: [20, 37],
      popupAnchor: [0, -37],
      className: 'leaflet-marker'
     });

     // bind marker with popup
     var marker = L.marker([locations.lat, locations.lng], { icon: leafletIcon }).addTo(leaflet);
     marker.bindPopup(`<b>${locations.country}</b><br/>${locations.state}, ${locations.city}`).openPopup();
    }

    return {
        // public functions
        init: function () {
            demo1();
        }
    };
   }();


   // Class definition
var KTUppy = function () {
	const Tus = Uppy.Tus;
	const xhr = Uppy.XHRUpload;
	// to get uppy companions working, please refer to the official documentation here: https://uppy.io/docs/companion/
	const Dashboard = Uppy.Dashboard;

	var initUppy2 = function(){
		var id = '#kt_uppy_2';

		var options = {
			target: id,
			inline: true,
            trigger: id,
            inline: true,
			replaceTargetContent: true,
			showProgressDetails: true,
			note: 'Images and video only, 2â€“3 files, up to 10 MB',
			height: 250,
			metaFields: [
				{ id: 'name', name: 'Name', placeholder: 'file name' },
				{ id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
			],
			browserBackButtonClose: true
		}

		var uppyDashboard = Uppy.Core({
            debug: true,
			autoProceed: false,
			restrictions: {
				maxFileSize: 1000000000, // 1000000 = 1mb
				maxNumberOfFiles: 5,
				minNumberOfFiles: 1,
				allowedFileTypes: ['image/*', 'video/*', 'audio/*']
			}
		});

		uppyDashboard.use(Dashboard, options);
		uppyDashboard.use(xhr,

            {
                endpoint: DOMAIN+'lead/media/'+lead_id ,
                formData: true,
                bundle: false,
                fieldName: 'files[]'
            }

        );
	}

	return {
		// public functions
		init: function() {
			initUppy2();
		}
	};
}();

jQuery(document).ready(function () {
    KTLeaflet.init();
    KTUppy.init();

});


/******/ })();

$(document).on('click','.download_media',function(){

    var record = {
        'url' : "lead/mediaDownload/"+$(this).data('id'),
        'method' : 'POST'
    };
    Promise.resolve(a_return(record)).then(
    function(v) {
        toastr.success(v.response);
    }, function(e) {
        toastr.error(e);
    });
});
$(document).on('click','.delete_media',function(){

    var record = {
        'url' : "lead/media_delete/"+$(this).data('lead')+'/'+$(this).data('id'),
        'method' : 'POST'
    };
    Promise.resolve(a_return(record)).then(
    function(v) {
        toastr.success(v.response);
    }, function(e) {
        toastr.error(e);
    });
});

$('.city').off().on('change',function(){
    var city = $('select[name=current_city_id] option:selected').val();
    $.ajax({
        url:DOMAIN+"api/lead/candidate/areas/"+city,
        type:'post',
        success:function(res){
            var options = '';
            $.each(res.data, function( index, value ) {
                options += `<option value="${value.id}">${value.name}</option>`;
            });
            $('#area-current').html(options);
            $('#area-current').selectpicker('refresh');
        }
    });
});

$('#updateCandidateLead').off().on('submit',function(e){
    e.preventDefault();
    var record = {
        'parameter' : $(this).serializeArray(),
        'url' : $(this).data('url'),
        'method' : 'POST'
    };

    console.log(record);

    Promise.resolve(a_return(record)).then(
    function(v) {
        toastr.success(v.response);
    }, function(e) {
        console.log(e);
    });
});

$('#updateCandidateStatus').off().on('submit',function(e){
    e.preventDefault();
    var record = {
        'parameter' : $(this).serializeArray(),
        'url' : 'lead/candidate_convert',
        'method' : 'POST'
    };
    Promise.resolve(a_return(record)).then(
        function(v) {
            toastr.success(v.response);
            $(".btn-status").dropdown('toggle');
            $('.modal').modal('hide');
            Load.data();
        }, function(e) {
            console.log(e);
            $(".btn-status").dropdown('toggle');
        }
    );
});



