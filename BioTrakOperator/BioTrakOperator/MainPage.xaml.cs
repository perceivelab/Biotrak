using BioTrakModels;
using BioTrakOperator.Models;
using BioTrakOperator.Pages;
using BioTrakServices;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace BioTrakOperator
{
    public partial class MainPage : ContentPage
    {
        User user;
        bool _scanned = false;
        String serial;
        public MainPage()
        {
            InitializeComponent();
            
        }

      
        private async void LoginButtonClicked(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new LoginPage());
        }

        private async void ScanButtonClicked(object sender, EventArgs e)
        {
            ScannerPage sp = new ScannerPage(true);
            sp.CodeScanned += Sp_CodeScanned;

            await Navigation.PushAsync(sp);
            //Sp_CodeScanned("biotrak:6");
        }

        private async void Sp_CodeScanned(string serial)
        {
            if (_scanned) return;
            _scanned = true;
            Device.BeginInvokeOnMainThread(async () =>
            {
                user = await ServerInterface.LoginUser("anonymous", "Pa$$w0rd");
                if (serial.StartsWith("biotrak:"))
                {
                    _scanned = true;
                    TrackingPage tp = new TrackingPage(user, serial.Replace("biotrak:", ""));
                    await Navigation.PushAsync(tp);

                    _scanned = false;
                    return;
                }
            });
            
        }
    }
}
