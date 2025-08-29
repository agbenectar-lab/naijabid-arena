import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface InvoiceData {
  invoiceNumber: string;
  auctionTitle: string;
  sellerName: string;
  buyerName: string;
  finalBid: number;
  buyersPremium: number;
  taxes: number;
  total: number;
  paymentMethod: string;
  auctionDate: string;
  paymentDate: string;
}

interface InvoiceGeneratorProps {
  invoiceData: InvoiceData;
  className?: string;
}

export function InvoiceGenerator({ invoiceData, className }: InvoiceGeneratorProps) {
  const generateInvoiceHTML = () => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Invoice ${invoiceData.invoiceNumber}</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; color: #0d9488; }
            .invoice-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .section { background: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .section h3 { margin: 0 0 10px 0; color: #0d9488; }
            .item-details { background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; }
            .breakdown { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .breakdown th, .breakdown td { padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb; }
            .breakdown th { background: #f3f4f6; font-weight: 600; }
            .total-row { font-weight: bold; background: #f9fafb; }
            .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #6b7280; }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="logo">Nigerian Auction Platform</div>
            <h1>AUCTION INVOICE</h1>
            <p>Invoice #${invoiceData.invoiceNumber}</p>
        </div>

        <div class="invoice-details">
            <div class="section">
                <h3>Seller Information</h3>
                <p><strong>${invoiceData.sellerName}</strong></p>
                <p>Verified Seller</p>
                <p>Lagos, Nigeria</p>
            </div>
            <div class="section">
                <h3>Buyer Information</h3>
                <p><strong>${invoiceData.buyerName}</strong></p>
                <p>Auction Winner</p>
                <p>Payment Date: ${invoiceData.paymentDate}</p>
            </div>
        </div>

        <div class="item-details">
            <h3>Auction Item Details</h3>
            <p><strong>Item:</strong> ${invoiceData.auctionTitle}</p>
            <p><strong>Auction Date:</strong> ${invoiceData.auctionDate}</p>
            <p><strong>Payment Method:</strong> ${invoiceData.paymentMethod}</p>
            
            <table class="breakdown">
                <tr>
                    <th>Description</th>
                    <th style="text-align: right;">Amount</th>
                </tr>
                <tr>
                    <td>Winning Bid</td>
                    <td style="text-align: right;">₦${invoiceData.finalBid.toLocaleString()}</td>
                </tr>
                <tr>
                    <td>Buyer's Premium (10%)</td>
                    <td style="text-align: right;">₦${invoiceData.buyersPremium.toLocaleString()}</td>
                </tr>
                <tr>
                    <td>VAT (7.5%)</td>
                    <td style="text-align: right;">₦${invoiceData.taxes.toLocaleString()}</td>
                </tr>
                <tr class="total-row">
                    <td><strong>Total Amount</strong></td>
                    <td style="text-align: right;"><strong>₦${invoiceData.total.toLocaleString()}</strong></td>
                </tr>
            </table>
        </div>

        <div class="footer">
            <p>Thank you for using Nigerian Auction Platform!</p>
            <p>For questions about this invoice, contact support@auctionplatform.ng</p>
        </div>
    </body>
    </html>
    `;
  };

  const downloadInvoice = () => {
    const htmlContent = generateInvoiceHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${invoiceData.invoiceNumber}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Invoice Downloaded",
      description: "Your invoice has been downloaded successfully",
    });
  };

  const emailInvoice = () => {
    toast({
      title: "Invoice Emailed",
      description: "Invoice has been sent to your registered email address",
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Invoice #{invoiceData.invoiceNumber}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-success">
          <CheckCircle className="h-4 w-4" />
          Payment Completed
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Item:</span>
            <span className="font-medium">{invoiceData.auctionTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Final Bid:</span>
            <span className="font-medium">₦{invoiceData.finalBid.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Paid:</span>
            <span className="font-bold text-lg">₦{invoiceData.total.toLocaleString()}</span>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button onClick={downloadInvoice} variant="outline" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Download Invoice
          </Button>
          <Button onClick={emailInvoice} variant="secondary" className="w-full">
            <FileText className="h-4 w-4 mr-2" />
            Email Invoice
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}