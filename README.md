# erpnext_submit2pdf
This is a pure ERPNext v13 ClientScript implementation to create a pdf file on submit. We use ERPNext on kubernetes and use the official image provided by frappe [ERPNext Helm Chart](https://github.com/frappe/helm/blob/main/erpnext/). We are not able to install custom apps inside the official image and do not want to maintain
our own image to be able to install and use the greate plugin [pdf-on-submit](https://github.com/alyf-de/erpnext_pdf-on-submit#readme) from [Raffael](https://github.com/barredterra). Thus I developed this pure clientscript solution for ERPNext V13. I don't know if this is working on v12 or v11.

# Usage
1. Go to `ERPNext Desk -> Customization -> Client Script`
2. create a `ClientScript` for each DocType you want to automatically create a pdf file on submit
3. Copy and paste the ClientScript from submit2pdf/client-side-script.js in the script field.
4. Change the DocType in Line 45 of the script accordingly
5. Go to `ERPNext Desk -> Customization -> Customize Form`
6. Select the corresponding Form Type e.g. 'Sales Order', 'Sales Invoice', 'Delivery Note', 'Dunning', 'Quotation'
7. Adapt the `Max Attachments` to an adequate value e.g. 3 or more, 0 for unlimited. If you submit an sales order and the pdf is attached and later on you abort and amend the exact same sales order, you will have at least 2 pdf files attached.
8. You are ready to go.

# Author
Tim Schneider (tim@schneider.engineering)

# License
MIT, see LICENSE file for details.
