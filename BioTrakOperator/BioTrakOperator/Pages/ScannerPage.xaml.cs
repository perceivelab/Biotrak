using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BioTrakModels;
using BioTrakOperator.Models;
using BioTrakServices;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace BioTrakOperator.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class ScannerPage : BioTrakContentPage
    {
        public delegate void ScanCode(String serial);
        public event ScanCode CodeScanned;
        public ScannerPage(bool forTrace = false)
        {
            InitializeComponent();
            if (!forTrace)
            {
                scanner.Options = new ZXing.Mobile.MobileBarcodeScanningOptions()
                {

                    PossibleFormats = new List<ZXing.BarcodeFormat>
                        {
                            ZXing.BarcodeFormat.All_1D,
                            ZXing.BarcodeFormat.QR_CODE
                        }
                };
            }
            else
            {
                scanner.Options = new ZXing.Mobile.MobileBarcodeScanningOptions()
                {
                    PossibleFormats = new List<ZXing.BarcodeFormat>{ZXing.BarcodeFormat.QR_CODE}
                };
            }
        }

        
        private async void ZXingScannerView_OnScanResult(ZXing.Result result)
        {
            CodeScanned(result.Text);           
        }
    }
}