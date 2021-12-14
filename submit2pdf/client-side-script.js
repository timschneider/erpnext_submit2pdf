// Auto Attach PDF on Submit
// this script is used to create a pdf file via the frappe api
// after submit to store a pdf copy of that transation in the 
// attachments.
// https://github.com/timschneider/erpnext_submit2pdf/

function store_pdf_file(frm, pdf_file) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/method/upload_file', true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('X-Frappe-CSRF-Token', frappe.csrf_token);

    let form_data = new FormData();
    form_data.append('file', pdf_file, frm.doc.name + '.pdf');
    form_data.append('is_private', 1);
    form_data.append('doctype', frm.doc.doctype);
    form_data.append('docname', frm.doc.name);

    xhr.onerror = function() {
        frappe.throw(__('An Error occured while attaching the PDF of the submitted transaction! Please do attach the PDF manually.'));  
    };

    xhr.onload = function() {
        if (xhr.status < 200 || xhr.status > 299) {
            let message = ''
            try {
                let response = JSON.parse(xhr.responseText);
                let server_message = JSON.parse(response._server_messages);

                message = JSON.parse(server_message[0]).message;
                // If we reached the attachment limit for a doctype, the repsonse is an error message which is not clear.
                message += ' ' + __('Please remove old attachments and do <b>attach the PDF of the submitted transaction manually</b>.');
            }
            catch (e) {
                message = 'An Error occured while attaching the PDF of the submitted transaction! Please do attach the PDF manually.';
            }
            frappe.throw(__(message));
        }
    };
    xhr.send(form_data);
}

// YOU HAVE TO CHANGE THE DOCTYPE e.g. 'Sales Order', 'Sales Invoice', 'Delivery Note',
// 'Dunning', 'Quotation' ...
frappe.ui.form.on('Sales Order', {
    on_submit(frm) {
        let xhr_pdf = new XMLHttpRequest();
        xhr_pdf.open(
            'GET',
            '/api/method/frappe.utils.print_format.download_pdf?doctype=' + frm.doc.doctype + '&name=' + frm.doc.name,
            true);

        xhr_pdf.setRequestHeader('Accept', 'application/pdf');
        xhr_pdf.setRequestHeader('X-Frappe-CSRF-Token', frappe.csrf_token);
        
        xhr_pdf.responseType = 'blob';
    
        xhr_pdf.onload = function() {
            if (xhr_pdf.status == 200) {
                store_pdf_file(frm, xhr_pdf.response);
            }
        };
        xhr_pdf.send();
    }
})