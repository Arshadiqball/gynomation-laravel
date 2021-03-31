"use strict";

// const { first } = require("lodash");

// https://www.w3schools.com/tags/ref_httpmessages.asp
// https://www.w3schools.com/js/js_arrow_function.asp Used for function creation
var KTAppInbox;
var Load;
var datatable,datatable2,datatable3,datatable4,datatable5;
var is_view, is_create, is_edit, is_delete, is_chat, is_email, is_permission, is_convert, is_sms, is_assign;
var can_view, can_create, can_edit, can_delete, can_email, can_chat, can_permission, can_sms, can_convert, can_assign;
var DATA = null; // Used for Setter and Getter
const DESIGN_MODE = 'off'; // Used for Enable or Disable Design mode for each Element
const IFRAME_HEIGHT = '10%'; // Fixed Default IFrame Height for every Iframe
const IFRAME_WIDTH = '10%'; // Fixed Default IFrame Width for every Iframe
const W = window; // Fixed Window keyword in Capital "W"
const LS = localStorage; // Fixed localStorage keyword in Capital "LS"
const SS = sessionStorage; // Fixed SessionStorage keyword in Capital "SS"
// const FORWARD = W.history.forward(); // Used when we want to go forward, Just used "FORWARD"
// const BACKWARD = W.history.back(); // Used when we want to go back, Just used "BACKWARD"
const C = console; // Fixed console keyword in Capital "C"
const COUNT = C.count(); // Fixed increment variable in "COUNT"
const D = document; // Fixed document keyword in Capital "D"
D.designMode = DESIGN_MODE;
const IMAGES_LENGTH = D.images.length; // GET images length, that how many images exist in a page
const FORMS_LENGTH = D.forms.length; // GET forms length, that how many forms exist in a page

const EMBED_LENGTH = D.embeds.length; // GET Embed video length
/* <embed src="helloworld.swf">
<embed src="helloworld.swf"> */

const FEATURE_ENABLE = D.implementation.hasFeature("HTML", "1.0");
const CHARATER_SET = D.characterSet; // Application Support UTF
const COOKIE = D.cookie;
const HTTP = 'http://'; // Fixed that Application support htpp or https
// const DOMAIN = HTTP+D.domain+'/'; // Fixed Domain Name
const DOMAIN = document.getElementById('domain').getAttribute('domain')+'/'; // Fixed Domain Name
const FULL_URL = D.baseURI; // documentURI also work but internet explorer not supported
D.open();

let walk_the_DOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk(node, func);
        node = node.nextSibling;
    }
};

const Export = function (){
    return{
        excel: function(table,id){
            let exportArea = document.getElementById(id);
            var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
            var j=0;
            if(table){
                for(j = 0 ; j < table.rows.length ; j++)
                {
                    tab_text=tab_text+table.rows[j].innerHTML+"</tr>";
                    //tab_text=tab_text+"</tr>";
                }
                tab_text=tab_text+"</table>";
                tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");
                tab_text= tab_text.replace(/<img[^>]*>/gi,"");
                tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, "");
                var ua = window.navigator.userAgent;
                var msie = ua.indexOf("MSIE ");
                let sa;
                if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
                {
                    exportArea.document.open("txt/html","replace");
                    exportArea.document.write(tab_text);
                    exportArea.document.close();
                    exportArea.focus();
                    sa=exportArea.document.execCommand("SaveAs",true,"report.xls");
                }
                else                 //other browser not tested on IE 11
                    sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

                return (sa);
            }
        },
        pdf: function(table,id){
            alert('tcpdf');
        }
    }
}();

const Print = {
    copy: function () {
        var urlField = document.querySelector('table');

        // create a Range object
        var range = document.createRange();
        // set the Node to select the "range"
        range.selectNode(urlField);
        // add the Range to the set of window selections
        window.getSelection().addRange(range);

        // execute 'copy', can't 'cut' in this case
        document.execCommand('copy');
	},
    table: function (table_id, title, removeObj) {
        let table_html = $(table_id)[0].outerHTML;
        let doc = document.createElement('div');
		doc.innerHTML = table_html;
        doc.querySelectorAll(removeObj).forEach(e => e.parentNode.removeChild(e));
        walk_the_DOM(doc.firstChild, function(element){
            if(element.removeAttribute) {
                element.removeAttribute('style');
            }
        });
        let date = new Date().toLocaleString();
        let footer = "<div style='margin:20px'>Printed on: "+date+"</div>";
        let win = window.open('', 'Print', 'width=500,height=300');
        let head = '<!doctype html><html lang="en"><head><title>'+title+'</title><meta name="viewport" content="width=device-width,maximum-scale=1.0"><script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script><link rel="stylesheet" href="'+DOMAIN+'content/css/style.bundle.css" type="text/css"><style> table{table-layout:fixed !important; display:table !important}.datatable-body,.datatable-head{display:contents !important} .datatable-row{display: table-row !important} .datatable-row > .datatable-cell{font-size:1.2rem!important;font-weight:normal!important}</style></head><body>';
        win.document.write(head +doc.innerHTML+footer+'<script>WebFont.load({google: {"families":["Poppins:300,400,500,600,700","Roboto:300,400,500,600,700"]},active: function() {sessionStorage.fonts = true;}}); window.onload = function() { window.focus(); window.print(); window.close() } </script></body></html>');
        win.document.close();
	},
	element: function(id,title){
		let data = $(id)[0].outerHTML;
		let doc = document.createElement('div');
        doc.innerHTML = data;
		var mywindow = window.open('', 'PRINT', 'height=400,width=600');
        let date = new Date().toLocaleString();
        let footer = "<div style='margin:20px'>Printed on: "+date+"</div>";

		let head = '<!doctype html><html lang="en"><head><title>'+title+'</title><meta name="viewport"'+
		'content="width=device-width,maximum-scale=1.0">'+
		'<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>'+
		'<link rel="stylesheet" href="'+DOMAIN+'content/css/style.bundle.css" type="text/css">'+
		'<link href="'+DOMAIN+'content/css/style.custom.css" rel="stylesheet" type="text/css" />'+
		'</head><body>';

		mywindow.document.write(head+doc.innerHTML+footer+'<script>WebFont.load({google: {"families":["Poppins:300,400,500,600,700","Roboto:300,400,500,600,700"]},active: function() {sessionStorage.fonts = true;}}); window.onload = function() { window.focus(); window.print(); window.close() } </script></body></html>');

		// mywindow.document.close(); // necessary for IE >= 10
		// mywindow.focus(); // necessary for IE >= 10*/

		setTimeout(() => {
			mywindow.print();
			mywindow.close();

		}, 700);

	},
	barcode: function(barcode,id){
		let barcode_doc = document.createElement('div');
		barcode_doc.innerHTML = "<style>body{text-align:center} svg{width:100px}</style>"+barcode+"<span style='width:100%;position:relative;top:-10px;font-size:11px; background:#ffffff'>"+id+"</span>";
		var mywindow = window.open('', 'PRINT', 'height=400,width=600',false);
		mywindow.document.write(barcode_doc.innerHTML+'<script>window.onload = function() {/* window.focus(); window.print(); window.close() */} </script></body></html>');

		setTimeout(() => {
			mywindow.print();
			mywindow.close();
		}, 700);

	},
	invoice: function(department,type,id,print){
    	if(department === 'pharmacy' && type=='sale'){
			$.ajax({
				url: DOMAIN+'finance/pharmacy/getSaleInfo/',
				data: {'id':id},
				type:'post',
				dataType: 'json',
				success: function (res) {
					if(res.sale_type === 'sale' || res.sale_type === 'credit'){
						if (res.return.length > 0) {
							$('.return_btns').hide();
							$('.return_already_btns').show();
							$('#returnSlipBtn').attr('payment_id',res.return[0].payment_id);
						}else{
							$('.return_btns').show();
							$('.return_already_btns').hide();
							$('#returnSlipBtn').removeAttr('payment_id');
						}
					}
						$('body').append("<table class='print_table d-none'><thead>" +
							"<tr><th>#</th><th> Name </th><th> Price </th><th>Qty</th><th> Total</th><th>Disc</th></tr>" +
							"</thead><tbody></tbody></table>" +
							"<table class='print_table2 d-none'><thead></thead><tbody></tbody></table>");

					let return_payment_id=id;
					$('#medicines_return_table tbody').empty();
					medicines_return_array={};
					$(res.items).each(function(index, val) {
						var row=medicines_return_array[val.medicine_id];
						if(row!= null){
							row.qty=parseInt(row.qty)+parseInt(val.qty);
							row.loose=parseInt(row.loose)+parseInt(val.loose);
							row.discount=parseFloat(row.discount)+parseFloat(val.discount);
							if (!row.qty_price) { row.qty_price=parseFloat(val.qty_price); }
							if (!row.loose_price) { row.loose_price=parseFloat(val.loose_price); }
						} else{
							medicines_return_array[val.medicine_id]=val;
						}
					});
					$(res.items).each(function(index, val) {
						var row=medicines_return_array[val.medicine_id];
						if (parseInt(row.qty_price)==0) { row.qty_price=parseFloat(val.loose_price)*parseFloat(val.item_in_box); }
					});


					var print_table="";
					var print_sub_total=0;
					var print_discount_total=0;
					var serial=0;
					$.each(medicines_return_array, function(index, val) {
						var qty_or_loose=null;
						var quantity=null;
						var price=null;

						if(val.qty >0 ){
							qty_or_loose='qty';
							quantity=val.qty;
							price=val.qty_price;
						}else if(val.loose >0 ){
							qty_or_loose='loose';
							quantity=val.loose;
							price=val.loose_price;
						}

						var html='';


						html='<tr class="medicine" medicine="'+val.medicine_id+'"" qty="'+val.qty+'" " loose="'+val.loose+'" item_in_box="'+val.item_in_box+'" qty_price="'+val.qty_price+'" loose_price="'+val.loose_price+'" discount="'+val.discount+'" >';
						//Name
						html+='<td class="Name">';
						html+=val.name+" ("+qty_or_loose+")";
						html+='</td>';


						//Purchase_Quantity_Loose
						html+='<td class="row border-0 ml-2">';
						html+='<input type="number"  class="form-control  col-5 quantity" min="0" max="'+val.qty+'" value="'+val.qty+'"  /> ';
						html+=' ';
						if (parseInt(val.loose)>0) {
							html+='<input type="number"   class="form-control  col-5 loose"  min="0"  max="'+val.loose+'" value="'+val.loose+'"  /> ';

						}
						html+='</td>';


						//Purchase_Unit_Price_Loose
						html+='<td class="Purchase_Unit_Price_Loose">';
						html+=val.qty_price+"/"+val.loose_price;
						html+='</td>';

						//Purchase_Discount
						html+='<td class="Purchase_Discount">';
						html+=parseFloat(val.discount).toFixed(2);
						html+='</td>';


						//Return_Quantity_Loose
						html+='<td class="Return_Quantity_Loose">';
						html+="-";
						html+='</td>';

						//Return_Sub_Total
						html+='<td class="Return_Sub_Total">';
						html+="-";
						html+='</td>';

						//Discount
						html+='<td class="Discount">';
						html+="-";
						html+='</td>';

						//Return_Amount
						html+='<td class="Return_Amount">';
						html+="-";
						html+='</td>';
						//Return_Amount

						html+='</tr>';

						$('#medicines_return_table  tbody').append(html);

						$('.medicine[medicine='+val.medicine_id+'] .Return_Edit_Btn').on('click', function(){
							var tr=$(this).closest('.medicine');
							$('#medicines_return_table input[type=number]').attr('disabled','disabled')
							$('input[type=number]',tr).removeAttr('disabled','disabled')
							$('#medicines_return_table tr').css('background','white');
							tr.css('background','#f3f3f3');
						});

						$('.medicine[medicine='+val.medicine_id+'] input[type=number]').on('change', function(){

							var submission_row=medicines_return_array[val.medicine_id];
// debugger;
							var tr=$(this).closest('.medicine');
							trLoose=tr.attr('loose');
							trQty=tr.attr('qty');
							trItemInBox=tr.attr('item_in_box');

							var input_qty=tr.find('.quantity');
							var input_loose=tr.find('.loose').val();
							if (!input_loose) {input_loose=0;}
							if (!input_loose) {trLoose=0;}
							if (!input_loose) {trItemInBox=0;}
							var discount=tr.attr('discount');
							if (!discount) {discount=0};
							var qty_price=tr.attr('qty_price');
							// var return_subtotal_amount=0;
							// var return_total_amount=0;
							// var return_html="";
							var return_qty= (parseInt(trQty)-parseInt(input_qty.val()) );
							var return_loose=(parseInt(trLoose)-parseInt(input_loose) );
							if (!input_loose) {return_loose=0};


							if (!input_loose) {
								var qty2=parseInt(trQty);
							}else{
								var qty2=parseInt(trQty)+(parseInt(trLoose)/parseInt(trItemInBox) );
							}



							var total_price_before_dicount=(qty2*qty_price);
							var avg_price_before_dicount=total_price_before_dicount/qty2;

							var total_price_after_dicount=(qty2*qty_price)-discount;
							var avg_price_after_dicount=total_price_after_dicount/qty2;

							if (!input_loose) {
								var input_qty2=parseInt(return_qty);
							}else{
								var input_qty2=parseInt(return_qty)+(parseInt(return_loose)/parseInt(trItemInBox) );
							}
							return_subtotal_amount=(input_qty2*avg_price_before_dicount) ;
							return_total_amount=(input_qty2*avg_price_after_dicount) ;



							var currentElement=tr;
							$('.Name',currentElement).html();
							$('.Purchase_Quantity_Loose',currentElement).html();
							$('.Purchase_Unit_Price_Loose',currentElement).html();
							$('.Purchase_Discount',currentElement).html();
							if (return_loose>0) {
								var return_loose_html="/"+return_loose;
							}else{
								return_loose_html='';
							}
							$('.Return_Quantity_Loose',currentElement).html(return_qty+return_loose_html);
							$('.Return_Sub_Total',currentElement).html(return_subtotal_amount.toFixed(2));
							$('.Discount',currentElement).html("-"+(return_subtotal_amount-return_total_amount).toFixed(2));
							$('.Return_Amount',currentElement).html('<span class="label label-lg label-light-danger label-inline text-bold font-weight-bolder font-size-2 text-hover-warning text-color-white">'+parseFloat(return_total_amount).toFixed(2)+'</span>');
							submission_row.submission_data={'medicine_id':val.medicine_id,'payment_id':'will create php as payment return','qty':return_qty,'loose':return_loose,'qty2':input_qty2,'trItemInBox':trItemInBox,'purhcase_id':'php will decide purhcase_id where stock will return','total':return_subtotal_amount,'discount':(return_subtotal_amount-return_total_amount),'total_after_discount':(return_total_amount)}
						});

						var divider='<hr style="width: 36%;padding: 0px;line-height: 0;margin: auto;">';
						var label="";
						if (val.qty > 0 && val.loose > 0) {
							label="item & loose";
						} else if (val.qty > 0 &&  val.loose < 1) {
							label=" item ";
						}else if (val.qty < 1 &&  val.loose > 0){
							label="loose";
						}
						label='<br><span style="font-size:8px">('+label+')</span> ';
						label='';
						print_table+='<tr> <td  rowspan="1" >'+(++serial)+'</td>';
						print_table+='<td colspan="4">'+val.name+' </td>';
						print_table+='</tr>';
						print_table+='<tr style="border-bottom:  1px solid ;">';
						print_table+='<td class="" > &nbsp;</td>';
						print_table+='<td class="" > &nbsp;</td>';
						val.qty=parseInt(val.qty);
						val.loose=parseInt(val.loose);

//price
						if (val.qty > 0 && val.loose > 0) {
							print_table+='<td class=""> '+val.qty_price+divider+(parseFloat(val.qty_price/val.item_in_box).toFixed(2))+'</td>';//price
						} else if (val.qty > 0 &&  val.loose < 1) {
							print_table+='<td class=""> '+parseFloat(val.qty_price).toFixed(2)+'</td>';//price
						}else if (val.qty < 1 &&  val.loose > 0){
							print_table+='<td class=""> '+(parseFloat(val.qty_price/val.item_in_box).toFixed(2))+'</td>';//price
						}

//qty
						if (val.qty > 0 && val.loose > 0) {
							print_table+='<td class="">' +val.qty+divider +val.loose+'</td>';
						} else if (val.qty > 0 &&  val.loose < 1) {
							print_table+='<td class="">' +val.qty+'</td>';
						}else if (val.qty < 1 &&  val.loose > 0){
							print_table+='<td class="">'  +val.loose+'</td>';
						}

//total
						if (val.qty > 0 && val.loose > 0) {
							print_sub_total+=(((val.qty_price*val.qty)+((val.qty_price/val.item_in_box)*val.loose)));
							print_table+='<td class="kt-font-danger kt-font-lg"> '+
								parseFloat(((val.qty_price*val.qty)+((val.qty_price/val.item_in_box)*val.loose))).toFixed(2)
								+'</td>';//price

						} else if (val.qty > 0 &&  val.loose < 1) {
							print_sub_total+=((val.qty_price*val.qty ));
							print_table+='<td class="kt-font-danger kt-font-lg"> '+parseFloat((val.qty_price*val.qty )).toFixed(2)+'</td>';//price
						}else if (val.qty < 1 &&  val.loose > 0){
							print_sub_total+=((val.qty_price/val.item_in_box)*val.loose);
							print_table+='<td class="kt-font-danger kt-font-lg"> '+parseFloat((val.qty_price/val.item_in_box)*val.loose).toFixed(2)+'</td>';//price
						}
						print_discount_total+=parseFloat(val.discount);
						print_table+='<td  class="kt-font-danger kt-font-lg">  '+parseFloat(val.discount).toFixed(2)+'</td>';
						print_table+='</tr>';
						$('.medicine[medicine='+val.medicine_id+'] input[type=number]').on('change', function(){
							recalculate_return();
						});
					});
					var print_table2="";
					print_table2+=' <tr>';
					print_table2+=' <th>Sub total</th>';
					print_table2+=' <td>Rs.'+parseFloat(print_sub_total).toFixed(2)+'</td>';
					print_table2+='  </tr>';


					print_table2+=' <tr>';
					print_table2+=' <th>Discount</th>';
					print_table2+=' <td>Rs.'+parseFloat(print_discount_total).toFixed(2)+'</td>';
					print_table2+='  </tr>';


					print_table2+=' <tr>';
					print_table2+=' <th>Grand Total</th>';
					print_table2+=' <td>Rs.'+parseFloat(print_sub_total-print_discount_total).toFixed(2)+'</td>';
					print_table2+='  </tr>';
					print_table2+=' <tr>';
					print_table2+=' <th>Received</th>';
					print_table2+=' <td>Rs.'+parseFloat(res.amount_received).toFixed(2)+'</td>';
					print_table2+='  </tr>';

					print_table2+=' <tr>';
					print_table2+=' <th>Return</th>';
					print_table2+=' <td>Rs.'+(parseFloat(res.amount_received).toFixed(2)-parseFloat(print_sub_total-print_discount_total).toFixed(2))+'</td>';
					print_table2+='  </tr>';
					$('.print_table2 tbody').html(print_table2);

					$('.print_table tbody').html(print_table);

					var hospital_customer_name="";
					if (res.user) {
						if (res.patient_info.first_name) {
							hospital_customer_name=(res.patient_info.first_name);
						}else if  (res.patient_info.email) {
							hospital_customer_name=(res.patient_info.email);
						}else if  (res.patient_info.email) {
							hospital_customer_name=('');
						}

					}else{
						hospital_customer_name=(res.customer_name);
					}
						let invoice_type =  res.sale_type+' invoice';
						mywindow = window.open('', 'Print', "width="+screen.availWidth+",height="+screen.availHeight);
						mywindow.document.writeln('');
						mywindow.document.write('<html><head><link href="https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap" rel="stylesheet"><script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script><script>WebFont.load({google: {"families":["Poppins:300,400,500,600,700","Roboto:300,400,500,600,700"]},active: function() {sessionStorage.fonts = true;}}); </script><link rel="stylesheet" href="'+DOMAIN+'content/css/thermal_print.css?'+Math.random()+'" type="text/css"> <title>' + document.title  + '</title>');
						var d=' ';
						mywindow.document.write('<style>@media print and (width: 80mm) {body { width: 80mm; height:100%}</style>' +
							'</head><body onload="alert();da()"><center><div class="main" id="printableArea">');
						var logo;

						if (res.settings.invoice_logo) {
							logo=('<img class="p0m0 hospital_logo" src="'+res.settings.invoice_logo+'" />');
						}else{
							logo=('<h1 class="p0m0">'+data.settings.title +'</h1>');
						}
						var hospital='<table><tr ><td width=120 >'+logo+' </td><td >'+res.settings.phone +'<br>'+res.settings.address+'</td></tr><tr><td colspan=2 style="border:solid 0.5px; letter-spacing:0.1em; text-transform: uppercase; text-align:center;font-weight:bold;">'+invoice_type.capitalize()+'</td></tr> <tr><td colspan=2> <b>INVOICE #</b>'+return_payment_id+' <br> <b> Customer:</b> '+hospital_customer_name+' <br><b>  Date:</b> '+res.date+'   <br>  <b>Operator name:</b>  '+res.sold_by.first_name+" "+res.sold_by.last_name+' </td></tr></table>';

						mywindow.document.write('<h2 class="p0m0">'+hospital+'</h2>');

						mywindow.document.write('<table class="data">'  +$('.print_table')[0].innerHTML+'</table>');
						mywindow.document.write('<hr>');
						mywindow.document.write('<table  class="total">'+$('.print_table2')[0].innerHTML+'</table>');
						mywindow.document.write('<hr>');
						mywindow.document.write('<img src="https://automedic.com.pk/content/media/logos/logo.png" width=100/><br> <span style="font-size:10px">Automedic hospital managment system</span>');
						if(print){
							mywindow.document.write('</div></center><script> function da() {  let divHeight = (document.getElementById("printableArea").scrollHeight + 20) +"px"; document.body.style.height = divHeight; + window.focus(); window.print();  window.close()  } da();</script></body></html>');

							if(typeof AfterPrint === "function"){
								mywindow.onafterprint = AfterPrint;
							}
							mywindow.document.close();
						}
					if(typeof changeSaleType === "function"){
						changeSaleType('sale');
					}
					$('.print_table').remove();
					$('.print_table2').remove();
				}
			});
		}


		if(department === 'pharmacy' && type=='return'){

		}


	}
};

const status = {
    'pending': {'title': 'Pending', 'class': 'label-light-primary'},
    'process': {'title': 'Process', 'class': 'label-light-primary'},
    'deliver': {'title': 'Delivered', 'class': ' label-light-danger'},
    'cancel': {'title': 'Canceled', 'class': ' label-light-primary'},
    'enabled': {'title': 'Enabled', 'class': ' label-light-success'},
    'info': {'title': 'Info', 'class': ' label-light-info'},
    'disabled': {'title': 'Disabled', 'class': ' label-light-danger'},
    'warn': {'title': 'Warning', 'class': ' label-light-warning'},
    'new_lead': {'title': 'New Lead', 'class': ' label-light-primary'},
    'in_progress': {'title': 'In Progress', 'class': ' label-light-warning'},
    'duplicate': {'title': 'Duplicate', 'class': ' label-light-info'},
    'drop': {'title': 'Drop', 'class': ' label-light-danger'},
    'completed': {'title': 'Completed', 'class': ' label-light-success'},
    'incompleted': {'title': 'In Completed', 'class': ' label-light-warning'},
    'paid': {'title': 'Paid', 'class': ' label-light-success'},
    'unpaid': {'title': 'Unpaid', 'class': ' label-light-danger'},
    'partial': {'title': 'Partial', 'class': ' label-light-warning'},
    'debit': {'title': 'Debit', 'class': ' label-light-success'},
    'credit': {'title': 'Credit', 'class': ' label-light-warning'},
    'trial': {'title': 'Trial', 'class': ' label-light-warning'},
    'short_list': {'title': 'Short List', 'class': ' label-light-info'},
    'interview_call': {'title': 'Interview Call', 'class': ' label-light-primary'},
    'not_interested': {'title': 'Not Interested', 'class': ' label-light-warning'},
};

const Alert = function () {
    return{
        error: function (text, target='body') {
            swal.fire({
                title: "Error!",
                text: text,
                type: "error",
                buttonsStyling: false,
                confirmButtonText: "OK",
				confirmButtonClass: "btn btn-primary",
				target: target
            });
        },
        success: function (text, target='body') {
            swal.fire({
                title: "Good job!",
                html: text,
                type: "success",
                buttonsStyling: false,
                confirmButtonText: "OK",
				confirmButtonClass: "btn btn-success",
				target: target
            });
        },
        confirm: function (warning,confirmation,function_name) {
            swal.fire({title:"Are you sure?",text:warning,type:"warning",buttonsStyling:!1,showCancelButton:!0,confirmButtonText:confirmation,confirmButtonClass:"btn btn-brand",cancelButtonClass:"btn btn-secondary"})
                .then(function(e){
                         if(typeof function_name === "function"){
                                    if(e.value){
                                                 cancelled = false;
                                                 function_name.call('yes');
                                        }
                                        else{
                                            if("cancel" === e.dismiss){
                                                  cancelled = true;
                                                  function_name.call('no');
                                            }
                                        }
                            }else{
                                let fn = window[function_name];
                                if(e.value){
                                    cancelled = false;
                                    if (typeof fn === "function") fn.call(null)
                                }
                                else{
                                    if("cancel" === e.dismiss){
										cancelled = true;
                                        if (typeof fn === "function") fn.apply(null)
                                    }
                                }
                          }
                })
        },
        confirmAjax: function(data = false,element = false,func = false){
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
            }).then(function(result) {
                if (result.value) {
                    console.log('Yes Confirm');
                    if(data){
                        console.log('In Data');
                        $.ajax({
                            url:data.url,
                            type:'post',
                            data:data.perameter,
                            dataType:'json',
                            async:false,
                            success:function(res){
                                // toastr.success(res.response);
                            },
                            error:function (res) {
                                // toastr.error(res.responseJSON.response);
                            },complete:function(){

                            }
                        });
                        console.log('In Then After Data');
                        if(func){
                            eval(func);
                        }

                    }

                } else if (result.dismiss === "cancel") {
                    console.log('Confirm Box Cancelled.');
                }
            });
        }
    }
}();

var callback_success=null;
function modal(data){
    jQuery('#modal_ajax .modal-body .modData').html(`<div class="modal-loader text-center">
    <img src="${DOMAIN}images/loader.gif" /></div>`);
    $('#modal_ajax .modal-dialog').removeClass('modal-lg modal-md modal-sm modal-xl').addClass('modal-'+data.size);
    $('#modal_ajax .modal-title').html(data.title);
    jQuery('#modal_ajax').modal('show', {backdrop: 'true'});
    callback_success = data.success;
    $.ajax({
        url: DOMAIN+data.url,
        data: data.data,
        success: function(response)
        {
            var modalData = $(response).find('.show-modal').clone();
            $('#modal_ajax .modal-body .modData').html($(modalData).removeClass('container'));
            $('.selectpicker').selectpicker();
        },
        complete:function(){
            KTApp.unblock('.modal-content');
        }
    });
}

function bulk_edit(val, type, ids) {
    val = parseInt(val);
    if(Array.isArray(ids) && ids.length > 0 && type && $.isNumeric(val)){
        $.ajax({
            type:"post",
            url: DOMAIN+'admin/ajax/bulk_edit',
            data:{"val":val,"type":type,"ids":ids},
            success: function(res){
                if(res === 'success'){
                    location.reload();
                }
            }
        });
    }
}

function showAjaxModal(url) {
    jQuery('#modal_ajax .modal-body .modData').html(`<div class="modal-loader text-center">
    <img src="${DOMAIN}images/loader.gif" /></div>`);
    jQuery('#modal_ajax').modal('show', {backdrop: 'true'});
    $.ajax({
        url: url,
        success: function(response)
        {
            $('#modal_ajax .modal-body .modData').html(response);
            var ps = new PerfectScrollbar('#modal_ajax .modal-body .modData');
            $('.selectpicker').selectpicker();
        }
    });
}


// Confirm Modal
function confirm_modal(record) {
    jQuery('#delete_modal').modal('show', {backdrop: 'static'});
    document.getElementById('delete_link').setAttribute('data-url' , record.url);
    DATA = record.id;

    if(record.name){
        document.getElementById('delete_link').setAttribute('data-name' , record.name);
    }
}


// function confirmBox(data = false,element = false,func = false) {
//     Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete it!",
//         cancelButtonText: "No, cancel!",
//         reverseButtons: true
//     }).then(function(result) {
//         if (result.value) {



//             Swal.fire(
//                 "Deleted!",
//                 "Your file has been deleted.",
//                 "success"
//             ).then(function(){
//                 if(func){
//                     eval(func);
//                 }
//             });

//         } else if (result.dismiss === "cancel") {
//             console.log('Confirm Box Cancelled.');
//         }
//     });
// }

// Destory Multi Records
var update_status = (records) => {
    var record = {
        'parameter' : {'data':DATA,'status':records.item},
        'url' : records.url,
        'method' : 'POST',
        'name' : records.name
    };
    a_return(record);
}

// Transfer Multi Records
var transfer = (records) => {
    var record = {
        'parameter' : {'data':DATA,'country':records.data.country,'shift':records.data.shift},
        'url' : records.url,
        'method' : 'POST',
        'name' : records.name
    };
    a_return(record);
}

// Destory Multi Records
var destroy = (records) => {

    var record = {
        'parameter' : {'data':DATA},
        'url' : records.url,
        'method' : 'POST'
    };
    if(records.name){
        record.name = records.name;
    }

    Promise.resolve(a_return(record)).then(
    function(v) {
        // Alert.success(v.response);
        toastr.success(v.response);
    }, function(e) {
        console.log(e);
    });
}

// Used When we go to back from javascript
function goBack(no) {
    W.history.go(no);
}

// Used For clearing a console
function clear_C() {
    C.clear();
}

// Used for specific function
// setInterval("has_focus()", 1);

function has_focus() {
    if (document.hasFocus()) {
            C.log("The document has focus.");
    } else {
            C.log("The document DOES NOT have focus.");
    }
}

/* Get the element you want displayed in fullscreen */
var elem = get_id("myvideo");

/* Function to open fullscreen mode | openFullscreen(); */
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

/* Close fullscreen | closeFullscreen() */
function closeFullscreen() {
    if (D.exitFullscreen) {
    D.exitFullscreen();
    } else if (D.webkitExitFullscreen) { /* Safari */
        D.webkitExitFullscreen();
    } else if (D.msExitFullscreen) { /* IE11 */
        D.msExitFullscreen();
    }
}

// Fixed for short Term
function get_id(id){
    return D.getElementById(id);
}

// Fixed for short Term
function get_class(name){
    return D.getElementsByClassName(name);
}

// Fixed for short Term
function get_name(name){
    return D.getElementsByName(name);
}

// Fixed for short Term
function get_by_tagname(tagname){
    return D.getElementsByTagName(tagname);
}

// Fixed for short Term
function get_by_query(query){
    return D.querySelectorAll(query); // example : ul.active
}

// Get Tag Name By id
function get_tagname_by_id(id){
    return get_id(id).tagName; // example : ul.active
}

// Get Tag Name By id
function get_content_by_id(id){
    return get_id(id).textContent; // example : ul.active
}

// The C.assert() method writes a message to the C, but only if an expression evaluates to false.
// C.assert(get_id("a"), "You have no element with ID 'a'");

// get_attr('class', 'example', 'class'); // id is not woring in it
function get_attr(type, name, attr_name) {
    var data = null;
    if(type == 'class'){
        data = get_class(name);
    }else if(type == 'name'){
        data = get_name(name);
    }else if(type == 'tagname'){
        data = get_by_tagname(name);
    }else if(type == 'query'){
        data = get_by_query(name);
    }
    return data[0].attributes.getNamedItem(attr_name);
}

// change_attr('class', 'example', 'class', 'new_value', 'value'); // id is not woring in it
function change_attr(type, name, attr_name, new_value, return_type) {
    var data = get_attr(type, name, attr_name);
    if(return_type == 'name'){
        return data.name = new_value;
    }else if(return_type == 'value'){
        return data.value = new_value;
    }else{
        alert('Type Correct Return Type');
    }
}

// alert(get_attr_len('p#a'));
function get_attr_len(value) {
    return get_by_query(value)[0].attributes.length;
}

// remove_attr('button.example', 'onclick');
function remove_attr(value, remove_name) {
    get_by_query(value)[0].attributes.removeNamedItem(remove_name);
}

// set_attr('button.example', 'onclick', 'alert(123)');
function set_attr(value, attr_name, attr_val) {
    var typ = D.createAttribute(attr_name);
    typ.value = attr_val;
    get_by_query(value)[0].attributes.setNamedItem(typ);
}

// alert(attr_exist('button.example', 'onclick'));
function attr_exist(value, attr_name) {
    return get_by_query(value)[0].getAttributeNode(attr_name).specified;
}

// place this function into body
function active_element() {
    return D.activeElement.tagName
}

// Trigger every element on load
D.addEventListener("click", function(){
    // C.log(active_element());
});

// Get Data Under the IFrame | iframe('url');
function iframe(url = '', style = ('height:'+IFRAME_HEIGHT+';'+'width:'+IFRAME_WIDTH)) {
    return '<iframe src="'+DOMAIN+'/'+url+'" style="border:0;'+style+'"></iframe>';
}

// Get Tag Data Under the IFrame | get_iframe_content('h3');
function get_iframe_content(tag_name) {
    C.log(D.adoptNode(get_by_tagname('iframe')[0].contentWindow.document.getElementsByTagName(tag_name)[0]));
}

// Count Anchor Text for SEO | <a name="css">CSS Tutorial</a> | must placed the name attribute in anchor tag | get_anchor_len();
function get_anchor_len() {
    C.log(D.anchors.length);
}

// Setter | set('abc');
function set(local_data) {
    data = local_data;
}

// Getter | get();
function get() {
    return data;
}

// Get Cookie
function get_cookie() {
    return "Cookies associated with this document: "+COOKIE;
}

// Create Comment Invisible
function create_comment(id, comment) {
    get_id(id).appendChild(D.createComment(comment));
}

// Create HTML Element | create_element('id', 'button')
function create_element(id, element_name) {
    var elem = D.createElement(element_name);
    elem.innerHTML = "CLICK ME"
    get_id(id).appendChild(elem);
}

// Console Error | console_error('Helo world!');
function console_error(message) {
    C.error(message);
}

// Group Console | console_group('Helo world!');
function console_group(message) {
    C.group();
    C.log(message);
    C.groupEnd();
}

// Group Console | console_group('Helo world!');
function console_group_collapsed(message) {
    C.groupCollapsed();
    C.log(message);
}

// Group Console | console_table(["Audi", "Volvo", "Ford"]);
function console_table(message) {
    C.table(message);
}

// Console Warning | console_warn('Helo world!');
function console_warn(message) {
    C.warn(message);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        C.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    C.log("Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude);
}

// Setter Local Storage | set_ls('abc');
function set_ls(key, value) {
    LS.setItem(key, value);
}

// Getter Local Storage | get_ls();
function get_ls(key) {
    return LS.getItem(key);
}

// Remove Local Storage | remove_ls();
function remove_ls(key) {
    LS.removeItem(key);
}

// Setter Session Storage | set_ss('abc');
function set_ss(key, value) {
    SS.setItem(key, value);
}

// Getter Session Storage | get_ss();
function get_ss(key) {
    return SS.getItem(key);
}

// Remove Session Storage | remove_ss();
function remove_ss(key) {
    SS.removeItem(key);
}

// debugger short keyword | d();
function d() {
    debugger;
}

// Fixed While Loop
function w_loop(start = 0, end = 0, sign = null, text = ""){

    if(sign == 'less'){
        while (start < end) {
            text += "<br>The number is " + i;
            i++;
        }
    }else if(sign == 'greater'){
        while (start > end) {
            text += "<br>The number is " + i;
            i++;
        }
    }

    return text;
}

// Fixed EACH Loop
function e_loop(data = null, text = ""){

    var x;
    for (x in data) {
        text += data[x] + " ";
    }

    return text;
}

// Fixed XMLHTTPREQUEST | xml_http_ajax_request('a.txt','POST',"fname=Henry&lname=Ford")
function xml_http_ajax_request(url = null, method = "GET", encoded = null){

    var data = null;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = this.responseText;
        }
    };
    xhttp.open(method, url, true); // true is used for async and false for sync
        if(encoded){
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(encoded);
        }
    xhttp.send();

    return text;
}

// Fixed XMLHTTPREQUEST | xml_ajax_request('https://www.w3schools.com/js/cd_catalog.xml','GET')
function xml_ajax_request(url = null, method = "GET"){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    xhttp.open(method, url, true);
    xhttp.send();
}

// Used For XML Data Request
function myFunction(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var table="<tr><th>Artist</th><th>Title</th></tr>";
    var x = xmlDoc.getElementsByTagName("CD");
    for (i = 0; i <x.length; i++) {
        table += "<tr><td>" +
        x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
        "</td></tr>";
    }
    document.getElementById("demo").innerHTML = table;
}

// Fixed For Input Hint Text | get_input_hint('a','https://www.w3schools.com/js/gethint.php','GET')
function get_input_hint(str = null, url = null, method = "GET") {
    if (str.length == 0) {
        document.getElementById("txtHint").innerHTML = "";
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            C.log(this.responseText);
        }
        };
        xmlhttp.open(method, url+"?q=" + str, true);
        xmlhttp.send();
    }
}

{/* <select name="customers" onchange="get_select_hint(this.value,'https://www.w3schools.com/js/getcustomer.php','GET')">
    <option value="">Select a customer:</option>
    <option value="ALFKI">Alfreds Futterkiste</option>
    <option value="NORTS ">North/South</option>
    <option value="WOLZA">Wolski Zajazd</option>
</select> */}
// Fixed For Select Hint Text | get_select_hint('a','https://www.w3schools.com/js/getcustomer.php','GET')
function get_select_hint(str = null, url = null, method = "GET") {
    if (str.length == 0) {
        C.log("");
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            C.log(this.responseText);
        }
        };
        xmlhttp.open(method, url+"?q=" + str, true);
        xmlhttp.send();
    }
}

// Fixed For Json | get_json_request('https://www.w3schools.com/js/demo_json.php')
function get_json_request(url = null) {
    var myObj = { name: "John", age: 31, city: "New York" };
    var myJSON = JSON.stringify(myObj);

    return window.location = url+"?x=" + myJSON;
}

// Check that the data is Json or not
function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

// Fixed Simple Ajax | a('form1','abc/1','GET')  // parameter = null, url = null, method = null
async function a_return(data) {

    return await $.when(
        KTApp.block((data.element) ? data.element : '.modal-content', {
            overlayColor: '#000000',
            state: 'success',
            message: 'Saving Please Wait...'
        })
    ).then(()=>{

            return new Promise((resolve, reject) => {
                var res = $.ajax({
                    type: data.method,
                    url: DOMAIN + data.url,
                    data: data.parameter,
                    error: function(result){
                        // Alert.error(result.responseJSON.response);
                        toastr.error(result.responseJSON.response);
                    },
                    complete:function(result){
                        KTApp.unblock((data.element) ? data.element : '.modal-content');
                        return result.responseJSON;
                    }
                });

                if(data.name && data.name != 'false'){
                    $('.modal').modal('hide');
                    $('#'+data.name).KTDatatable().destroy();
                    Load.data();
                }else{
                    $('#delete_modal').modal('hide');
                }
                resolve(res);
            });;
        }
    );
}

D.close();


