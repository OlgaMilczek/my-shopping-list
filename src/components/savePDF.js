import html2pdf  from 'html2pdf.js';


function saveAsPDF() {
    html2pdf(document.querySelector('.main-content'), {filename:'my-shopping-list.pdf'});
}

export default saveAsPDF;