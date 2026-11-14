/**
 * The invoice PDF as an email attachment.
 *
 * Built in the admin's browser by the same generator as the Download PDF
 * button (lib/invoicePng.ts), then sent to /api/emails/send with the email
 * request — so the attachment is byte-for-byte the document the admin can
 * download and look at. The server checks it is a PDF of sensible size and
 * attaches it (items 10, 13, 18).
 */

import { exportFileName, renderInvoicePdf, type InvoicePngData } from './invoicePng';

export interface PdfAttachment {
    filename: string;
    /** Base64, no data: prefix — what Resend expects. */
    content: string;
}

function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).replace(/^data:[^,]*,/, ''));
        reader.onerror = () => reject(reader.error ?? new Error('Could not read the PDF.'));
        reader.readAsDataURL(blob);
    });
}

export async function invoicePdfAttachment(inv: InvoicePngData): Promise<PdfAttachment> {
    const blob = await renderInvoicePdf(inv);
    return { filename: exportFileName(inv, 'pdf'), content: await blobToBase64(blob) };
}
